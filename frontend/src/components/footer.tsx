"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Instagram, Mail, Star, Loader2 } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { emailAPI } from "@/lib/api"

export default function Footer() {
  const [newsletterEmail, setNewsletterEmail] = useState("")
  const [newsletterState, setNewsletterState] = useState<"idle" | "loading" | "done" | "error">("idle")

  const handleNewsletter = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newsletterEmail) return
    setNewsletterState("loading")
    try {
      await emailAPI.newsletter(newsletterEmail)
      setNewsletterState("done")
      setNewsletterEmail("")
    } catch {
      setNewsletterState("error")
    }
  }

  return (
    <footer className="bg-accent paper-texture">
      <div className="container py-12 md:py-16">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div className="flex flex-col gap-4">
            <Link href="/" className="flex items-center gap-2">
              <Image src="/logo.png" alt="ABC Jewelers" width={150} height={50} className="h-auto w-auto" />
            </Link>
            <p className="text-sm text-muted-foreground">
              Handmade jewelry that funds medical care for low-income patients. Every purchase makes a difference.
            </p>
            <div className="flex gap-4">
              <Button variant="ghost" size="icon" className="rounded-full" asChild>
                <Link href="https://instagram.com/abc.jewelers" target="_blank" rel="noopener noreferrer">
                  <Instagram className="h-5 w-5 text-primary" />
                  <span className="sr-only">Instagram</span>
                </Link>
              </Button>
              <Button variant="ghost" size="icon" className="rounded-full" asChild>
                <Link href="mailto:jewelersabc@gmail.com">
                  <Mail className="h-5 w-5 text-primary" />
                  <span className="sr-only">Email</span>
                </Link>
              </Button>
              <Button variant="ghost" size="icon" className="rounded-full" asChild>
                {/* TODO: try to replace this with a better link */}
                <Link href="https://www.google.com/search?q=abc+jewelers+pearland#lrd=0x864093de04e93ae1:0xba734f07858426a,1,,,," target="_blank" rel="noopener noreferrer">
                  <Star className="h-5 w-5 text-primary" />
                  <span className="sr-only">Google Reviews</span>
                </Link>
              </Button>
            </div>
          </div>
          <div>
            <h3 className="mb-4 text-sm font-medium">Shop</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/shop/earrings" className="text-muted-foreground hover:text-primary">Earrings</Link></li>
              <li><Link href="/shop/rings" className="text-muted-foreground hover:text-primary">Rings</Link></li>
              <li><Link href="/shop/charms" className="text-muted-foreground hover:text-primary">Charms</Link></li>
              <li><Link href="/shop/chains" className="text-muted-foreground hover:text-primary">Chains</Link></li>
              <li><Link href="/shop" className="text-muted-foreground hover:text-primary">Collections</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-sm font-medium">Company</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/about" className="text-muted-foreground hover:text-primary">About Us</Link></li>
              <li><Link href="/impact" className="text-muted-foreground hover:text-primary">Our Impact</Link></li>
              <li><Link href="/sustainability" className="text-muted-foreground hover:text-primary">Sustainability</Link></li>
              <li><Link href="/contact" className="text-muted-foreground hover:text-primary">Contact</Link></li>
              <li><Link href="/faq" className="text-muted-foreground hover:text-primary">FAQ</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-sm font-medium">Stay Updated</h3>
            <p className="mb-4 text-sm text-muted-foreground">
              Subscribe for new products, special offers, and impact stories.
            </p>
            {newsletterState === "done" ? (
              <p className="text-sm text-primary font-medium">You&apos;re subscribed! Thank you ✓</p>
            ) : (
              <form onSubmit={handleNewsletter} className="flex gap-2">
                <Input
                  type="email"
                  placeholder="Your email"
                  className="h-9 bg-white/80"
                  value={newsletterEmail}
                  onChange={e => setNewsletterEmail(e.target.value)}
                  required
                />
                <Button type="submit" size="sm" disabled={newsletterState === "loading"}>
                  {newsletterState === "loading" ? <Loader2 className="h-4 w-4 animate-spin" /> : "Subscribe"}
                </Button>
              </form>
            )}
            {newsletterState === "error" && (
              <p className="mt-1 text-xs text-destructive">Something went wrong. Try again.</p>
            )}
          </div>
        </div>
        <div className="mt-12 border-t border-primary/20 pt-6 text-center text-sm text-muted-foreground">
          <p suppressHydrationWarning>© {new Date().getFullYear()} ABC Jewelers. All rights reserved.</p>
          <div className="mt-2 flex justify-center gap-4">
            <Link href="/privacy" className="hover:text-primary">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-primary">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
