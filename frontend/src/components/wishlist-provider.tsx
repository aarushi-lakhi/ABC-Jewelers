"use client"

import type React from "react"

import { createContext, useContext, useState, useEffect } from "react"

type WishlistItem = {
  id: string
  name: string
  price: number
  image: string
  category: string
}

type WishlistContextType = {
  items: WishlistItem[]
  wishlistCount: number
  addItem: (item: WishlistItem) => void
  removeItem: (id: string) => void
  clearWishlist: () => void
  isInWishlist: (id: string) => boolean
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined)

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<WishlistItem[]>([])
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    // Load wishlist from localStorage on client side
    const savedWishlist = localStorage.getItem("wishlist")
    if (savedWishlist) {
      try {
        setItems(JSON.parse(savedWishlist))
      } catch (e) {
        console.error("Failed to parse wishlist from localStorage")
      }
    }
    setLoaded(true)
  }, [])

  useEffect(() => {
    // Save wishlist to localStorage whenever it changes
    if (loaded) {
      localStorage.setItem("wishlist", JSON.stringify(items))
    }
  }, [items, loaded])

  const wishlistCount = items.length

  const addItem = (newItem: WishlistItem) => {
    setItems((prevItems) => {
      // Check if item already exists
      const existingItemIndex = prevItems.findIndex((item) => item.id === newItem.id)

      if (existingItemIndex > -1) {
        // Item already in wishlist, so remove it
        return prevItems.filter((_, index) => index !== existingItemIndex)
      } else {
        // Add new item
        return [...prevItems, newItem]
      }
    })
  }

  const removeItem = (id: string) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== id))
  }

  const clearWishlist = () => {
    setItems([])
  }

  const isInWishlist = (id: string) => {
    return items.some((item) => item.id === id)
  }

  return (
    <WishlistContext.Provider
      value={{
        items,
        wishlistCount,
        addItem,
        removeItem,
        clearWishlist,
        isInWishlist,
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
