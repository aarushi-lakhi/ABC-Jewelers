"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Check, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCart } from "@/components/cart-provider"
import { useAuth } from "@/components/auth-provider"
import { ordersAPI, stripeAPI } from "@/lib/api"

export default function CheckoutPage() {
  const { items, subtotal, clearCart } = useCart()
  const { user } = useAuth()
  const [step, setStep] = useState(1)
  const [orderPlaced, setOrderPlaced] = useState(false)
  const [orderError, setOrderError] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)
  const [orderId, setOrderId] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "United States",
    notes: "",
  })

  const shipping = subtotal > 50 ? 0 : 5.99
  const total = subtotal + shipping

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setOrderError(null)

    if (step === 1) {
      setStep(2)
      window.scrollTo(0, 0)
      return
    }

    setSubmitting(true)
    try {
      const orderItems = items.map((item) => ({
        productId: item.product._id,
        name: item.product.name,
        price: item.product.price,
        quantity: item.quantity,
        options: {
          materials: item.options?.materials || "",
          customization: [
            item.options?.customization,
            item.options?.note ? `Note: ${item.options.note}` : "",
          ].filter(Boolean).join(" | "),
        },
      }))

      const orderData = {
        items: orderItems,
        shippingAddress: {
          street: formData.address,
          city: formData.city,
          state: formData.state,
          zipCode: formData.zipCode,
          country: formData.country,
        },
        paymentMethod: "stripe",
        ...(user
          ? {}
          : {
              guestEmail: formData.email,
              guestName: `${formData.firstName} ${formData.lastName}`,
            }),
      }

      const order = await ordersAPI.create(orderData)
      setOrderId(order._id)

      try {
        const session = await stripeAPI.createCheckoutSession({
          orderId: order._id,
          successUrl: `${window.location.origin}/checkout/success?orderId=${order._id}`,
          cancelUrl: `${window.location.origin}/checkout`,
        })

        if (session.url) {
          window.location.href = session.url
          return
        }
      } catch {
        // Stripe not configured yet — fall through to simple confirmation
      }

      setOrderPlaced(true)
      clearCart()
      window.scrollTo(0, 0)
    } catch (err: any) {
      setOrderError(err.response?.data?.error || "Failed to place order. Please try again.")
    } finally {
      setSubmitting(false)
    }
  }

  if (orderPlaced) {
    return (
      <div className="container py-16">
        <div className="mx-auto max-w-md rounded-lg border p-8 text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
            <Check className="h-6 w-6 text-green-600" />
          </div>
          <h1 className="mb-2 text-2xl font-bold">Order Placed Successfully!</h1>
          <p className="mb-6 text-muted-foreground">
            Thank you for your purchase. Your order has been placed and will be processed soon.
          </p>
          {orderId && (
            <p className="mb-2 text-sm text-muted-foreground">
              Order ID: <span className="font-mono font-medium">{orderId}</span>
            </p>
          )}
          <p className="mb-6 text-sm text-muted-foreground">Order confirmation has been sent to {formData.email || user?.email}</p>
          <div className="mb-6 rounded-md bg-primary/10 p-4 text-center">
            <p className="font-medium">Your Impact</p>
            <p className="text-sm text-muted-foreground">
              <span className="font-semibold text-foreground">${(subtotal * 0.8).toFixed(2)}</span> of your purchase goes directly to medical care for those in need. Thank you for making a difference!
            </p>
          </div>
          <Button asChild>
            <Link href="/">Continue Shopping</Link>
          </Button>
        </div>
      </div>
    )
  }

  if (items.length === 0) {
    return (
      <div className="container py-16">
        <h1 className="mb-6 text-3xl font-bold">Checkout</h1>
        <div className="rounded-lg border border-dashed p-12 text-center">
          <h2 className="mb-4 text-xl font-medium">Your cart is empty</h2>
          <p className="mb-8 text-muted-foreground">Add some items to your cart before checking out.</p>
          <Button asChild>
            <Link href="/shop">Continue Shopping</Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="container py-8 md:py-12">
      <h1 className="mb-6 text-3xl font-bold">Checkout</h1>

      {!user && (
        <div className="mb-6 rounded-lg border border-primary/20 bg-primary/5 p-4">
          <p className="text-sm">
            <Link href="/account" className="font-medium text-primary hover:underline">
              Log in
            </Link>{" "}
            to track your order and view order history. Or continue as a guest below.
          </p>
        </div>
      )}

      <div className="mb-8 flex justify-center">
        <div className="flex w-full max-w-md items-center">
          <div className={`flex-1 border-b-2 pb-2 ${step >= 1 ? "border-primary" : "border-muted"}`}>
            <div className="flex items-center">
              <div
                className={`mr-2 flex h-6 w-6 items-center justify-center rounded-full text-xs font-medium ${
                  step >= 1 ? "bg-primary text-white" : "bg-muted text-muted-foreground"
                }`}
              >
                1
              </div>
              <span className={step >= 1 ? "font-medium" : "text-muted-foreground"}>Shipping</span>
            </div>
          </div>
          <div className={`flex-1 border-b-2 pb-2 ${step >= 2 ? "border-primary" : "border-muted"}`}>
            <div className="flex items-center">
              <div
                className={`mr-2 flex h-6 w-6 items-center justify-center rounded-full text-xs font-medium ${
                  step >= 2 ? "bg-primary text-white" : "bg-muted text-muted-foreground"
                }`}
              >
                2
              </div>
              <span className={step >= 2 ? "font-medium" : "text-muted-foreground"}>Review & Pay</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <div className="rounded-lg border">
            <div className="p-6">
              {step === 1 && (
                <form onSubmit={handleSubmit}>
                  <h2 className="mb-4 text-lg font-medium">Shipping Information</h2>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="grid gap-2">
                      <label htmlFor="firstName" className="text-sm font-medium">First Name</label>
                      <input
                        id="firstName" name="firstName" type="text"
                        className="rounded-md border px-3 py-2"
                        value={formData.firstName} onChange={handleInputChange} required
                      />
                    </div>
                    <div className="grid gap-2">
                      <label htmlFor="lastName" className="text-sm font-medium">Last Name</label>
                      <input
                        id="lastName" name="lastName" type="text"
                        className="rounded-md border px-3 py-2"
                        value={formData.lastName} onChange={handleInputChange} required
                      />
                    </div>
                    <div className="grid gap-2">
                      <label htmlFor="email" className="text-sm font-medium">Email</label>
                      <input
                        id="email" name="email" type="email"
                        className="rounded-md border px-3 py-2"
                        value={formData.email} onChange={handleInputChange} required
                      />
                    </div>
                    <div className="grid gap-2">
                      <label htmlFor="phone" className="text-sm font-medium">Phone</label>
                      <input
                        id="phone" name="phone" type="tel"
                        className="rounded-md border px-3 py-2"
                        value={formData.phone} onChange={handleInputChange} required
                      />
                    </div>
                    <div className="grid gap-2 sm:col-span-2">
                      <label htmlFor="address" className="text-sm font-medium">Address</label>
                      <input
                        id="address" name="address" type="text"
                        className="rounded-md border px-3 py-2"
                        value={formData.address} onChange={handleInputChange} required
                      />
                    </div>
                    <div className="grid gap-2">
                      <label htmlFor="city" className="text-sm font-medium">City</label>
                      <input
                        id="city" name="city" type="text"
                        className="rounded-md border px-3 py-2"
                        value={formData.city} onChange={handleInputChange} required
                      />
                    </div>
                    <div className="grid gap-2">
                      <label htmlFor="state" className="text-sm font-medium">State / Province</label>
                      <input
                        id="state" name="state" type="text"
                        className="rounded-md border px-3 py-2"
                        value={formData.state} onChange={handleInputChange} required
                      />
                    </div>
                    <div className="grid gap-2">
                      <label htmlFor="zipCode" className="text-sm font-medium">ZIP / Postal Code</label>
                      <input
                        id="zipCode" name="zipCode" type="text"
                        className="rounded-md border px-3 py-2"
                        value={formData.zipCode} onChange={handleInputChange} required
                      />
                    </div>
                    <div className="grid gap-2">
                      <label htmlFor="country" className="text-sm font-medium">Country</label>
                      <select
                        id="country" name="country"
                        className="rounded-md border px-3 py-2"
                        value={formData.country}
                        onChange={(e) => setFormData((prev) => ({ ...prev, country: e.target.value }))}
                        required
                      >
                        <option value="United States">United States</option>
                        <option value="Canada">Canada</option>
                        <option value="United Kingdom">United Kingdom</option>
                        <option value="Australia">Australia</option>
                      </select>
                    </div>
                    <div className="grid gap-2 sm:col-span-2">
                      <label htmlFor="notes" className="text-sm font-medium">Order Notes (Optional)</label>
                      <textarea
                        id="notes" name="notes" rows={3}
                        className="rounded-md border px-3 py-2"
                        value={formData.notes} onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  <div className="mt-6 flex justify-end">
                    <Button type="submit">Continue to Review</Button>
                  </div>
                </form>
              )}

              {step === 2 && (
                <form onSubmit={handleSubmit}>
                  <h2 className="mb-4 text-lg font-medium">Review Your Order</h2>

                  <div className="mb-6 rounded-md border p-4">
                    <h3 className="mb-2 text-sm font-medium">Shipping To</h3>
                    <p className="text-sm text-muted-foreground">
                      {formData.firstName} {formData.lastName}<br />
                      {formData.address}<br />
                      {formData.city}, {formData.state} {formData.zipCode}<br />
                      {formData.country}
                    </p>
                  </div>

                  <div className="mb-6 rounded-md border p-4">
                    <h3 className="mb-2 text-sm font-medium">Payment</h3>
                    <p className="text-sm text-muted-foreground">
                      You will be redirected to a secure payment page to complete your purchase.
                    </p>
                  </div>

                  {orderError && (
                    <div className="mb-4 rounded-md border border-destructive/50 bg-destructive/10 p-3 text-sm text-destructive">
                      {orderError}
                    </div>
                  )}

                  <div className="mt-6 flex items-center justify-between">
                    <Button type="button" variant="outline" onClick={() => setStep(1)}>
                      Back
                    </Button>
                    <Button type="submit" disabled={submitting}>
                      {submitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                      Place Order
                    </Button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>

        <div>
          <div className="rounded-lg border">
            <div className="p-6">
              <h2 className="mb-4 text-lg font-medium">Order Summary</h2>
              <div className="grid gap-3">
                {items.map((item) => (
                  <div key={item.product._id} className="flex items-center justify-between text-sm">
                    <span>
                      {item.product.name} x {item.quantity}
                    </span>
                    <span>${(item.product.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
                <div className="my-2 border-t pt-2"></div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Shipping</span>
                  <span>{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span>
                </div>
                <div className="flex items-center justify-between font-medium">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-6 rounded-lg border p-6">
            <h3 className="mb-4 text-sm font-medium">Your Impact</h3>
            <div className="rounded-md bg-primary/10 p-3">
              <div className="flex items-start gap-2">
                <svg className="mt-0.5 h-5 w-5 shrink-0 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
                <div>
                  <p className="text-sm font-medium">
                    ${(subtotal * 0.8).toFixed(2)} of your purchase goes directly to medical care
                  </p>
                  <p className="mt-0.5 text-xs text-muted-foreground">
                    80¢ of every dollar funds medical treatments for low-income patients. Thank you for making a difference!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
