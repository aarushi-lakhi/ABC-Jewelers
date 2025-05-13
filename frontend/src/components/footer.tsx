import Link from "next/link"
import Image from "next/image"
import { Facebook, Instagram, Twitter } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function Footer() {
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
                <Link href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                  <Facebook className="h-5 w-5 text-primary" />
                  <span className="sr-only">Facebook</span>
                </Link>
              </Button>
              <Button variant="ghost" size="icon" className="rounded-full" asChild>
                <Link href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                  <Twitter className="h-5 w-5 text-primary" />
                  <span className="sr-only">Twitter</span>
                </Link>
              </Button>
            </div>
          </div>
          <div>
            <h3 className="mb-4 text-sm font-medium">Shop</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/shop/earrings" className="text-muted-foreground hover:text-primary">
                  Earrings
                </Link>
              </li>
              <li>
                <Link href="/shop/rings" className="text-muted-foreground hover:text-primary">
                  Rings
                </Link>
              </li>
              <li>
                <Link href="/shop/charms" className="text-muted-foreground hover:text-primary">
                  Charms
                </Link>
              </li>
              <li>
                <Link href="/shop/chains" className="text-muted-foreground hover:text-primary">
                  Chains
                </Link>
              </li>
              <li>
                <Link href="/collections" className="text-muted-foreground hover:text-primary">
                  Collections
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-sm font-medium">Company</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about" className="text-muted-foreground hover:text-primary">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/impact" className="text-muted-foreground hover:text-primary">
                  Our Impact
                </Link>
              </li>
              <li>
                <Link href="/sustainability" className="text-muted-foreground hover:text-primary">
                  Sustainability
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-muted-foreground hover:text-primary">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-muted-foreground hover:text-primary">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-sm font-medium">Stay Updated</h3>
            <p className="mb-4 text-sm text-muted-foreground">
              Subscribe to our newsletter for new products, special offers, and impact stories.
            </p>
            <form className="flex gap-2">
              <Input type="email" placeholder="Your email" className="h-9 bg-white/80" />
              <Button type="submit" size="sm">
                Subscribe
              </Button>
            </form>
          </div>
        </div>
        <div className="mt-12 border-t border-primary/20 pt-6 text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} ABC Jewelers. All rights reserved.</p>
          <div className="mt-2 flex justify-center gap-4">
            <Link href="/privacy" className="hover:text-primary">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-primary">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
