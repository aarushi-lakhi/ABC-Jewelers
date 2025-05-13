import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import FeaturedProducts from "@/components/featured-products"
import ImpactSection from "@/components/impact-section"
import CollectionsPreview from "@/components/collections-preview"

// Testimonials data
const testimonials = [
  {
    id: 1,
    quote: "From the moment I laid eyes on their pieces, I was struck by ABC Jeweler's beauty and craftsmanship. The attention to detail is remarkable and each piece is a work of art. 10/10 would recommend to anyone looking for sustainable and adorable jewelry pieces!! I feel amazing wearing ABC :)",
    author: "Hanna T.",
    avatarUrl: "/placeholder.svg?height=40&width=40", // TODO: update this with avatars
    rating: 5,
  },
  {
    id: 2,
    quote: "ABC Jewelers sells great jewelry for a great cause. Their rings especially have contributed to many slay outfits",
    author: "Isaac F.",
    avatarUrl: "/placeholder.svg?height=40&width=40",
    rating: 5,
  },
  {
    id: 3,
    quote: "One of the best handmade, sustainable and ethically made jewelry pieces I possess. Great communication and customization options. Highly recommended, also great communication with international customers.",
    author: "Bartosz D.",
    avatarUrl: "/placeholder.svg?height=40&width=40",
    rating: 5,
  },
];

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative bg-accent brown-paper py-16 md:py-24 torn-paper-bottom">
        <div className="container grid gap-8 md:grid-cols-2 md:items-center">
          <div className="flex flex-col gap-6 text-center md:text-left">
            <h1 className="text-4xl font-light tracking-wide md:text-5xl lg:text-6xl">
              Jewelry with <span className="text-primary">Purpose</span>
            </h1>
            <p className="text-lg text-muted-foreground font-light md:text-xl">
              Handcrafted pieces that fund medical care for those in need. Shop our collections and make a difference.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center md:justify-start">
              <Button size="lg" asChild className="font-light">
                <Link href="/shop">Shop Now</Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="font-light">
                <Link href="/impact">Our Impact</Link>
              </Button>
            </div>
          </div>
          <div className="relative mx-auto grid max-w-[500px] grid-cols-2 gap-4">
            <div className="polaroid rotate-[-3deg]">
              <Image
                src="/placeholder.svg?height=400&width=300"
                alt="Earrings Collection"
                width={300}
                height={400}
                className="h-auto w-full object-cover"
              />
              <p className="polaroid-caption">From ABC's Earring Collection</p>
            </div>
            <div className="polaroid mt-8 rotate-[2deg]">
              <Image
                src="/placeholder.svg?height=400&width=300"
                alt="Rings Collection"
                width={300}
                height={400}
                className="h-auto w-full object-cover"
              />
              <p className="polaroid-caption">From ABC's Ring Collection</p>
            </div>
          </div>
        </div>
      </section>

      {/* Collections Preview */}
      <CollectionsPreview />

      {/* Featured Products */}
      <section className="py-16 paper-texture">
        <div className="container">
          <div className="mb-10 flex items-center justify-between">
            <h2 className="text-2xl font-light tracking-wide md:text-3xl soft-heading">Featured Products</h2>
            <Link href="/shop" className="flex items-center gap-1 text-sm font-light text-primary hover:underline">
              View All <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <FeaturedProducts />
        </div>
      </section>

      {/* Impact Section */}
      <ImpactSection />

      {/* Testimonials */}
      <section className="bg-accent brown-paper py-16 torn-paper-top torn-paper-bottom">
        <div className="container">
          <h2 className="mb-10 text-center text-2xl font-light tracking-wide md:text-3xl soft-heading">
            What Our Customers Say
          </h2>
          <div className="grid gap-6 md:grid-cols-3">
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="polaroid rotate-[0deg] hover:rotate-[1deg]">
                <div className="rounded-lg bg-white p-6">
                  <div className="mb-4 flex">
                    {[...Array(testimonial.rating)].map((_, j) => (
                      <svg key={j} className="h-5 w-5 fill-primary" viewBox="0 0 20 20" fill="currentColor">
                        <path
                          fillRule="evenodd"
                          d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z"
                          clipRule="evenodd"
                        />
                      </svg>
                    ))}
                  </div>
                  <p className="mb-4 font-light text-gray-600">
                    "{testimonial.quote}" {/* This is line ~122 where the error occurs */}
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 overflow-hidden rounded-full bg-muted">
                      <Image
                        src={testimonial.avatarUrl} 
                        alt={testimonial.author}
                        width={40}
                        height={40}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div>
                      <p className="font-medium">{testimonial.author}</p>
                      <p className="text-xs font-light text-gray-500">Verified Customer</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 paper-texture">
        <div className="container">
          <div className="rounded-lg bg-primary/10 p-8 md:p-12">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="mb-4 text-2xl font-light tracking-wide md:text-3xl soft-heading">Join Our Community</h2>
              <p className="mb-6 font-light text-gray-600">
                Subscribe to our newsletter for new product announcements, special offers, and stories about our impact.
              </p>
              <form className="flex flex-col gap-3 sm:flex-row sm:justify-center">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="rounded-md border bg-white/80 px-4 py-2 sm:min-w-[300px]"
                  required
                />
                <Button type="submit" className="font-light">
                  Subscribe
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}