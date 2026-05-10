"use client"

import { useState } from "react"
import Link from "next/link"
import { ShieldCheck, BellRingIcon as Ring, Sparkles, Pencil, Gem, CreditCard, Leaf } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

const FAQ_CATEGORIES = [
  { href: "/faq/general", icon: ShieldCheck, title: "General", description: "Warranty information and return policies" },
  { href: "/faq/ring-sizing", icon: Ring, title: "Ring Sizing & Fitting", description: "Finding the perfect fit for your rings" },
  { href: "/faq/charms-chains", icon: Sparkles, title: "Charms & Chains", description: "Adding and customizing charms and chains" },
  { href: "/faq/custom-design", icon: Pencil, title: "Custom Design", description: "Creating your unique, personalized jewelry" },
  { href: "/faq/jewelry-metals", icon: Gem, title: "Jewelry & Metals", description: "Materials, care, and maintenance" },
  { href: "/faq/payment-shipping", icon: CreditCard, title: "Payment & Shipping", description: "Orders, payments, shipping, and donations" },
  { href: "/faq/ethical-sourcing", icon: Leaf, title: "Ethical Sourcing", description: "Our commitment to sustainability" },
]

export default function FAQPage() {
  const [search, setSearch] = useState("")

  const filtered = FAQ_CATEGORIES.filter(c =>
    c.title.toLowerCase().includes(search.toLowerCase()) ||
    c.description.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="flex flex-col">
      <section className="bg-accent brown-paper py-16 md:py-24 torn-paper-bottom">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-light tracking-wide md:text-5xl">Frequently Asked Questions</h1>
            <p className="mt-6 text-lg text-muted-foreground font-light">
              Find answers to common questions about our products, services, and policies.
            </p>
            <div className="mt-8 mx-auto max-w-md">
              <Input
                type="search"
                placeholder="Search for answers..."
                className="bg-white/90"
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 paper-texture">
        <div className="container">
          {filtered.length === 0 ? (
            <div className="py-12 text-center">
              <p className="text-muted-foreground font-light">No categories match &ldquo;{search}&rdquo;. Try a different keyword or</p>
              <Button variant="link" onClick={() => setSearch("")}>clear the search</Button>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map(({ href, icon: Icon, title, description }) => (
                <Link
                  key={href}
                  href={href}
                  className="flex flex-col items-center justify-center rounded-lg border bg-white p-8 text-center shadow-sm transition-all hover:shadow-md hover:-translate-y-1"
                >
                  <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                    <Icon className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-light text-primary">{title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground font-light">{description}</p>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="bg-primary/10 brown-paper py-12 torn-paper-top">
        <div className="container">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-2xl font-light tracking-wide">Still Have Questions?</h2>
            <p className="mt-4 text-muted-foreground font-light">
              Can&apos;t find the answer you&apos;re looking for? Please contact our friendly team.
            </p>
            <Button asChild className="mt-6 font-light">
              <Link href="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
