"use client"

import { useState, useEffect, use } from "react"
import Image from "next/image"
import Link from "next/link"
import { Heart, Loader2, Minus, Plus, Share2, ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { useCart } from "@/components/cart-provider"
import { productsAPI } from "@/lib/api"
import type { Product } from "@/lib/types"

interface ProductPageProps {
  params: Promise<{ category: string; id: string }>
}

export default function ProductPage({ params: paramsPromise }: ProductPageProps) {
  const params = use(paramsPromise)
  const [product, setProduct] = useState<Product | null>(null)
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [selectedOptions, setSelectedOptions] = useState<{ materials: string; customization: string }>({
    materials: "",
    customization: "",
  })
  const [note, setNote] = useState("")
  const { addItem } = useCart()

  useEffect(() => {
    setLoading(true)
    productsAPI
      .getById(params.id)
      .then((data: Product) => {
        setProduct(data)
        setSelectedOptions({
          materials: data.options?.materials?.[0] || "",
          customization: data.options?.customization?.[0] || "",
        })

        if (data.relatedProducts?.length > 0) {
          Promise.all(
            data.relatedProducts.map((id: string) =>
              productsAPI.getById(id).catch(() => null)
            )
          ).then((results) =>
            setRelatedProducts(results.filter((r): r is Product => r !== null))
          )
        } else {
          productsAPI
            .getAll({ category: data.category })
            .then((all: Product[]) =>
              setRelatedProducts(all.filter((p) => p._id !== data._id).slice(0, 4))
            )
            .catch(() => {})
        }
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false))
  }, [params.id])

  if (loading) {
    return (
      <div className="container flex min-h-[400px] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  if (error || !product) {
    return (
      <div className="container flex min-h-[400px] items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Product Not Found</h1>
          <p className="mt-2 text-muted-foreground">The product you&apos;re looking for doesn&apos;t exist.</p>
          <Button className="mt-4" asChild>
            <Link href="/shop">Back to Shop</Link>
          </Button>
        </div>
      </div>
    )
  }

  const handleOptionChange = (optionType: "materials" | "customization", value: string) => {
    setSelectedOptions((prev) => ({ ...prev, [optionType]: value }))
  }

  const handleAddToCart = async () => {
    try {
      const options: Record<string, string> = {
        materials: selectedOptions.materials,
        customization: selectedOptions.customization,
      }
      if (note.trim()) options.note = note.trim()
      await addItem(product._id, quantity, options)
    } catch (err) {
      console.error("Failed to add item to cart:", err)
    }
  }

  const averageRating =
    product.reviews.length > 0
      ? product.reviews.reduce((acc, review) => acc + review.rating, 0) / product.reviews.length
      : 0

  return (
    <div className="container py-8 md:py-12">
      <div className="grid gap-8 md:grid-cols-2">
        <div className="flex flex-col gap-4">
          <div className="relative aspect-square overflow-hidden rounded-lg border">
            <Image
              src={product.images?.[selectedImage] || "/placeholder.svg"}
              alt={product.name}
              fill
              className="object-cover"
            />
            {product.stock === 0 && (
              <Badge className="absolute right-2 top-2" variant="destructive">
                Out of Stock
              </Badge>
            )}
          </div>
          {product.images.length > 1 && (
            <div className="flex gap-2 overflow-auto pb-2">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  className={`relative aspect-square w-20 overflow-hidden rounded-md border ${
                    selectedImage === index ? "ring-2 ring-primary" : ""
                  }`}
                  onClick={() => setSelectedImage(index)}
                >
                  <Image
                    src={image}
                    alt={`${product.name} ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="flex flex-col gap-6">
          <div>
            <h1 className="text-3xl font-bold">{product.name}</h1>
            <div className="mt-2 flex items-center gap-4">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className={`h-5 w-5 ${
                      i < Math.round(averageRating) ? "fill-primary" : "fill-muted stroke-muted-foreground"
                    }`}
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z"
                      clipRule="evenodd"
                    />
                  </svg>
                ))}
              </div>
              <span className="text-sm text-muted-foreground">{product.reviews.length} reviews</span>
            </div>
            <p className="mt-4 text-2xl font-bold">${product.price.toFixed(2)}</p>
            <p className="mt-2 text-sm text-muted-foreground">
              A portion of this purchase funds medical care for those in need
            </p>
          </div>

          <div className="grid gap-4">
            {product.options?.materials?.length > 0 && (
              <div>
                <h3 className="mb-2 font-medium">Material</h3>
                <RadioGroup
                  value={selectedOptions.materials}
                  onValueChange={(value) => handleOptionChange("materials", value)}
                  className="flex flex-wrap gap-2"
                >
                  {product.options.materials.map((material) => (
                    <div key={material}>
                      <RadioGroupItem id={`material-${material}`} value={material} className="peer sr-only" />
                      <Label
                        htmlFor={`material-${material}`}
                        className="flex cursor-pointer items-center justify-center rounded-md border px-4 py-2 peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/10 peer-data-[state=checked]:font-medium"
                      >
                        {material}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
            )}

            {product.options?.customization?.length > 0 && (
              <div>
                <h3 className="mb-2 font-medium">Customization</h3>
                <RadioGroup
                  value={selectedOptions.customization}
                  onValueChange={(value) => handleOptionChange("customization", value)}
                  className="flex flex-wrap gap-2"
                >
                  {product.options.customization.map((option) => (
                    <div key={option}>
                      <RadioGroupItem id={`customization-${option}`} value={option} className="peer sr-only" />
                      <Label
                        htmlFor={`customization-${option}`}
                        className="flex cursor-pointer items-center justify-center rounded-md border px-4 py-2 peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/10 peer-data-[state=checked]:font-medium"
                      >
                        {option}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
            )}

            {product.category === "chains" ? (
              <div>
                <h3 className="mb-2 font-medium">Length (inches)</h3>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    min="1"
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                    className="w-24 rounded-md border px-3 py-2 text-center"
                  />
                  <span className="text-sm text-muted-foreground">inches</span>
                </div>
                <p className="mt-1 text-sm text-muted-foreground">
                  ${product.price.toFixed(2)} per inch · total: ${(product.price * quantity).toFixed(2)}
                </p>
              </div>
            ) : (
              <div>
                <h3 className="mb-2 font-medium">Quantity</h3>
                <div className="flex items-center">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={quantity <= 1}
                  >
                    <Minus className="h-4 w-4" />
                    <span className="sr-only">Decrease quantity</span>
                  </Button>
                  <span className="w-12 text-center">{quantity}</span>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setQuantity(quantity + 1)}
                    disabled={quantity >= product.stock}
                  >
                    <Plus className="h-4 w-4" />
                    <span className="sr-only">Increase quantity</span>
                  </Button>
                </div>
                {product.stock > 0 && product.stock <= 5 && (
                  <p className="mt-1 text-sm text-orange-600">Only {product.stock} left in stock</p>
                )}
              </div>
            )}

            {(product.category === "chains" || product.category === "charms") && (
              <div>
                <h3 className="mb-2 font-medium">
                  {product.category === "chains"
                    ? "Any charms to attach? (optional)"
                    : "Any chain to pair with? (optional)"}
                </h3>
                <textarea
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder={
                    product.category === "chains"
                      ? 'e.g. Zodiac Sign Charm – Libra, Alphabet Charm "A"'
                      : "e.g. Silver Thin Curb Chain, 16 inches"
                  }
                  className="w-full rounded-md border px-3 py-2 text-sm"
                  rows={2}
                />
                <p className="mt-1 text-xs text-muted-foreground">
                  We'll put it together for you — just let us know what you'd like!
                </p>
              </div>
            )}
          </div>

          <div className="flex flex-col gap-4 sm:flex-row">
            <Button className="flex-1" size="lg" onClick={handleAddToCart} disabled={product.stock === 0}>
              <ShoppingCart className="mr-2 h-5 w-5" />
              {product.stock === 0 ? "Out of Stock" : "Add to Cart"}
            </Button>
            <Button variant="outline" size="lg">
              <Heart className="mr-2 h-5 w-5" />
              Add to Wishlist
            </Button>
          </div>

          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" className="gap-1">
              <Share2 className="h-4 w-4" />
              Share
            </Button>
          </div>
        </div>
      </div>

      <div className="mt-12">
        <Tabs defaultValue="description">
          <TabsList className="w-full justify-start">
            <TabsTrigger value="description">Description</TabsTrigger>
            <TabsTrigger value="details">Details</TabsTrigger>
            <TabsTrigger value="impact">Our Impact</TabsTrigger>
            <TabsTrigger value="reviews">Reviews ({product.reviews.length})</TabsTrigger>
          </TabsList>
          <TabsContent value="description" className="mt-4">
            <div className="prose max-w-none">
              <p className="whitespace-pre-line">{product.longDescription || product.description}</p>
            </div>
          </TabsContent>
          <TabsContent value="details" className="mt-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-lg border p-4">
                <h3 className="font-medium">Materials</h3>
                <p className="text-sm text-muted-foreground">
                  {product.options?.materials?.length > 0
                    ? product.options.materials.join(", ")
                    : "Standard materials"}
                </p>
              </div>
              <div className="rounded-lg border p-4">
                <h3 className="font-medium">Care Instructions</h3>
                <p className="text-sm text-muted-foreground">
                  Store in a cool, dry place. Clean with a soft cloth. Avoid contact with water and chemicals.
                </p>
              </div>
              <div className="rounded-lg border p-4">
                <h3 className="font-medium">Shipping</h3>
                <p className="text-sm text-muted-foreground">
                  Ships within 1-3 business days. Free shipping on orders over $50.
                </p>
              </div>
              <div className="rounded-lg border p-4">
                <h3 className="font-medium">Stock</h3>
                <p className="text-sm text-muted-foreground">
                  {product.stock > 0 ? `${product.stock} available` : "Currently out of stock"}
                </p>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="impact" className="mt-4">
            <div className="prose max-w-none">
              <p>
                At ABC Jewelers, we believe in making a tangible difference in the world. With every purchase, a
                portion of the proceeds goes directly to funding medical care for low-income patients who otherwise
                wouldn&apos;t have access to essential healthcare services.
              </p>
              <div className="mt-6 rounded-lg bg-primary/10 p-4">
                <h3 className="text-lg font-medium">Your Impact</h3>
                <p className="mt-2">
                  Each piece of jewelry sold contributes approximately $5-10 to our medical care fund, which
                  directly supports surgeries, medical equipment, and healthcare access for those in need.
                </p>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="reviews" className="mt-4">
            {product.reviews.length > 0 ? (
              <div className="grid gap-6">
                {product.reviews.map((review, index) => (
                  <div key={review._id || index} className="rounded-lg border p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">{review.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {new Date(review.date).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <svg
                            key={i}
                            className={`h-5 w-5 ${
                              i < review.rating ? "fill-primary" : "fill-muted stroke-muted-foreground"
                            }`}
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z"
                              clipRule="evenodd"
                            />
                          </svg>
                        ))}
                      </div>
                    </div>
                    <p className="mt-4">{review.comment}</p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="rounded-lg border border-dashed p-8 text-center">
                <h3 className="text-lg font-medium">No Reviews Yet</h3>
                <p className="mt-2 text-muted-foreground">Be the first to review this product</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>

      {relatedProducts.length > 0 && (
        <div className="mt-16">
          <h2 className="mb-6 text-2xl font-bold">You May Also Like</h2>
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4">
            {relatedProducts.map((rp) => (
              <Link
                key={rp._id}
                href={`/shop/${rp.category}/${rp._id}`}
                className="group rounded-lg border bg-background p-2"
              >
                <div className="relative mb-2 aspect-square overflow-hidden rounded-md">
                  <Image
                    src={rp.images?.[0] || "/placeholder.svg"}
                    alt={rp.name}
                    fill
                    className="object-cover transition-transform group-hover:scale-105"
                  />
                </div>
                <div className="p-2">
                  <h3 className="font-medium group-hover:underline">{rp.name}</h3>
                  <p className="font-semibold">${rp.price.toFixed(2)}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
