"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Minus, Plus, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useCart } from "@/components/cart-provider"

export default function CartPage() {
  const { items, updateQuantity, removeItem, subtotal, clearCart } = useCart()
  const [promoCode, setPromoCode] = useState("")
  const [promoApplied, setPromoApplied] = useState(false)
  const [promoDiscount, setPromoDiscount] = useState(0)

  const handlePromoCode = () => {
    // Simple promo code logic
    // TODO: would need to validate this against a database
    if (promoCode.toLowerCase() === "impact10") {
      setPromoApplied(true)
      setPromoDiscount(subtotal * 0.1) // 10% discount
    }
  }

  const shipping = subtotal > 50 ? 0 : 5.99
  const total = subtotal - promoDiscount + shipping

  if (items.length === 0) {
    return (
      <div className="container py-16">
        <h1 className="mb-6 text-3xl font-bold">Your Cart</h1>
        <div className="rounded-lg border border-dashed p-12 text-center">
          <h2 className="mb-4 text-xl font-medium">Your cart is empty</h2>
          <p className="mb-8 text-muted-foreground">Looks like you haven't added anything to your cart yet.</p>
          <Button asChild>
            <Link href="/shop">Continue Shopping</Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="container py-8 md:py-12">
      <h1 className="mb-6 text-3xl font-bold">Your Cart</h1>
      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <div className="rounded-lg border">
            <div className="p-6">
              <div className="grid gap-6">
                {items.map((item) => (
                  <div key={item.product._id} className="grid grid-cols-[80px_1fr] gap-4 sm:grid-cols-[120px_1fr]">
                    <div className="relative aspect-square overflow-hidden rounded-md">
                      <Image src={item.product.image || "/placeholder.svg"} alt={item.product.name} fill className="object-cover" />
                    </div>
                    <div className="grid gap-2">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-medium">{item.product.name}</h3>
                          <p className="text-sm text-muted-foreground">${item.product.price.toFixed(2)} each</p>
                          {item.options && Object.keys(item.options).length > 0 && (
                            <div className="mt-1 text-xs text-muted-foreground">
                              {Object.entries(item.options).map(([key, value]) => (
                                <p key={key}>
                                  {key}: {value}
                                </p>
                              ))}
                            </div>
                          )}
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-muted-foreground"
                          onClick={() => removeItem(item.product._id)}
                        >
                          <Trash2 className="h-4 w-4" />
                          <span className="sr-only">Remove</span>
                        </Button>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => updateQuantity(item.product._id, Math.max(1, item.quantity - 1))}
                          disabled={item.quantity <= 1}
                        >
                          <Minus className="h-3 w-3" />
                          <span className="sr-only">Decrease quantity</span>
                        </Button>
                        <span className="w-8 text-center">{item.quantity}</span>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => updateQuantity(item.product._id, item.quantity + 1)}
                        >
                          <Plus className="h-3 w-3" />
                          <span className="sr-only">Increase quantity</span>
                        </Button>
                        <div className="ml-auto font-medium">${(item.product.price * item.quantity).toFixed(2)}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex items-center justify-between border-t p-6">
              <Button variant="outline" asChild>
                <Link href="/shop">Continue Shopping</Link>
              </Button>
              <Button variant="ghost" onClick={() => clearCart()}>
                Clear Cart
              </Button>
            </div>
          </div>
        </div>
        <div>
          <div className="rounded-lg border">
            <div className="p-6">
              <h2 className="mb-4 text-lg font-medium">Order Summary</h2>
              <div className="grid gap-3">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                {promoApplied && (
                  <div className="flex items-center justify-between text-green-600">
                    <span>Discount (10%)</span>
                    <span>-${promoDiscount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Shipping</span>
                  <span>{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span>
                </div>
                <div className="flex items-center justify-between font-medium">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
                <div className="text-xs text-muted-foreground">
                  <p>
                    Approximately ${(subtotal * 0.8).toFixed(2)} of your purchase will fund medical care for those in need.
                  </p>
                </div>
              </div>
              <div className="mt-6 grid gap-4">
                <div className="flex gap-2">
                  <Input
                    placeholder="Promo code"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    disabled={promoApplied}
                  />
                  <Button variant="outline" onClick={handlePromoCode} disabled={promoApplied || !promoCode}>
                    Apply
                  </Button>
                </div>
                {promoApplied && (
                  <div className="rounded-md bg-green-50 p-2 text-center text-sm text-green-600">
                    Promo code applied successfully!
                  </div>
                )}
                <Button size="lg" asChild>
                  <Link href="/checkout">Proceed to Checkout</Link>
                </Button>
              </div>
            </div>
          </div>
          <div className="mt-6 rounded-lg border p-6">
            <h3 className="mb-4 text-sm font-medium">Your Impact</h3>
            <p className="text-sm text-muted-foreground">
              Your purchase will help fund medical care for low-income patients. Thank you for making a difference!
            </p>
            <div className="mt-4 rounded-md bg-primary/10 p-3">
              <div className="flex items-center gap-2">
                <svg className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
                <span className="text-sm font-medium">
                  You're helping fund approximately {Math.floor((subtotal * 0.8) / 150)} medical treatments
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
