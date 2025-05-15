import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function AboutPage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="bg-accent brown-paper py-16 md:py-24 torn-paper-bottom">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-light tracking-wide md:text-5xl">About ABC Jewelers</h1>
            <p className="mt-6 text-lg text-muted-foreground font-light">
              Handcrafted jewelry with a mission to make a difference in healthcare accessibility
            </p>
          </div>
        </div>
      </section>

      {/* Founder Story */}
      <section className="py-16 paper-texture">
        <div className="container">
          <div className="grid gap-8 md:grid-cols-2 md:items-center">
            <div className="relative mx-auto max-w-md">
              <div className="polaroid rotate-[-2deg]">
                <Image
                  src="/placeholder.svg?height=500&width=400"
                  alt="Aarushi Lakhi"
                  width={400}
                  height={500}
                  className="h-auto w-full object-cover"
                />
                <p className="polaroid-caption">Aarushi Lakhi, Founder</p>
              </div>
            </div>
            <div className="flex flex-col gap-6">
              <h2 className="text-3xl font-bold text-primary">Our Story</h2>
              <p className="text-muted-foreground">
                I established ABC Jewelers with a heartfelt mission in mind: to harness my passion for crafting handmade
                jewelry to make a tangible difference in the lives of those in need. Inspired by my encounters with
                non-profit medical clinics and my personal experiences witnessing the struggles of low-income patients,
                I founded ABC Jewelers as a platform to raise funds for essential medical care.
              </p>
              <p className="text-muted-foreground">
                Every piece of jewelry sold is not just an accessory, but a beacon of hope for individuals facing health
                disparities. My journey with ABC Jewelers is driven by a simple yet powerful belief: that through
                creativity and compassion, we can transform lives and build a brighter future for all.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Mission */}
      <section className="bg-primary/10 paper-texture py-16 torn-paper-top torn-paper-bottom">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold">Our Mission</h2>
            <p className="mt-6 text-lg text-muted-foreground">
              At ABC Jewelers, we believe that beautiful jewelry can do more than adorn—it can transform lives. Our
              mission is to create sustainable, handcrafted jewelry that not only celebrates individual style but also
              funds essential medical care for those who need it most.
            </p>
            <p className="mt-4 text-lg text-muted-foreground">
              We're committed to ethical sourcing, sustainable practices, and creating a direct impact on healthcare
              accessibility through our business model.
            </p>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-16 paper-texture">
        <div className="container">
          <h2 className="mb-10 text-center text-3xl font-bold">Our Values</h2>
          <div className="grid gap-6 md:grid-cols-3">
            <div className="impact-card">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/20">
                <svg className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
                  />
                </svg>
              </div>
              <h3 className="mb-2 text-xl font-bold text-primary">Sustainability</h3>
              <p className="text-muted-foreground">
                We're committed to using sustainable materials and ethical sourcing practices in all our jewelry
                creations.
              </p>
            </div>
            <div className="impact-card">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/20">
                <svg className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7"
                  />
                </svg>
              </div>
              <h3 className="mb-2 text-xl font-bold text-primary">Giving Back</h3>
              <p className="text-muted-foreground">
                Every purchase directly contributes to funding medical care for low-income patients around the world.
              </p>
            </div>
            <div className="impact-card">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/20">
                <svg className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
                  />
                </svg>
              </div>
              <h3 className="mb-2 text-xl font-bold text-primary">Transparency</h3>
              <p className="text-muted-foreground">
                We believe in complete transparency about our impact, materials, and how your purchases make a
                difference.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="bg-accent paper-texture py-16 torn-paper-top torn-paper-bottom">
        <div className="container">
          <h2 className="mb-10 text-center text-3xl font-bold">Our Team</h2>
          <div className="grid gap-6 md:grid-cols-3">
            <div className="text-center">
              <div className="polaroid mx-auto rotate-[-1deg]">
                <div className="h-40 w-40 overflow-hidden rounded-full mx-auto">
                  <Image
                    src="/placeholder.svg?height=160&width=160"
                    alt="Team Member"
                    width={160}
                    height={160}
                    className="h-full w-full object-cover"
                  />
                </div>
                <h3 className="mt-4 text-xl font-bold text-primary">Aarushi Lakhi</h3>
                <p className="text-muted-foreground">Founder & CEO</p>
              </div>
            </div>
            <div className="text-center">
              <div className="polaroid mx-auto rotate-[1deg]">
                <div className="h-40 w-40 overflow-hidden rounded-full mx-auto">
                  <Image
                    src="/placeholder.svg?height=160&width=160"
                    alt="Team Member"
                    width={160}
                    height={160}
                    className="h-full w-full object-cover"
                  />
                </div>
                <h3 className="mt-4 text-xl font-bold text-primary">Binila Muthulaly</h3>
                <p className="text-muted-foreground">Key Advisor</p>
              </div>
            </div>
            <div className="text-center">
              <div className="polaroid mx-auto rotate-[-1deg]">
                <div className="h-40 w-40 overflow-hidden rounded-full mx-auto">
                  <Image
                    src="/placeholder.svg?height=160&width=160"
                    alt="Team Member"
                    width={160}
                    height={160}
                    className="h-full w-full object-cover"
                  />
                </div>
                <h3 className="mt-4 text-xl font-bold text-primary">Student Volunteers</h3>
                <p className="text-muted-foreground">Models & Contributors</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 paper-texture">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold text-primary">Join Our Mission</h2>
            <p className="mt-6 text-lg text-muted-foreground">
              Help us continue making a difference in healthcare accessibility by shopping our collections or partnering
              with us.
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Button size="lg" asChild>
                <Link href="/shop">Shop Our Collections</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/contact">Contact Us</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
