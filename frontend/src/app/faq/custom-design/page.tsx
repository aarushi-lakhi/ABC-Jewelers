import Link from "next/link"
import { ChevronLeft } from "lucide-react"

export default function CustomDesignFAQPage() {
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
            <h1 className="text-3xl font-light tracking-wide md:text-4xl">Custom Design</h1>
            <p className="mt-4 text-lg text-muted-foreground font-light">Creating your unique, personalized jewelry</p>
          </div>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="py-12 paper-texture">
        <div className="container">
          <div className="mx-auto max-w-3xl">
            <div className="space-y-4">
              <div className="rounded-lg bg-white p-6 shadow-sm">
                <h3 className="text-lg font-medium">Do you do custom work?</h3>
                <div className="mt-2 text-muted-foreground font-light">
                  <p>
                    Yes, we specialize in custom jewelry design. We enjoy collaborating with clients to create unique
                    pieces. If you would like us create a custom design for you, please{" "}
                    <Link href="/contact" className="text-primary hover:underline">
                      contact us
                    </Link>{" "}
                    with photo attachments and/or detailed descriptions of your vision. We will respond within 1-5
                    business days with a design sketch, estimated cost, and expected timeline of completion.
                  </p>
                </div>
              </div>

              <div className="rounded-lg bg-white p-6 shadow-sm">
                <h3 className="text-lg font-medium">How much does it cost to do a custom design?</h3>
                <div className="mt-2 space-y-4 text-muted-foreground font-light">
                  <p>
                    Semi-Custom (Modifications to our design): For slight altercations to our existing designs, the
                    price may not vary significantly from the original.
                  </p>
                  <p>
                    Fully Custom Designs: For entirely original or ornate pieces, the starting price for design and
                    labor is typically $20+, plus the cost of materials. The final cost depends on the design
                    complexity, materials chosen, and the time required. A detailed quote will always be provided
                    upfront.
                  </p>
                </div>
              </div>

              <div className="rounded-lg bg-white p-6 shadow-sm">
                <h3 className="text-lg font-medium">How long does it take to make a custom design?</h3>
                <div className="mt-2 space-y-4 text-muted-foreground font-light">
                  <p>The timeline can vary depending on material availability and design intricacy:</p>
                  <ul className="ml-6 list-disc space-y-2">
                    <li>On average, custom designs typically take 3-8 weeks from design approval to completion.</li>
                    <li>If we are sourcing specific materials, it may take up to 8-12 weeks.</li>
                    <li>
                      If we are only making minor modifications to existing designs, these can often be completed in 1-2
                      weeks. A more specific timeline will be provided with your quote.
                    </li>
                  </ul>
                </div>
              </div>

              <div className="rounded-lg bg-white p-6 shadow-sm">
                <h3 className="text-lg font-medium">Can I provide my own jewelry components for the custom design?</h3>
                <div className="mt-2 space-y-4 text-muted-foreground font-light">
                  <p>
                    We are often able to incorporate stones or other components from your existing jewelry into a new
                    piece. We will conduct a detailed inspection of your components to ensure they can withstand the
                    rework process without chipping or breaking.
                  </p>
                  <p>Please note:</p>
                  <ul className="ml-6 list-disc space-y-2">
                    <li>
                      We do NOT work with diamonds or colored stones that you have purchased loose from others sources
                      (e.g., online vendors).
                    </li>
                    <li>
                      Similarly, we do NOT work with other jewelry components purchased elsewhere. This policy is in
                      place because we are committed to responsible and ethical sourcing and maintain strict
                      relationships with our trusted suppliers to ensure quality and integrity.
                    </li>
                  </ul>
                </div>
              </div>

              <div className="rounded-lg bg-white p-6 shadow-sm">
                <h3 className="text-lg font-medium">Is my custom design truly one of a kind?</h3>
                <div className="mt-2 text-muted-foreground font-light">
                  <p>
                    ABC Jewelers will not duplicate a custom design made uniquely for you. However, for very common or
                    simplified settings and motifs, we cannot guarantee that a similar aesthetic will not be
                    independently created elsewhere. As a courtesy, if a request for a similar design arises, we will
                    always aim to alter it to maintain the distinctiveness of your piece.
                  </p>
                </div>
              </div>

              <div className="rounded-lg bg-white p-6 shadow-sm">
                <h3 className="text-lg font-medium">Can I make revisions to my custom design?</h3>
                <div className="mt-2 space-y-4 text-muted-foreground font-light">
                  <p>
                    Yes. After the initial design discussion, we will provide a sketch of your piece. This includes up
                    to 2 free revisions. Additional design time beyond this is subject to an hourly fee.
                  </p>
                  <p>
                    If the design is changed completely after the initial concept and two revisions, a new design
                    consultation fee may apply, plus any fees for additional design time.
                  </p>
                </div>
              </div>

              <div className="rounded-lg bg-white p-6 shadow-sm">
                <h3 className="text-lg font-medium">What are the custom design terms?</h3>
                <div className="mt-2 space-y-4 text-muted-foreground font-light">
                  <p>
                    Warranty: All custom jewelry is covered under our warranty against manufacturer defects. Normal wear
                    and tear, abuse, or accidental damage are not covered.
                  </p>
                  <p>Refunds: All custom orders are nonrefundable.</p>
                  <p>
                    Payment: Once the custom jewelry is complete, the remaining balance is required upon completion.
                    Late payments will accrue additional charges (5% of the balance per 2 weeks) for every 2 weeks past
                    the completion date.
                  </p>
                </div>
              </div>

              <div className="rounded-lg bg-white p-6 shadow-sm">
                <h3 className="text-lg font-medium">
                  Can I customize a piece I found on your website? What about a ring I found elsewhere?
                </h3>
                <div className="mt-2 space-y-4 text-muted-foreground font-light">
                  <p>Our Pieces: We are happy to customize our existing pieces to suit your preference.</p>
                  <p>
                    Pieces from Elsewhere: We do not directly copy designs from other stores or artists, as this is
                    unethical and may infringe on copyright. However, if you admire certain styles, patterns, or motifs,
                    we can use those as inspiration to design a new original piece that captures the essence you are
                    looking for.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
