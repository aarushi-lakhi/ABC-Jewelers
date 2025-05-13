import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function ImpactSection() {
  return (
    <section className="bg-primary/10 brown-paper py-16 md:py-24 torn-paper-top torn-paper-bottom">
      <div className="container">
        <div className="grid gap-8 md:grid-cols-2 md:items-center">
          <div className="order-2 md:order-1">
            <div className="relative mx-auto grid max-w-[500px] grid-cols-2 gap-4">
              <div className="polaroid rotate-[-2deg]">
                <Image
                  src="/placeholder.svg?height=400&width=300"
                  alt="Impact Projects"
                  width={300}
                  height={400}
                  className="h-auto w-full object-cover"
                />
                <p className="polaroid-caption">Our Impact Projects</p>
              </div>
              <div className="polaroid mt-8 rotate-[3deg]">
                <Image
                  src="/placeholder.svg?height=400&width=300"
                  alt="Medical Care Initiative"
                  width={300}
                  height={400}
                  className="h-auto w-full object-cover"
                />
                <p className="polaroid-caption">Medical Care Initiative</p>
              </div>
            </div>
          </div>
          <div className="order-1 flex flex-col gap-6 md:order-2">
            <h2 className="text-3xl font-light tracking-wide md:text-4xl soft-heading">Our Impact</h2>
            <p className="font-light text-gray-600">
              ABC Jewelers is proud to have made a tangible impact on the lives of those in need. From sponsoring
              surgeries to supporting pediatric centers and donating to medical research, our initiatives have touched
              countless lives and brought hope to communities around the world.
            </p>
            <ul className="grid gap-3">
              <li className="flex items-start gap-2">
                <svg
                  className="mt-1 h-5 w-5 flex-shrink-0 text-primary"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="font-light">
                  <strong className="font-medium">Sponsored Surgeries:</strong> Funded over 60 surgeries for low-income patients internationally
                </span>
              </li>
              <li className="flex items-start gap-2">
                <svg
                  className="mt-1 h-5 w-5 flex-shrink-0 text-primary"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="font-light">
                  <strong className="font-medium">Pediatric Centers:</strong> Donated therapeutic activity kits to children with blood disorders and cancer
                </span>
              </li>
              <li className="flex items-start gap-2">
                <svg
                  className="mt-1 h-5 w-5 flex-shrink-0 text-primary"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="font-light">
                  <strong className="font-medium">Crisis Response:</strong> Provided oxygen concentrators to hospitals via SEWA International during COVID-19
                </span>
              </li>
              <li className="flex items-start gap-2">
                <svg
                  className="mt-1 h-5 w-5 flex-shrink-0 text-primary"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="font-light">
                  <strong className="font-medium">Medical Research:</strong> Contributed to research initiatives dedicated to progressing cancer research
                </span>
              </li>
            </ul>
            <div className="flex flex-col gap-4 sm:flex-row">
              <Button size="lg" asChild className="font-light">
                <Link href="/impact">Learn More</Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="font-light">
                <Link href="/shop">Shop to Support</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
