"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Heart, ShoppingCart, Eye, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { useCart } from "@/components/cart-provider"
import { useWishlist } from "@/components/wishlist-provider"
import { productsAPI } from "@/lib/api"
import type { Product } from "@/lib/types"

export default function FeaturedProducts() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false)
  const { addItem } = useCart()
  const { addItem: addToWishlist, isInWishlist, removeItem: removeFromWishlist } = useWishlist()
  const [animatingHeartId, setAnimatingHeartId] = useState<string | null>(null)

  useEffect(() => {
    productsAPI
      .getAll({ featured: true })
      .then((data) => setProducts(data.slice(0, 4)))
      .catch(() => setProducts([]))
      .finally(() => setLoading(false))
  }, [])

  const handleAddToCart = (product: Product) => {
    addItem(product._id, 1, undefined)
  }

  const handleQuickView = (product: Product) => {
    setSelectedProduct(product)
    setIsQuickViewOpen(true)
  }

  const handleWishlist = (product: Product) => {
    if (isInWishlist(product._id)) {
      removeFromWishlist(product._id)
    } else {
      addToWishlist(product._id)
      setAnimatingHeartId(product._id)
      setTimeout(() => setAnimatingHeartId(null), 1000)
    }
  }

  if (loading) {
    return (
      <div className="flex min-h-[200px] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  if (products.length === 0) return null

  return (
    <>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {products.map((product) => (
          <div key={product._id} className="product-card group">
            <div className="relative mb-2 aspect-square overflow-hidden">
              <Image
                src={product.images?.[0] || "/placeholder.svg"}
                alt={product.name}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 flex items-center justify-center gap-2 bg-black/30 opacity-0 backdrop-blur-sm transition-opacity group-hover:opacity-100">
                <Button
                  size="icon"
                  variant="secondary"
                  className="h-9 w-9 rounded-full bg-white/80 text-primary hover:bg-white"
                  onClick={() => handleQuickView(product)}
                >
                  <Eye className="h-4 w-4" />
                  <span className="sr-only">Quick view</span>
                </Button>
                <Button
                  size="icon"
                  variant="secondary"
                  className="h-9 w-9 rounded-full bg-white/80 text-primary hover:bg-white"
                  onClick={() => handleAddToCart(product)}
                  disabled={product.stock === 0}
                >
                  <ShoppingCart className="h-4 w-4" />
                  <span className="sr-only">Add to cart</span>
                </Button>
                <Button
                  size="icon"
                  variant="secondary"
                  className="h-9 w-9 rounded-full bg-white/80 hover:bg-white"
                  onClick={() => handleWishlist(product)}
                >
                  <Heart
                    className={`h-4 w-4 ${isInWishlist(product._id) ? "fill-primary text-primary" : ""} ${
                      animatingHeartId === product._id ? "heart-beat" : ""
                    }`}
                  />
                  <span className="sr-only">
                    {isInWishlist(product._id) ? "Remove from wishlist" : "Add to wishlist"}
                  </span>
                </Button>
              </div>
              {product.new && (
                <Badge className="absolute left-2 top-2" variant="secondary">
                  New
                </Badge>
              )}
              {product.stock === 0 && (
                <Badge className="absolute right-2 top-2" variant="destructive">
                  Out of Stock
                </Badge>
              )}
            </div>
            <div className="flex flex-col gap-1 p-4">
              <Link href={`/shop/${product.category}/${product._id}`} className="font-light hover:text-primary">
                {product.name}
              </Link>
              <div className="flex items-center justify-between">
                <p className="font-light text-primary">${product.price.toFixed(2)}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Dialog open={isQuickViewOpen} onOpenChange={setIsQuickViewOpen}>
        <DialogContent className="sm:max-w-[800px]">
          {selectedProduct && (
            <div className="grid gap-6 md:grid-cols-2">
              <div className="relative aspect-square overflow-hidden rounded-md">
                <Image
                  src={selectedProduct.images?.[0] || "/placeholder.svg"}
                  alt={selectedProduct.name}
                  fill
                  className="object-cover"
                />
                {selectedProduct.new && (
                  <Badge className="absolute left-2 top-2" variant="secondary">
                    New
                  </Badge>
                )}
              </div>
              <div className="flex flex-col gap-4">
                <DialogHeader>
                  <DialogTitle className="text-xl font-light tracking-wide">{selectedProduct.name}</DialogTitle>
                  <DialogDescription className="text-lg font-light text-primary">
                    ${selectedProduct.price.toFixed(2)}
                  </DialogDescription>
                </DialogHeader>
                <p className="font-light text-gray-600">{selectedProduct.description}</p>
                <div className="mt-2 text-sm font-light text-primary/80">
                  <p>A portion of this purchase funds medical care for those in need</p>
                </div>
                {selectedProduct.stock === 0 ? (
                  <p className="font-medium text-destructive">Out of Stock</p>
                ) : (
                  <div className="flex gap-4">
                    <Button className="flex-1 font-light" onClick={() => handleAddToCart(selectedProduct)}>
                      Add to Cart
                    </Button>
                    <Button variant="outline" size="icon" onClick={() => handleWishlist(selectedProduct)}>
                      <Heart
                        className={`h-5 w-5 ${isInWishlist(selectedProduct._id) ? "fill-primary text-primary" : ""}`}
                      />
                      <span className="sr-only">
                        {isInWishlist(selectedProduct._id) ? "Remove from wishlist" : "Add to wishlist"}
                      </span>
                    </Button>
                  </div>
                )}
                <div className="mt-4">
                  <Link
                    href={`/shop/${selectedProduct.category}/${selectedProduct._id}`}
                    className="text-sm font-light text-primary hover:underline"
                  >
                    View Full Details
                  </Link>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}
