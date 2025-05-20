"use client"

import { createContext, useContext, useState, useEffect } from "react"
import { productsAPI } from "@/lib/api"
import { useAuth } from "./auth-provider"

interface WishlistItem {
  _id: string
  name: string
  price: number
  image: string
  category: string
}

interface WishlistContextType {
  items: WishlistItem[]
  loading: boolean
  error: string | null
  addItem: (productId: string) => Promise<void>
  removeItem: (productId: string) => Promise<void>
  isInWishlist: (productId: string) => boolean
  clearWishlist: () => void
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined)

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<WishlistItem[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { user } = useAuth()

  // Load wishlist from localStorage on mount
  useEffect(() => {
    const savedWishlist = localStorage.getItem("wishlist")
    if (savedWishlist) {
      setItems(JSON.parse(savedWishlist))
    }
  }, [])

  // Save wishlist to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(items))
  }, [items])

  const addItem = async (productId: string) => {
    try {
      setLoading(true)
      setError(null)
      const product = await productsAPI.getById(productId)
      
      setItems((prevItems) => {
        if (prevItems.some((item) => item._id === productId)) {
          return prevItems
        }
        return [
          ...prevItems,
          {
            _id: product._id,
            name: product.name,
            price: product.price,
            image: product.images[0],
            category: product.category,
          },
        ]
      })
    } catch (err: any) {
      setError(err.response?.data?.error || "Failed to add item to wishlist")
      throw err
    } finally {
      setLoading(false)
    }
  }

  const removeItem = async (productId: string) => {
    try {
      setLoading(true)
      setError(null)
      setItems((prevItems) => prevItems.filter((item) => item._id !== productId))
    } catch (err: any) {
      setError(err.response?.data?.error || "Failed to remove item from wishlist")
      throw err
    } finally {
      setLoading(false)
    }
  }

  const isInWishlist = (productId: string) => {
    return items.some((item) => item._id === productId)
  }

  const clearWishlist = () => {
    setItems([])
  }

  return (
    <WishlistContext.Provider
      value={{
        items,
        loading,
        error,
        addItem,
        removeItem,
        isInWishlist,
        clearWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  )
}

export function useWishlist() {
  const context = useContext(WishlistContext)
  if (context === undefined) {
    throw new Error("useWishlist must be used within a WishlistProvider")
  }
  return context
}
