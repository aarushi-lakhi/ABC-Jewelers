"use client"

import type React from "react"
import { useState, useEffect } from "react"
import Link from "next/link"
import { Loader2, ShieldCheck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useAuth } from "@/components/auth-provider"
import { ordersAPI } from "@/lib/api"

interface Order {
  _id: string
  items: { name: string; price: number; quantity: number }[]
  totalAmount: number
  status: string
  paymentStatus: string
  createdAt: string
}

export default function AccountPage() {
  const { user, loading: authLoading, login, register, logout, error: authError } = useAuth()

  // ── Login / register form state ──────────────────────────────────────────
  const [activeTab, setActiveTab] = useState("login")
  const [formData, setFormData] = useState({ firstName: "", lastName: "", email: "", password: "" })
  const [formError, setFormError] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)

  // ── Orders ────────────────────────────────────────────────────────────────
  const [orders, setOrders] = useState<Order[]>([])
  const [ordersLoading, setOrdersLoading] = useState(false)

  useEffect(() => {
    if (!user) return
    setOrdersLoading(true)
    ordersAPI.getMyOrders()
      .then(setOrders)
      .catch(() => setOrders([]))
      .finally(() => setOrdersLoading(false))
  }, [user])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setFormError(null)
    setSubmitting(true)
    try {
      await login(formData.email, formData.password)
    } catch {
      setFormError(authError || "Invalid email or password.")
    } finally {
      setSubmitting(false)
    }
  }

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setFormError(null)
    setSubmitting(true)
    try {
      await register(`${formData.firstName} ${formData.lastName}`.trim(), formData.email, formData.password)
    } catch {
      setFormError(authError || "Could not create account.")
    } finally {
      setSubmitting(false)
    }
  }

  const totalSpent = orders
    .filter(o => o.paymentStatus === "completed")
    .reduce((sum, o) => sum + o.totalAmount, 0)

  const impactAmount = (totalSpent * 0.8).toFixed(2)

  // ── Loading ───────────────────────────────────────────────────────────────
  if (authLoading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  // ── Logged-in view ────────────────────────────────────────────────────────
  if (user) {
    return (
      <div className="container py-16">
        <div className="mx-auto max-w-2xl">
          <h1 className="mb-8 text-center text-3xl font-light tracking-wide">My Account</h1>

          {/* Account info */}
          <div className="mb-6 rounded-lg border bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-light">Account Information</h2>
              {user.role === "admin" && (
                <Link href="/admin">
                  <Button variant="outline" size="sm" className="gap-1.5 font-light">
                    <ShieldCheck className="h-4 w-4" />
                    Admin Panel
                  </Button>
                </Link>
              )}
            </div>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <div>
                <p className="text-sm text-muted-foreground">Name</p>
                <p className="font-medium">{user.name}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Email</p>
                <p className="font-medium">{user.email}</p>
              </div>
            </div>
          </div>

          {/* Order history */}
          <div className="mb-6 rounded-lg border bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-xl font-light">Order History</h2>
            {ordersLoading ? (
              <div className="flex justify-center py-8">
                <Loader2 className="h-6 w-6 animate-spin text-primary" />
              </div>
            ) : orders.length === 0 ? (
              <div className="rounded-lg border border-dashed p-8 text-center">
                <p className="font-light text-muted-foreground">You haven&apos;t placed any orders yet.</p>
                <Button asChild className="mt-4 font-light">
                  <Link href="/shop">Start Shopping</Link>
                </Button>
              </div>
            ) : (
              <div className="grid gap-3">
                {orders.map(order => (
                  <div key={order._id} className="rounded-md border p-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-xs text-muted-foreground font-mono">#{order._id.slice(-8).toUpperCase()}</p>
                        <p className="mt-1 text-sm">
                          {order.items.map(i => `${i.name} ×${i.quantity}`).join(", ")}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">${order.totalAmount.toFixed(2)}</p>
                        <span className={`text-xs font-medium ${
                          order.paymentStatus === "completed" ? "text-green-600" :
                          order.paymentStatus === "failed" ? "text-destructive" : "text-orange-500"
                        }`}>
                          {order.paymentStatus === "completed" ? "Paid" :
                           order.paymentStatus === "failed" ? "Failed" : "Pending"}
                        </span>
                      </div>
                    </div>
                    <p className="mt-2 text-xs text-muted-foreground capitalize">
                      Status: {order.status} · {new Date(order.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Impact */}
          <div className="mb-6 rounded-lg border bg-white p-6 shadow-sm">
            <h2 className="mb-3 text-xl font-light">Your Impact</h2>
            <div className="rounded-md bg-primary/10 p-4 text-center">
              {totalSpent > 0 ? (
                <>
                  <p className="font-medium">
                    You&apos;ve funded <span className="text-primary">${impactAmount}</span> in medical care
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground font-light">
                    80¢ of every dollar you spend goes directly to medical treatments for those in need.
                  </p>
                </>
              ) : (
                <>
                  <p className="font-medium">Your future purchases will fund medical care</p>
                  <p className="mt-1 text-sm text-muted-foreground font-light">
                    80¢ of every dollar goes directly to medical treatments for those in need.
                  </p>
                </>
              )}
            </div>
          </div>

          <div className="text-center">
            <Button variant="outline" onClick={logout} className="font-light">
              Log Out
            </Button>
          </div>
        </div>
      </div>
    )
  }

  // ── Logged-out view ───────────────────────────────────────────────────────
  return (
    <div className="container py-16">
      <div className="mx-auto max-w-md">
        <h1 className="mb-8 text-center text-3xl font-light tracking-wide">My Account</h1>

        <div className="rounded-lg border bg-white p-6 shadow-sm">
          <Tabs value={activeTab} onValueChange={v => { setActiveTab(v); setFormError(null) }}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login" className="font-light">Login</TabsTrigger>
              <TabsTrigger value="register" className="font-light">Register</TabsTrigger>
            </TabsList>

            <TabsContent value="login" className="mt-6">
              <form onSubmit={handleLogin}>
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <label htmlFor="email" className="text-sm font-light">Email</label>
                    <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} required />
                  </div>
                  <div className="grid gap-2">
                    <label htmlFor="password" className="text-sm font-light">Password</label>
                    <Input id="password" name="password" type="password" value={formData.password} onChange={handleChange} required />
                  </div>
                  {formError && <p className="text-sm text-destructive">{formError}</p>}
                  <Button type="submit" className="w-full font-light" disabled={submitting}>
                    {submitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Login
                  </Button>
                </div>
              </form>
            </TabsContent>

            <TabsContent value="register" className="mt-6">
              <form onSubmit={handleRegister}>
                <div className="grid gap-4">
                  <div className="grid gap-2 sm:grid-cols-2">
                    <div className="grid gap-2">
                      <label htmlFor="firstName" className="text-sm font-light">First Name</label>
                      <Input id="firstName" name="firstName" type="text" value={formData.firstName} onChange={handleChange} required />
                    </div>
                    <div className="grid gap-2">
                      <label htmlFor="lastName" className="text-sm font-light">Last Name</label>
                      <Input id="lastName" name="lastName" type="text" value={formData.lastName} onChange={handleChange} required />
                    </div>
                  </div>
                  <div className="grid gap-2">
                    <label htmlFor="registerEmail" className="text-sm font-light">Email</label>
                    <Input id="registerEmail" name="email" type="email" value={formData.email} onChange={handleChange} required />
                  </div>
                  <div className="grid gap-2">
                    <label htmlFor="registerPassword" className="text-sm font-light">Password</label>
                    <Input id="registerPassword" name="password" type="password" value={formData.password} onChange={handleChange} required />
                  </div>
                  {formError && <p className="text-sm text-destructive">{formError}</p>}
                  <Button type="submit" className="w-full font-light" disabled={submitting}>
                    {submitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Create Account
                  </Button>
                </div>
              </form>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
