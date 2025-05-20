"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Heart, ShoppingCart, Eye, Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { useCart } from "@/components/cart-provider"

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
  {
    id: "5",
    name: "Ocean Wave Earrings",
    description: "Beautiful wave-inspired earrings that capture the essence of the ocean.",
    price: 32.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "earrings",
  },
  {
    id: "6",
    name: "Mountain Range Ring",
    description: "A stunning ring featuring a mountain range design. Perfect for nature lovers.",
    price: 27.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "rings",
  },
  {
    id: "7",
    name: "Star Charm",
    description: "A delicate star charm that adds a touch of magic to any bracelet or necklace.",
    price: 15.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "charms",
    new: true,
  },
  {
    id: "8",
    name: "Infinity Chain Necklace",
    description: "A timeless infinity chain necklace that symbolizes endless possibilities.",
    price: 39.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "chains",
  },
]

export default function ShopPage() {
  const [selectedProduct, setSelectedProduct] = useState<(typeof products)[0] | null>(null)
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false)
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [filters, setFilters] = useState({
    categories: [] as string[],
    priceRange: [0, 50] as [number, number],
    sortBy: "featured",
  })
  const { addItem } = useCart()

  const handleAddToCart = (product: (typeof products)[0]) => {
    // addItem({
    //   id: product.id,
    //   name: product.name,
    //   price: product.price,
    //   image: product.image,
    //   quantity: 1,
    // })
    addItem(product.id, 1, undefined);
  }

  const handleQuickView = (product: (typeof products)[0]) => {
    setSelectedProduct(product)
    setIsQuickViewOpen(true)
  }

  const toggleCategoryFilter = (category: string) => {
    setFilters((prev) => {
      const categories = prev.categories.includes(category)
        ? prev.categories.filter((c) => c !== category)
        : [...prev.categories, category]
      return { ...prev, categories }
    })
  }

  const handlePriceRangeChange = (value: number[]) => {
    setFilters((prev) => ({ ...prev, priceRange: [value[0], value[1]] as [number, number] }))
  }

  const handleSortChange = (value: string) => {
    setFilters((prev) => ({ ...prev, sortBy: value }))
  }

  const filteredProducts = products
    .filter((product) => {
      // Filter by category
      if (filters.categories.length > 0 && !filters.categories.includes(product.category)) {
        return false
      }
      // Filter by price range
      if (product.price < filters.priceRange[0] || product.price > filters.priceRange[1]) {
        return false
      }
      return true
    })
    .sort((a, b) => {
      // Sort products
      switch (filters.sortBy) {
        case "featured":
          return (b.featured ? 1 : 0) - (a.featured ? 1 : 0)
        case "newest":
          return (b.new ? 1 : 0) - (a.new ? 1 : 0)
        case "price-low":
          return a.price - b.price
        case "price-high":
          return b.price - a.price
        default:
          return 0
      }
    })

  const categories = ["earrings", "rings", "charms", "chains"]

  return (
    <div className="container py-8 md:py-12">
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold">Shop All Jewelry</h1>
          <p className="text-muted-foreground">Handcrafted jewelry that funds medical care for those in need</p>
        </div>
        <div className="flex items-center gap-4">
          <Select value={filters.sortBy} onValueChange={handleSortChange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="featured">Featured</SelectItem>
              <SelectItem value="newest">Newest</SelectItem>
              <SelectItem value="price-low">Price: Low to High</SelectItem>
              <SelectItem value="price-high">Price: High to Low</SelectItem>
            </SelectContent>
          </Select>
          <Sheet open={isFilterOpen} onOpenChange={setIsFilterOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" className="md:hidden">
                <Filter className="mr-2 h-4 w-4" />
                Filters
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <SheetHeader>
                <SheetTitle>Filters</SheetTitle>
                <SheetDescription>Refine your product search</SheetDescription>
              </SheetHeader>
              <div className="mt-6 grid gap-6">
                <div>
                  <h3 className="mb-4 text-lg font-medium">Categories</h3>
                  <div className="grid gap-3">
                    {categories.map((category) => (
                      <div key={category} className="flex items-center gap-2">
                        <Checkbox
                          id={`category-${category}-mobile`}
                          checked={filters.categories.includes(category)}
                          onCheckedChange={() => toggleCategoryFilter(category)}
                        />
                        <Label htmlFor={`category-${category}-mobile`} className="capitalize">
                          {category}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="mb-4 text-lg font-medium">Price Range</h3>
                  <div className="px-2">
                    <Slider
                      defaultValue={[0, 50]}
                      max={50}
                      step={1}
                      value={[filters.priceRange[0], filters.priceRange[1]]}
                      onValueChange={handlePriceRangeChange}
                    />
                    <div className="mt-2 flex items-center justify-between text-sm">
                      <span>${filters.priceRange[0]}</span>
                      <span>${filters.priceRange[1]}</span>
                    </div>
                  </div>
                </div>
                <Button
                  variant="outline"
                  onClick={() => {
                    setFilters({
                      categories: [],
                      priceRange: [0, 50],
                      sortBy: "featured",
                    })
                  }}
                >
                  Reset Filters
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      <div className="grid gap-8 md:grid-cols-[240px_1fr]">
        {/* Sidebar Filters (Desktop) */}
        <div className="hidden md:block">
          <div className="sticky top-20 grid gap-6">
            <div>
              <h3 className="mb-4 text-lg font-medium">Categories</h3>
              <div className="grid gap-3">
                {categories.map((category) => (
                  <div key={category} className="flex items-center gap-2">
                    <Checkbox
                      id={`category-${category}`}
                      checked={filters.categories.includes(category)}
                      onCheckedChange={() => toggleCategoryFilter(category)}
                    />
                    <Label htmlFor={`category-${category}`} className="capitalize">
                      {category}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h3 className="mb-4 text-lg font-medium">Price Range</h3>
              <div className="px-2">
                <Slider
                  defaultValue={[0, 50]}
                  max={50}
                  step={1}
                  value={[filters.priceRange[0], filters.priceRange[1]]}
                  onValueChange={handlePriceRangeChange}
                />
                <div className="mt-2 flex items-center justify-between text-sm">
                  <span>${filters.priceRange[0]}</span>
                  <span>${filters.priceRange[1]}</span>
                </div>
              </div>
            </div>
            <Button
              variant="outline"
              onClick={() => {
                setFilters({
                  categories: [],
                  priceRange: [0, 50],
                  sortBy: "featured",
                })
              }}
            >
              Reset Filters
            </Button>
          </div>
        </div>

        {/* Product Grid */}
        <div>
          {filteredProducts.length === 0 ? (
            <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-12 text-center">
              <h3 className="mb-2 text-xl font-medium">No products found</h3>
              <p className="mb-6 text-muted-foreground">Try adjusting your filters or search criteria</p>
              <Button
                variant="outline"
                onClick={() => {
                  setFilters({
                    categories: [],
                    priceRange: [0, 50],
                    sortBy: "featured",
                  })
                }}
              >
                Reset Filters
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filteredProducts.map((product) => (
                <div key={product.id} className="group relative rounded-lg border bg-background p-2">
                  <div className="relative mb-2 aspect-square overflow-hidden rounded-md">
                    <Image
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      fill
                      className="object-cover transition-transform group-hover:scale-105"
                    />
                    <div className="absolute inset-0 flex items-center justify-center gap-2 opacity-0 transition-opacity group-hover:opacity-100">
                      <Button
                        size="icon"
                        variant="secondary"
                        className="h-9 w-9 rounded-full"
                        onClick={() => handleQuickView(product)}
                      >
                        <Eye className="h-4 w-4" />
                        <span className="sr-only">Quick view</span>
                      </Button>
                      <Button
                        size="icon"
                        variant="secondary"
                        className="h-9 w-9 rounded-full"
                        onClick={() => handleAddToCart(product)}
                      >
                        <ShoppingCart className="h-4 w-4" />
                        <span className="sr-only">Add to cart</span>
                      </Button>
                      <Button size="icon" variant="secondary" className="h-9 w-9 rounded-full">
                        <Heart className="h-4 w-4" />
                        <span className="sr-only">Add to wishlist</span>
                      </Button>
                    </div>
                    {product.new && (
                      <Badge className="absolute left-2 top-2" variant="secondary">
                        New
                      </Badge>
                    )}
                  </div>
                  <div className="flex flex-col gap-1 p-2">
                    <Link href={`/shop/${product.category}/${product.id}`} className="font-medium hover:underline">
                      {product.name}
                    </Link>
                    <div className="flex items-center justify-between">
                      <p className="font-semibold">${product.price.toFixed(2)}</p>
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
          )}
        </div>
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
                  <DialogTitle>{selectedProduct.name}</DialogTitle>
                  <DialogDescription className="text-lg font-semibold">
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
                <p className="text-muted-foreground">{selectedProduct.description}</p>
                <div className="flex gap-4">
                  <Button className="flex-1" onClick={() => handleAddToCart(selectedProduct)}>
                    Add to Cart
                  </Button>
                  <Button variant="outline" size="icon">
                    <Heart className="h-5 w-5" />
                    <span className="sr-only">Add to wishlist</span>
                  </Button>
                </div>
                <div className="mt-4">
                  <Link
                    href={`/shop/${selectedProduct.category}/${selectedProduct.id}`}
                    className="text-sm font-medium text-primary hover:underline"
                  >
                    View Full Details
                  </Link>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
