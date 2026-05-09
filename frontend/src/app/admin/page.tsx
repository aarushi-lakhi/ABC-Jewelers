"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Loader2, Save, RotateCcw, Package } from "lucide-react"
import { useAuth } from "@/components/auth-provider"
import { productsAPI } from "@/lib/api"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import type { Product } from "@/lib/types"

interface RowState {
  stock: number
  price: number
  saving: boolean
  saved: boolean
  error: string | null
}

const CATEGORIES = ["earrings", "rings", "charms", "chains"]

export default function AdminPage() {
  const { user, loading: authLoading } = useAuth()
  const router = useRouter()

  const [products, setProducts] = useState<Product[]>([])
  const [rows, setRows] = useState<Record<string, RowState>>({})
  const [loadingProducts, setLoadingProducts] = useState(true)
  const [search, setSearch] = useState("")

  // Auth guard — runs after auth loads
  useEffect(() => {
    if (!authLoading && user?.role !== "admin") {
      router.replace("/")
    }
  }, [authLoading, user, router])

  useEffect(() => {
    if (user?.role !== "admin") return
    productsAPI
      .getAll({ sortBy: "featured" })
      .then((data: Product[]) => {
        // Sort by category order then sortOrder
        const sorted = [...data].sort((a, b) => {
          const ci = CATEGORIES.indexOf(a.category) - CATEGORIES.indexOf(b.category)
          return ci !== 0 ? ci : a.name.localeCompare(b.name)
        })
        setProducts(sorted)
        const initial: Record<string, RowState> = {}
        for (const p of sorted) {
          initial[p._id] = { stock: p.stock, price: p.price, saving: false, saved: false, error: null }
        }
        setRows(initial)
      })
      .finally(() => setLoadingProducts(false))
  }, [user])

  const isDirty = (id: string, product: Product) => {
    const r = rows[id]
    if (!r) return false
    return r.stock !== product.stock || r.price !== product.price
  }

  const handleSave = async (product: Product) => {
    const r = rows[product._id]
    if (!r) return
    setRows(prev => ({ ...prev, [product._id]: { ...prev[product._id], saving: true, error: null } }))
    try {
      await productsAPI.update(product._id, { stock: r.stock, price: r.price })
      // Update local product list so isDirty resets
      setProducts(prev => prev.map(p => p._id === product._id ? { ...p, stock: r.stock, price: r.price } : p))
      setRows(prev => ({ ...prev, [product._id]: { ...prev[product._id], saving: false, saved: true, error: null } }))
      setTimeout(() => setRows(prev => ({ ...prev, [product._id]: { ...prev[product._id], saved: false } })), 2000)
    } catch {
      setRows(prev => ({ ...prev, [product._id]: { ...prev[product._id], saving: false, error: "Save failed" } }))
    }
  }

  const handleReset = (product: Product) => {
    setRows(prev => ({ ...prev, [product._id]: { ...prev[product._id], stock: product.stock, price: product.price, error: null } }))
  }

  const setField = (id: string, field: "stock" | "price", value: number) => {
    setRows(prev => ({ ...prev, [id]: { ...prev[id], [field]: value, saved: false } }))
  }

  if (authLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  if (!user || user.role !== "admin") return null

  const filtered = products.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.category.toLowerCase().includes(search.toLowerCase())
  )

  const byCategory = CATEGORIES.map(cat => ({
    cat,
    items: filtered.filter(p => p.category === cat),
  })).filter(g => g.items.length > 0)

  const totalProducts = products.length
  const outOfStock = products.filter(p => p.stock === 0).length
  const lowStock = products.filter(p => p.stock > 0 && p.stock <= 3).length

  return (
    <div className="container py-8">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Inventory Manager</h1>
          <p className="text-sm text-muted-foreground">Edit stock and prices — changes save instantly to the database</p>
        </div>
        <div className="flex gap-3 text-center text-sm">
          <div className="rounded-lg border px-4 py-2">
            <p className="text-2xl font-bold">{totalProducts}</p>
            <p className="text-muted-foreground">Products</p>
          </div>
          <div className="rounded-lg border px-4 py-2">
            <p className="text-2xl font-bold text-orange-500">{lowStock}</p>
            <p className="text-muted-foreground">Low stock</p>
          </div>
          <div className="rounded-lg border px-4 py-2">
            <p className="text-2xl font-bold text-destructive">{outOfStock}</p>
            <p className="text-muted-foreground">Out of stock</p>
          </div>
        </div>
      </div>

      <div className="mb-4">
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full max-w-sm rounded-md border px-3 py-2 text-sm"
        />
      </div>

      {loadingProducts ? (
        <div className="flex min-h-[300px] items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : (
        <div className="grid gap-8">
          {byCategory.map(({ cat, items }) => (
            <div key={cat}>
              <h2 className="mb-3 flex items-center gap-2 text-lg font-semibold capitalize">
                <Package className="h-5 w-5 text-primary" />
                {cat}
                <span className="text-sm font-normal text-muted-foreground">({items.length})</span>
              </h2>
              <div className="overflow-hidden rounded-lg border">
                <table className="w-full text-sm">
                  <thead className="border-b bg-muted/50">
                    <tr>
                      <th className="px-4 py-3 text-left font-medium">Product</th>
                      <th className="px-4 py-3 text-center font-medium">Price ($)</th>
                      <th className="px-4 py-3 text-center font-medium">
                        {cat === "chains" ? "Stock (inches)" : "Stock (units)"}
                      </th>
                      <th className="px-4 py-3 text-center font-medium">Status</th>
                      <th className="px-4 py-3 text-center font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {items.map(product => {
                      const r = rows[product._id]
                      if (!r) return null
                      const dirty = isDirty(product._id, product)
                      const stockVal = r.stock
                      return (
                        <tr key={product._id} className={dirty ? "bg-yellow-50/50" : ""}>
                          <td className="px-4 py-3">
                            <div className="font-medium">{product.name}</div>
                            {product.options?.customization?.length > 0 && (
                              <div className="text-xs text-muted-foreground">
                                {product.options.customization.length} option{product.options.customization.length !== 1 ? "s" : ""}
                              </div>
                            )}
                          </td>
                          <td className="px-4 py-3 text-center">
                            <input
                              type="number"
                              min="0"
                              step="0.25"
                              value={r.price}
                              onChange={e => setField(product._id, "price", parseFloat(e.target.value) || 0)}
                              className="w-20 rounded border px-2 py-1 text-center text-sm"
                            />
                          </td>
                          <td className="px-4 py-3 text-center">
                            <input
                              type="number"
                              min="0"
                              value={r.stock}
                              onChange={e => setField(product._id, "stock", parseInt(e.target.value) || 0)}
                              className={`w-20 rounded border px-2 py-1 text-center text-sm ${
                                stockVal === 0 ? "border-destructive text-destructive" :
                                stockVal <= 3 ? "border-orange-400 text-orange-600" : ""
                              }`}
                            />
                          </td>
                          <td className="px-4 py-3 text-center">
                            {stockVal === 0 ? (
                              <Badge variant="destructive">Out of Stock</Badge>
                            ) : stockVal <= 3 ? (
                              <Badge className="bg-orange-100 text-orange-700 hover:bg-orange-100">Low Stock</Badge>
                            ) : (
                              <Badge className="bg-green-100 text-green-700 hover:bg-green-100">In Stock</Badge>
                            )}
                          </td>
                          <td className="px-4 py-3 text-center">
                            <div className="flex items-center justify-center gap-1">
                              {dirty && (
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  onClick={() => handleReset(product)}
                                  disabled={r.saving}
                                  title="Discard changes"
                                >
                                  <RotateCcw className="h-3.5 w-3.5" />
                                </Button>
                              )}
                              <Button
                                size="sm"
                                onClick={() => handleSave(product)}
                                disabled={!dirty || r.saving}
                                className="min-w-[64px]"
                              >
                                {r.saving ? (
                                  <Loader2 className="h-3.5 w-3.5 animate-spin" />
                                ) : r.saved ? (
                                  "Saved ✓"
                                ) : (
                                  <>
                                    <Save className="mr-1 h-3.5 w-3.5" />
                                    Save
                                  </>
                                )}
                              </Button>
                            </div>
                            {r.error && <p className="mt-1 text-xs text-destructive">{r.error}</p>}
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
          {filtered.length === 0 && (
            <p className="text-center text-muted-foreground py-12">No products match your search.</p>
          )}
        </div>
      )}
    </div>
  )
}
