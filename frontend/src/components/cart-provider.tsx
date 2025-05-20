"use client"

import { createContext, useContext, useState, useEffect } from "react"
import { productsAPI } from "@/lib/api"
import { useAuth } from "./auth-provider"

export interface CartItem {
  product: {
    _id: string
    name: string
    price: number
    image: string
  }
  quantity: number
  options?: Record<string, string>
}

interface CartContextType {
  items: CartItem[]
  loading: boolean
  error: string | null
  addItem: (productId: string, quantity?: number, options?: Record<string, string>) => Promise<void>
  removeItem: (productId: string) => void
  updateQuantity: (productId: string, quantity: number) => void
  clearCart: () => void
  totalItems: number
  subtotal: number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { user } = useAuth()

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem("cart")
    if (savedCart) {
      setItems(JSON.parse(savedCart))
    }
  }, [])

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(items))
  }, [items])

  const addItem = async (productId: string, quantity = 1, options?: Record<string, string>) => {
    try {
      setLoading(true)
      setError(null)
      const product = await productsAPI.getById(productId)
      
      setItems((prevItems) => {
        const existingItem = prevItems.find(
          (item) => item.product._id === productId && JSON.stringify(item.options) === JSON.stringify(options)
        )
        
        if (existingItem) {
          return prevItems.map((item) =>
            item.product._id === productId && JSON.stringify(item.options) === JSON.stringify(options)
              ? { ...item, quantity: item.quantity + quantity }
              : item
          )
        }
        
        return [
          ...prevItems,
          {
            product: {
              _id: product._id,
              name: product.name,
              price: product.price,
              image: product.images[0],
            },
            quantity,
            options,
          },
        ]
      })
    } catch (err: any) {
      setError(err.response?.data?.error || "Failed to add item to cart")
      throw err
    } finally {
      setLoading(false)
    }
  }

  const removeItem = (productId: string) => {
    setItems((prevItems) => prevItems.filter((item) => item.product._id !== productId))
  }

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity < 1) {
      removeItem(productId)
      return
    }

    setItems((prevItems) =>
      prevItems.map((item) =>
        item.product._id === productId ? { ...item, quantity } : item
      )
    )
  }

  const clearCart = () => {
    setItems([])
  }

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0)
  const calculatedSubtotal = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  )

  return (
    <CartContext.Provider
      value={{
        items,
        loading,
        error,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        totalItems,
        subtotal: calculatedSubtotal,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}
