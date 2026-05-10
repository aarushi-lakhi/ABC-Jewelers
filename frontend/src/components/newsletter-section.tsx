"use client"

import { useState } from "react"
import { Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { emailAPI } from "@/lib/api"

export default function NewsletterSection() {
  const [email, setEmail] = useState("")
  const [state, setState] = useState<"idle" | "loading" | "done" | "error">("idle")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    setState("loading")
    try {
      await emailAPI.newsletter(email)
      setState("done")
      setEmail("")
    } catch {
      setState("error")
    }
  }

  return (
    <section className="py-16 paper-texture">
      <div className="container">
        <div className="rounded-lg bg-primary/10 p-8 md:p-12">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="mb-4 text-2xl font-light tracking-wide md:text-3xl soft-heading">Join Our Community</h2>
            <p className="mb-6 font-light text-gray-600">
              Subscribe to our newsletter for new product announcements, special offers, and stories about our impact.
            </p>
            {state === "done" ? (
              <p className="text-primary font-medium">You&apos;re subscribed! Thank you ✓</p>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:flex-row sm:justify-center">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="rounded-md border bg-white/80 px-4 py-2 sm:min-w-[300px]"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                />
                <Button type="submit" className="font-light" disabled={state === "loading"}>
                  {state === "loading" ? <Loader2 className="h-4 w-4 animate-spin" /> : "Subscribe"}
                </Button>
              </form>
            )}
            {state === "error" && (
              <p className="mt-2 text-sm text-destructive">Something went wrong. Please try again.</p>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
