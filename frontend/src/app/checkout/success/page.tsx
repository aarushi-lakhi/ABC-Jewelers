"use client"

import { useEffect, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCart } from "@/components/cart-provider"

function SuccessContent() {
  const searchParams = useSearchParams()
  const orderId = searchParams.get("orderId")
  const { clearCart } = useCart()

  useEffect(() => {
    clearCart()
  }, [])

  return (
    <div className="container py-16">
      <div className="mx-auto max-w-md rounded-lg border p-8 text-center">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
          <Check className="h-6 w-6 text-green-600" />
        </div>
        <h1 className="mb-2 text-2xl font-bold">Payment Successful!</h1>
        <p className="mb-6 text-muted-foreground">
          Thank you for your purchase. Your order has been confirmed and will be processed shortly.
        </p>
        {orderId && (
          <p className="mb-4 text-sm text-muted-foreground">
            Order ID: <span className="font-mono font-medium">{orderId}</span>
          </p>
        )}
        <div className="mb-6 rounded-md bg-primary/10 p-4 text-center">
          <p className="font-medium">Your Impact</p>
          <p className="text-sm text-muted-foreground">
            Your purchase directly funds medical care for those in need. Thank you for making a difference!
          </p>
        </div>
        <div className="flex flex-col gap-3">
          <Button asChild>
            <Link href="/shop">Continue Shopping</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/">Go Home</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}

export default function CheckoutSuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="container flex min-h-[400px] items-center justify-center py-16">
          <p>Loading...</p>
        </div>
      }
    >
      <SuccessContent />
    </Suspense>
  )
}
