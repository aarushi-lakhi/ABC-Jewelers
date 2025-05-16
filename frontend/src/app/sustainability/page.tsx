import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Leaf, Recycle, Droplet, Heart } from "lucide-react"

export default function SustainabilityPage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="bg-accent brown-paper py-16 md:py-24 torn-paper-bottom">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-light tracking-wide md:text-5xl">Our Commitment to Sustainability</h1>
            <p className="mt-6 text-lg text-muted-foreground font-light">
              At ABC Jewelers, we believe in creating beautiful jewelry that respects our planet and its people.
            </p>
          </div>
        </div>
      </section>

      {/* Our Approach */}
      <section className="py-16 paper-texture">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-light tracking-wide soft-heading">Our Approach</h2>
            <p className="mt-6 text-lg text-muted-foreground font-light">
              Sustainability isn't just a buzzword for us—it's woven into every aspect of our business. From the
              materials we source to the packaging we use, we're committed to making choices that minimize our
              environmental footprint while maximizing our positive social impact.
            </p>
          </div>

          <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div className="flex flex-col items-center text-center">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                <Recycle className="h-8 w-8 text-primary" />
              </div>
              <h3 className="mb-2 text-xl font-light text-primary">Recycled Materials</h3>
              <p className="text-muted-foreground font-light">
                We prioritize recycled metals in our jewelry, reducing the need for environmentally harmful mining
                practices.
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                <Leaf className="h-8 w-8 text-primary" />
              </div>
              <h3 className="mb-2 text-xl font-light text-primary">Ethical Sourcing</h3>
              <p className="text-muted-foreground font-light">
                We carefully select suppliers who share our values of environmental stewardship and fair labor
                practices.
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                <Droplet className="h-8 w-8 text-primary" />
              </div>
              <h3 className="mb-2 text-xl font-light text-primary">Water Conservation</h3>
              <p className="text-muted-foreground font-light">
                Our production processes are designed to minimize water usage and prevent pollution of water sources.
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                <Heart className="h-8 w-8 text-primary" />
              </div>
              <h3 className="mb-2 text-xl font-light text-primary">Community Support</h3>
              <p className="text-muted-foreground font-light">
                We invest in the communities where our materials come from, supporting education and healthcare
                initiatives.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Materials */}
      <section className="bg-primary/10 brown-paper py-16 torn-paper-top torn-paper-bottom">
        <div className="container">
          <div className="grid gap-8 md:grid-cols-2 md:items-center">
            <div className="order-2 md:order-1">
              <h2 className="text-3xl font-light tracking-wide soft-heading">Sustainable Materials</h2>
              <p className="mt-4 text-muted-foreground font-light">
                We carefully select materials that minimize environmental impact while maintaining the beauty and
                quality you expect from ABC Jewelers.
              </p>

              <div className="mt-6 space-y-4">
                <div className="rounded-lg bg-white/80 p-4 shadow-sm">
                  <h3 className="text-lg font-medium text-primary">Recycled Sterling Silver</h3>
                  <p className="text-muted-foreground font-light">
                    Our silver comes from recycled sources, reducing the need for environmentally damaging mining
                    operations while maintaining the same quality and beauty as newly mined silver.
                  </p>
                </div>

                <div className="rounded-lg bg-white/80 p-4 shadow-sm">
                  <h3 className="text-lg font-medium text-primary">Ethically Sourced Gemstones</h3>
                  <p className="text-muted-foreground font-light">
                    We work with suppliers who adhere to responsible mining practices and fair labor standards, ensuring
                    our gemstones are as beautiful ethically as they are visually.
                  </p>
                </div>

                <div className="rounded-lg bg-white/80 p-4 shadow-sm">
                  <h3 className="text-lg font-medium text-primary">Eco-Friendly Packaging</h3>
                  <p className="text-muted-foreground font-light">
                    Our packaging is made from recycled and biodegradable materials, minimizing waste while still
                    providing a premium unboxing experience.
                  </p>
                </div>
              </div>
            </div>

            <div className="order-1 md:order-2">
              <div className="relative mx-auto max-w-md">
                <div className="polaroid rotate-[-2deg]">
                  <Image
                    src="/placeholder.svg?height=400&width=300"
                    alt="Sustainable Materials"
                    width={300}
                    height={400}
                    className="h-auto w-full object-cover"
                  />
                  <p className="polaroid-caption">Our recycled silver workshop</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Process */}
      <section className="py-16 paper-texture">
        <div className="container">
          <h2 className="mb-12 text-center text-3xl font-light tracking-wide soft-heading">Our Sustainable Process</h2>

          <div className="grid gap-8 md:grid-cols-3">
            <div className="rounded-lg border bg-white p-6 shadow-sm">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <span className="text-xl font-bold text-primary">1</span>
              </div>
              <h3 className="mb-2 text-xl font-light text-primary">Thoughtful Design</h3>
              <p className="text-muted-foreground font-light">
                Our design process focuses on creating timeless pieces that won't go out of style, reducing the
                environmental impact of fast-fashion jewelry trends.
              </p>
            </div>

            <div className="rounded-lg border bg-white p-6 shadow-sm">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <span className="text-xl font-bold text-primary">2</span>
              </div>
              <h3 className="mb-2 text-xl font-light text-primary">Responsible Production</h3>
              <p className="text-muted-foreground font-light">
                We use energy-efficient equipment and processes, minimizing waste and reducing our carbon footprint
                during manufacturing.
              </p>
            </div>

            <div className="rounded-lg border bg-white p-6 shadow-sm">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <span className="text-xl font-bold text-primary">3</span>
              </div>
              <h3 className="mb-2 text-xl font-light text-primary">Circular Economy</h3>
              <p className="text-muted-foreground font-light">
                We offer repair services and accept old jewelry for recycling, extending the lifecycle of our products
                and reducing waste.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="bg-accent brown-paper py-16 torn-paper-top torn-paper-bottom">
        <div className="container">
          <h2 className="mb-12 text-center text-3xl font-light tracking-wide soft-heading">Our Commitments</h2>

          <div className="grid gap-8 md:grid-cols-2">
            <div className="rounded-lg bg-white/90 p-6 shadow-sm">
              <h3 className="mb-4 text-xl font-light text-primary">Environmental Stewardship</h3>
              <p className="mb-4 text-muted-foreground font-light">
                We're committed to reducing our environmental footprint through:
              </p>
              <ul className="ml-6 list-disc space-y-2 text-muted-foreground font-light">
                <li>Minimizing waste in our production process</li>
                <li>Using renewable energy sources where possible</li>
                <li>Offsetting our carbon emissions</li>
                <li>Continuously improving our sustainability practices</li>
              </ul>
            </div>

            <div className="rounded-lg bg-white/90 p-6 shadow-sm">
              <h3 className="mb-4 text-xl font-light text-primary">Social Responsibility</h3>
              <p className="mb-4 text-muted-foreground font-light">
                Our commitment to people is as strong as our commitment to the planet:
              </p>
              <ul className="ml-6 list-disc space-y-2 text-muted-foreground font-light">
                <li>Supporting fair labor practices throughout our supply chain</li>
                <li>Donating a portion of profits to healthcare initiatives</li>
                <li>Partnering with organizations that share our values</li>
                <li>Creating a positive impact in the communities we touch</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 paper-texture">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-light tracking-wide soft-heading">Join Our Sustainable Journey</h2>
            <p className="mt-6 text-lg text-muted-foreground font-light">
              By choosing ABC Jewelers, you're not just purchasing beautiful jewelry—you're supporting a more
              sustainable and ethical jewelry industry. Explore our collections and be part of the change.
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Button size="lg" asChild className="font-light">
                <Link href="/shop">Shop Sustainable Jewelry</Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="font-light">
                <Link href="/impact">Learn About Our Impact</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
