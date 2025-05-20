"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Trash2, ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useWishlist } from "@/components/wishlist-provider"
import { useCart } from "@/components/cart-provider"

export default function WishlistPage() {
  const { items, removeItem, clearWishlist } = useWishlist()
  const { addItem } = useCart()
  const [removingId, setRemovingId] = useState<string | null>(null)

  const handleRemoveItem = (id: string) => {
    setRemovingId(id)
    setTimeout(() => {
      removeItem(id)
      setRemovingId(null)
    }, 300)
  }

  const handleAddToCart = (item: any) => {
    // addItem({
    //   id: item.id,
    //   name: item.name,
    //   price: item.price,
    //   image: item.image,
    //   quantity: 1,
    // })
    addItem(item._id, 1, undefined);
    handleRemoveItem(item._id)
  }

  if (items.length === 0) {
    return (
      <div className="container py-16">
        <h1 className="mb-6 text-3xl font-light tracking-wide text-center">Your Wishlist</h1>
        <div className="rounded-lg border border-dashed p-12 text-center">
          <h2 className="mb-4 text-xl font-light">Your wishlist is empty</h2>
          <p className="mb-8 text-muted-foreground font-light">Add items to your wishlist to save them for later.</p>
          <Button asChild className="font-light">
            <Link href="/shop">Continue Shopping</Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="container py-8 md:py-12">
      <h1 className="mb-6 text-3xl font-light tracking-wide text-center">Your Wishlist</h1>
      <div className="mb-4 flex justify-end">
        <Button variant="outline" size="sm" onClick={clearWishlist} className="font-light">
          Clear Wishlist
        </Button>
      </div>
      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {items.map((item) => (
          <div
            key={item._id}
            className={`product-card transition-all duration-300 ${
              removingId === item._id ? "opacity-0 scale-95" : "opacity-100 scale-100"
            }`}
          >
            <div className="relative aspect-square overflow-hidden">
              <Image
                src={item.image || "/placeholder.svg"}
                alt={item.name}
                fill
                className="object-cover transition-transform duration-500 hover:scale-105"
              />
              <div className="absolute inset-0 flex items-center justify-center gap-2 bg-black/30 opacity-0 backdrop-blur-sm transition-opacity hover:opacity-100">
                <Button
                  size="icon"
                  variant="secondary"
                  className="h-9 w-9 rounded-full bg-white/80 text-primary hover:bg-white"
                  onClick={() => handleAddToCart(item)}
                >
                  <ShoppingCart className="h-4 w-4" />
                  <span className="sr-only">Add to cart</span>
                </Button>
                <Button
                  size="icon"
                  variant="secondary"
                  className="h-9 w-9 rounded-full bg-white/80 text-red-500 hover:bg-white"
                  onClick={() => handleRemoveItem(item._id)}
                >
                  <Trash2 className="h-4 w-4" />
                  <span className="sr-only">Remove</span>
                </Button>
              </div>
            </div>
            <div className="flex flex-col gap-1 p-4">
              <Link href={`/shop/${item.category}/${item._id}`} className="font-light hover:text-primary">
                {item.name}
              </Link>
              <div className="flex items-center justify-between">
                <p className="font-light text-primary">${item.price.toFixed(2)}</p>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-xs font-light text-muted-foreground hover:text-primary"
                  onClick={() => handleRemoveItem(item._id)}
                >
                  Remove
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
