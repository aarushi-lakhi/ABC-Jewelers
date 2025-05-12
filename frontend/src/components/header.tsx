"use client"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { ShoppingBag, Heart, Menu, X, Search, User, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useCart } from "@/components/cart-provider"
import { useWishlist } from "@/components/wishlist-provider"

const navigation = [
  { name: "Home", href: "/" },
  {
    name: "Shop",
    href: "/shop",
    dropdown: true,
    items: [
      { name: "All Collections", href: "/shop" },
      { name: "Earrings", href: "/shop/earrings" },
      { name: "Rings", href: "/shop/rings" },
      { name: "Charms", href: "/shop/charms" },
      { name: "Chains", href: "/shop/chains" },
    ],
  },
  { name: "Our Impact", href: "/impact" },
  { name: "About Us", href: "/about" },
  { name: "Contact", href: "/contact" },
]

export default function Header() {
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)
  const pathname = usePathname()
  const { cartCount } = useCart()
  const { wishlistCount } = useWishlist()
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpenDropdown(null)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  // Close dropdown when navigating
  useEffect(() => {
    setOpenDropdown(null)
  }, [pathname])

  const toggleDropdown = (name: string) => {
    setOpenDropdown(openDropdown === name ? null : name)
  }

  return (
    <>
      <div className="announcement-bar">FREE SHIPPING ON ALL ORDERS $40+ | USE CODE "IMPACT10" FOR 10% OFF</div>
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[300px] sm:w-[400px]">
                <div className="flex flex-col gap-6 py-4">
                  <Link href="/" className="flex items-center gap-2">
                    <Image src="/logo.png" alt="ABC Jewelers" width={120} height={40} className="h-10 w-auto" />
                  </Link>
                  <nav className="flex flex-col gap-4">
                    {navigation.map((item) => (
                      <div key={item.name}>
                        {item.dropdown ? (
                          <div className="flex flex-col gap-2">
                            <button
                              className={`flex items-center justify-between text-lg ${
                                pathname.startsWith(item.href) ? "font-normal text-primary" : "text-muted-foreground"
                              }`}
                              onClick={() => toggleDropdown(item.name)}
                            >
                              {item.name}
                              <ChevronDown
                                className={`h-4 w-4 transition-transform ${openDropdown === item.name ? "rotate-180" : ""}`}
                              />
                            </button>
                            {openDropdown === item.name && (
                              <div className="ml-4 flex flex-col gap-2 pl-2 border-l">
                                {item.items?.map((subItem) => (
                                  <Link
                                    key={subItem.name}
                                    href={subItem.href}
                                    className={`text-sm ${
                                      pathname === subItem.href ? "font-normal text-primary" : "text-muted-foreground"
                                    }`}
                                  >
                                    {subItem.name}
                                  </Link>
                                ))}
                              </div>
                            )}
                          </div>
                        ) : (
                          <Link
                            href={item.href}
                            className={`text-lg ${
                              pathname === item.href ? "font-normal text-primary" : "text-muted-foreground"
                            }`}
                          >
                            {item.name}
                          </Link>
                        )}
                      </div>
                    ))}
                  </nav>
                </div>
              </SheetContent>
            </Sheet>
          </div>

          <div className="flex items-center gap-2">
            <Link href="/" className="flex items-center gap-2">
              <Image src="/logo.png" alt="ABC Jewelers" width={120} height={40} className="h-10 w-auto" />
            </Link>
          </div>

          <nav className="hidden md:flex md:gap-6 lg:gap-10" ref={dropdownRef}>
            {navigation.map((item) => (
              <div key={item.name} className="relative">
                {item.dropdown ? (
                  <>
                    <button
                      className={`flex items-center gap-1 text-sm font-light tracking-wide transition-colors hover:text-primary ${
                        pathname.startsWith(item.href) ? "text-primary" : "text-muted-foreground"
                      }`}
                      onClick={() => toggleDropdown(item.name)}
                      aria-expanded={openDropdown === item.name}
                    >
                      {item.name}
                      <ChevronDown
                        className={`h-4 w-4 transition-transform ${openDropdown === item.name ? "rotate-180" : ""}`}
                      />
                    </button>
                    {openDropdown === item.name && (
                      <div className="dropdown-animation absolute left-0 top-full mt-1 w-48 rounded-md border bg-background shadow-lg">
                        <div className="py-1">
                          {item.items?.map((subItem) => (
                            <Link
                              key={subItem.name}
                              href={subItem.href}
                              className={`block px-4 py-2 text-sm font-light hover:bg-accent ${
                                pathname === subItem.href ? "font-normal text-primary" : "text-muted-foreground"
                              }`}
                            >
                              {subItem.name}
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                  </>
                ) : (
                  <Link
                    href={item.href}
                    className={`text-sm font-light tracking-wide transition-colors hover:text-primary ${
                      pathname === item.href ? "text-primary" : "text-muted-foreground"
                    }`}
                  >
                    {item.name}
                  </Link>
                )}
              </div>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            {isSearchOpen ? (
              <div className="flex items-center">
                <Input
                  type="search"
                  placeholder="Search..."
                  className="h-9 w-[150px] lg:w-[250px]"
                  autoFocus
                  onBlur={() => setIsSearchOpen(false)}
                />
                <Button variant="ghost" size="icon" onClick={() => setIsSearchOpen(false)}>
                  <X className="h-5 w-5" />
                  <span className="sr-only">Close search</span>
                </Button>
              </div>
            ) : (
              <Button variant="ghost" size="icon" onClick={() => setIsSearchOpen(true)}>
                <Search className="h-5 w-5" />
                <span className="sr-only">Search</span>
              </Button>
            )}
            <Button variant="ghost" size="icon" className="relative" asChild>
              <Link href="/wishlist">
                <Heart className="h-5 w-5" />
                {wishlistCount > 0 && (
                  <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-medium text-primary-foreground">
                    {wishlistCount}
                  </span>
                )}
                <span className="sr-only">Wishlist</span>
              </Link>
            </Button>
            <Button variant="ghost" size="icon" asChild>
              <Link href="/account">
                <User className="h-5 w-5" />
                <span className="sr-only">Account</span>
              </Link>
            </Button>
            <Button variant="ghost" size="icon" className="relative" asChild>
              <Link href="/cart">
                <ShoppingBag className="h-5 w-5" />
                {cartCount > 0 && (
                  <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-medium text-primary-foreground">
                    {cartCount}
                  </span>
                )}
                <span className="sr-only">Cart</span>
              </Link>
            </Button>
          </div>
        </div>
      </header>
    </>
  )
}
