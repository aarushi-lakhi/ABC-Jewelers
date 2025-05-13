"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Heart, ShoppingCart, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { useCart } from "@/components/cart-provider"
import { useWishlist } from "@/components/wishlist-provider"

// Sample product data
const products = [
  {
    id: "1",
    name: "Sunflower Earrings",
    description:
      "Handcrafted sunflower earrings made with sustainable materials. Each purchase helps fund medical care.",
    price: 29.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "earrings",
    featured: true,
    new: true,
  },
  {
    id: "2",
    name: "Butterfly Charm",
    description: "Delicate butterfly charm that can be added to any bracelet or necklace. Made with recycled silver.",
    price: 19.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "charms",
    featured: true,
  },
  {
    id: "3",
    name: "Daisy Chain Bracelet",
    description: "A beautiful chain bracelet with daisy charms. Adjustable size to fit most wrists.",
    price: 34.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "chains",
    featured: true,
  },
  {
    id: "4",
    name: "Petal Ring",
    description: "Elegant flower-shaped ring that symbolizes growth and new beginnings.",
    price: 24.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "rings",
    featured: true,
    new: true,
  },
]

export default function FeaturedProducts() {
  const [selectedProduct, setSelectedProduct] = useState<(typeof products)[0] | null>(null)
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false)
  const { addItem } = useCart()
  const { addItem: addToWishlist, isInWishlist, removeItem: removeFromWishlist } = useWishlist()
  const [animatingHeartId, setAnimatingHeartId] = useState<string | null>(null)

  const handleAddToCart = (product: (typeof products)[0]) => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1,
    })
  }

  const handleQuickView = (product: (typeof products)[0]) => {
    setSelectedProduct(product)
    setIsQuickViewOpen(true)
  }

  const handleWishlist = (product: (typeof products)[0]) => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id)
    } else {
      addToWishlist({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        category: product.category,
      })
      setAnimatingHeartId(product.id)
      setTimeout(() => setAnimatingHeartId(null), 1000)
    }
  }

  return (
    <>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {products.map((product) => (
          <div key={product.id} className="product-card group">
            <div className="relative mb-2 aspect-square overflow-hidden">
              <Image
                src={product.image || "/placeholder.svg"}
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
                    className={`h-4 w-4 ${isInWishlist(product.id) ? "fill-primary text-primary" : ""} ${animatingHeartId === product.id ? "heart-beat" : ""}`}
                  />
                  <span className="sr-only">
                    {isInWishlist(product.id) ? "Remove from wishlist" : "Add to wishlist"}
                  </span>
                </Button>
              </div>
              {product.new && (
                <Badge className="absolute left-2 top-2" variant="secondary">
                  New
                </Badge>
              )}
            </div>
            <div className="flex flex-col gap-1 p-4">
              <Link href={`/shop/${product.category}/${product.id}`} className="font-light hover:text-primary">
                {product.name}
              </Link>
              <div className="flex items-center justify-between">
                <p className="font-light text-primary">${product.price.toFixed(2)}</p>
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="h-4 w-4 fill-primary" viewBox="0 0 20 20" fill="currentColor">
                      <path
                        fillRule="evenodd"
                        d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z"
                        clipRule="evenodd"
                      />
                    </svg>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick View Dialog */}
      <Dialog open={isQuickViewOpen} onOpenChange={setIsQuickViewOpen}>
        <DialogContent className="sm:max-w-[800px]">
          {selectedProduct && (
            <div className="grid gap-6 md:grid-cols-2">
              <div className="relative aspect-square overflow-hidden rounded-md">
                <Image
                  src={selectedProduct.image || "/placeholder.svg"}
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
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="h-5 w-5 fill-primary" viewBox="0 0 20 20" fill="currentColor">
                      <path
                        fillRule="evenodd"
                        d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z"
                        clipRule="evenodd"
                      />
                    </svg>
                  ))}
                </div>
                <p className="font-light text-gray-600">{selectedProduct.description}</p>
                <div className="mt-2 text-sm font-light text-primary/80">
                  <p>A portion of this purchase funds medical care for those in need</p>
                </div>
                <div className="flex gap-4">
                  <Button className="flex-1 font-light" onClick={() => handleAddToCart(selectedProduct)}>
                    Add to Cart
                  </Button>
                  <Button variant="outline" size="icon" onClick={() => handleWishlist(selectedProduct)}>
                    <Heart
                      className={`h-5 w-5 ${isInWishlist(selectedProduct.id) ? "fill-primary text-primary" : ""}`}
                    />
                    <span className="sr-only">
                      {isInWishlist(selectedProduct.id) ? "Remove from wishlist" : "Add to wishlist"}
                    </span>
                  </Button>
                </div>
                <div className="mt-4">
                  <Link
                    href={`/shop/${selectedProduct.category}/${selectedProduct.id}`}
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
