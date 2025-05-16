import Link from "next/link"
import { ShieldCheck, BellRingIcon as Ring, Sparkles, Pencil, Gem, CreditCard, Leaf } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function FAQPage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="bg-accent brown-paper py-16 md:py-24 torn-paper-bottom">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-light tracking-wide md:text-5xl">Frequently Asked Questions</h1>
            <p className="mt-6 text-lg text-muted-foreground font-light">
              Find answers to common questions about our products, services, and policies.
            </p>

            {/* Search Bar */}
            <div className="mt-8 mx-auto max-w-md">
              <div className="flex gap-2">
                <Input type="search" placeholder="Search for answers..." className="bg-white/90" />
                <Button type="submit">Search</Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Categories */}
      <section className="py-16 paper-texture">
        <div className="container">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {/* General */}
            <Link
              href="/faq/general"
              className="flex flex-col items-center justify-center rounded-lg border bg-white p-8 text-center shadow-sm transition-all hover:shadow-md hover:-translate-y-1"
            >
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                <ShieldCheck className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-light text-primary">General</h3>
              <p className="mt-2 text-sm text-muted-foreground font-light">Warranty information and return policies</p>
            </Link>

            {/* Ring Sizing and Fitting */}
            <Link
              href="/faq/ring-sizing"
              className="flex flex-col items-center justify-center rounded-lg border bg-white p-8 text-center shadow-sm transition-all hover:shadow-md hover:-translate-y-1"
            >
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                <Ring className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-light text-primary">Ring Sizing & Fitting</h3>
              <p className="mt-2 text-sm text-muted-foreground font-light">Finding the perfect fit for your rings</p>
            </Link>

            {/* Charms/Chain Procedure */}
            <Link
              href="/faq/charms-chains"
              className="flex flex-col items-center justify-center rounded-lg border bg-white p-8 text-center shadow-sm transition-all hover:shadow-md hover:-translate-y-1"
            >
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                <Sparkles className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-light text-primary">Charms & Chains</h3>
              <p className="mt-2 text-sm text-muted-foreground font-light">Adding and customizing charms and chains</p>
            </Link>

            {/* Custom Design */}
            <Link
              href="/faq/custom-design"
              className="flex flex-col items-center justify-center rounded-lg border bg-white p-8 text-center shadow-sm transition-all hover:shadow-md hover:-translate-y-1"
            >
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                <Pencil className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-light text-primary">Custom Design</h3>
              <p className="mt-2 text-sm text-muted-foreground font-light">
                Creating your unique, personalized jewelry
              </p>
            </Link>

            {/* Jewelry and Metals */}
            <Link
              href="/faq/jewelry-metals"
              className="flex flex-col items-center justify-center rounded-lg border bg-white p-8 text-center shadow-sm transition-all hover:shadow-md hover:-translate-y-1"
            >
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                <Gem className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-light text-primary">Jewelry & Metals</h3>
              <p className="mt-2 text-sm text-muted-foreground font-light">Materials, care, and maintenance</p>
            </Link>

            {/* Payment and Donations */}
            <Link
              href="/faq/payment-shipping"
              className="flex flex-col items-center justify-center rounded-lg border bg-white p-8 text-center shadow-sm transition-all hover:shadow-md hover:-translate-y-1"
            >
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                <CreditCard className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-light text-primary">Payment & Shipping</h3>
              <p className="mt-2 text-sm text-muted-foreground font-light">Orders, payments, shipping, and donations</p>
            </Link>

            {/* Ethical Sourcing & Sustainability */}
            <Link
              href="/faq/ethical-sourcing"
              className="flex flex-col items-center justify-center rounded-lg border bg-white p-8 text-center shadow-sm transition-all hover:shadow-md hover:-translate-y-1"
            >
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                <Leaf className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-light text-primary">Ethical Sourcing</h3>
              <p className="mt-2 text-sm text-muted-foreground font-light">Our commitment to sustainability</p>
            </Link>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="bg-primary/10 brown-paper py-12 torn-paper-top">
        <div className="container">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-2xl font-light tracking-wide">Still Have Questions?</h2>
            <p className="mt-4 text-muted-foreground font-light">
              Can't find the answer you're looking for? Please contact our friendly team.
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
