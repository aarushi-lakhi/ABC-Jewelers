import Link from "next/link"
import { ChevronLeft } from "lucide-react"

export default function EthicalSourcingFAQPage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="bg-accent brown-paper py-12 md:py-16 torn-paper-bottom">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <Link href="/faq" className="inline-flex items-center text-primary hover:underline mb-4">
              <ChevronLeft className="h-4 w-4 mr-1" />
              Back to FAQ Categories
            </Link>
            <h1 className="text-3xl font-light tracking-wide md:text-4xl">Ethical Sourcing</h1>
            <p className="mt-4 text-lg text-muted-foreground font-light">Our commitment to sustainability</p>
          </div>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="py-12 paper-texture">
        <div className="container">
          <div className="mx-auto max-w-3xl">
            <div className="space-y-4">
              <div className="rounded-lg bg-white p-6 shadow-sm">
                <h3 className="text-lg font-medium">
                  You mentioned "a responsible and ethical jewelry industry." Can you elaborate?
                </h3>
                <div className="mt-2 space-y-4 text-muted-foreground font-light">
                  <p>We are committed to ethical practices in our sourcing and creation processes. This includes:</p>
                  <ul className="ml-6 list-disc space-y-2">
                    <li>
                      Recycled Metals: We prioritize the use of recycled precious metals to reduce the environmental
                      impact associated with mining new materials.
                    </li>
                    <li>
                      Ethically Sourced Gemstones: We strive to work with trusted suppliers who are committed to
                      conflict-free gemstones and adhere to responsible mining practices. This includes adherence to the
                      Kimberley Process for diamonds and seeking transparency in the supply chain for colored stones.
                    </li>
                    <li>
                      Supporting Artisans: Where applicable, we may partner with small-scale artisans, valuing fair
                      labor practices.
                    </li>
                    <li>
                      Transparency: We are open to discussing the sourcing of our materials. If you have questions about
                      a specific piece, please ask. Our commitment to ethical and sustainable practices is an ongoing
                      effort.
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
