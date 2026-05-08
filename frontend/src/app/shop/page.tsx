"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Heart, ShoppingCart, Eye, Filter, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { useCart } from "@/components/cart-provider"
import { productsAPI } from "@/lib/api"
import type { Product } from "@/lib/types"

export default function ShopPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false)
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [filters, setFilters] = useState({
    categories: [] as string[],
    priceRange: [0, 10] as [number, number],
    sortBy: "featured",
  })
  const [maxPrice, setMaxPrice] = useState(10)
  const { addItem } = useCart()

  useEffect(() => {
    productsAPI
      .getAll({ sortBy: filters.sortBy })
      .then((data) => {
        setProducts(data)
        const computed = data.length > 0
          ? Math.ceil(Math.max(...data.map((p: Product) => p.price)))
          : 10
        const rounded = Math.max(10, computed)
        setMaxPrice(rounded)
        setFilters(prev => ({ ...prev, priceRange: [0, rounded] as [number, number] }))
      })
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
      if (filters.categories.length > 0 && !filters.categories.includes(product.category)) {
        return false
      }
      if (product.price < filters.priceRange[0] || product.price > filters.priceRange[1]) {
        return false
      }
      return true
    })
    .sort((a, b) => {
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

  if (loading) {
    return (
      <div className="container flex min-h-[400px] items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

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
                      defaultValue={[0, maxPrice]}
                      max={maxPrice}
                      step={0.5}
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
                    setFilters({ categories: [], priceRange: [0, maxPrice], sortBy: "featured" })
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
                  defaultValue={[0, maxPrice]}
                  max={maxPrice}
                  step={0.5}
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
                setFilters({ categories: [], priceRange: [0, maxPrice], sortBy: "featured" })
              }}
            >
              Reset Filters
            </Button>
          </div>
        </div>

        <div>
          {filteredProducts.length === 0 ? (
            <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-12 text-center">
              <h3 className="mb-2 text-xl font-medium">No products found</h3>
              <p className="mb-6 text-muted-foreground">Try adjusting your filters or search criteria</p>
              <Button
                variant="outline"
                onClick={() => {
                  setFilters({ categories: [], priceRange: [0, maxPrice], sortBy: "featured" })
                }}
              >
                Reset Filters
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filteredProducts.map((product) => (
                <div key={product._id} className="group relative rounded-lg border bg-background p-2">
                  <div className="relative mb-2 aspect-square overflow-hidden rounded-md">
                    <Image
                      src={product.images?.[0] || "/placeholder.svg"}
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
                        disabled={product.stock === 0}
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
                    {product.stock === 0 && (
                      <Badge className="absolute right-2 top-2" variant="destructive">
                        Out of Stock
                      </Badge>
                    )}
                  </div>
                  <div className="flex flex-col gap-1 p-2">
                    <Link href={`/shop/${product.category}/${product._id}`} className="font-medium hover:underline">
                      {product.name}
                    </Link>
                    <div className="flex items-center justify-between">
                      <p className="font-semibold">${product.price.toFixed(2)}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
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
                  <DialogTitle>{selectedProduct.name}</DialogTitle>
                  <DialogDescription className="text-lg font-semibold">
                    ${selectedProduct.price.toFixed(2)}
                  </DialogDescription>
                </DialogHeader>
                <p className="text-muted-foreground">{selectedProduct.description}</p>
                {selectedProduct.stock === 0 ? (
                  <p className="font-medium text-destructive">Out of Stock</p>
                ) : (
                  <div className="flex gap-4">
                    <Button className="flex-1" onClick={() => handleAddToCart(selectedProduct)}>
                      Add to Cart
                    </Button>
                    <Button variant="outline" size="icon">
                      <Heart className="h-5 w-5" />
                      <span className="sr-only">Add to wishlist</span>
                    </Button>
                  </div>
                )}
                <div className="mt-4">
                  <Link
                    href={`/shop/${selectedProduct.category}/${selectedProduct._id}`}
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
