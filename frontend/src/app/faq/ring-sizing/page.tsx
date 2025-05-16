import Link from "next/link"
import { ChevronLeft } from "lucide-react"

export default function RingSizingFAQPage() {
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
            <h1 className="text-3xl font-light tracking-wide md:text-4xl">Ring Sizing & Fitting</h1>
            <p className="mt-4 text-lg text-muted-foreground font-light">Finding the perfect fit for your rings</p>
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
                  How do I get my friend/partner's ring size without them knowing?
                </h3>
                <div className="mt-2 space-y-4 text-muted-foreground font-light">
                  <p>Finding someone's ring size discreetly can be tricky, but here are a few suggestions:</p>
                  <ul className="ml-6 list-disc space-y-2">
                    <li>Ask their friends or family if they might know the size.</li>
                    <li>
                      If they wear rings frequently, try to borrow one they wear on the correct finger and hand. You can
                      then take it to to a local jeweler to have it size.
                    </li>
                    <li>
                      Alternatively, carefully measure the inside diameter of the ring and refer to the sizing
                      information in our product details. Be sure to note which finger and hand they wear it on since
                      finger sizes can vary between hands and different fingers.
                    </li>
                    <li>
                      As a last resort, providing their height and general clothing size(S, M, L) can sometimes help us
                      make an educated guess, though this is less precise.
                    </li>
                  </ul>
                </div>
              </div>

              <div className="rounded-lg bg-white p-6 shadow-sm">
                <h3 className="text-lg font-medium">How should I get my finger sized?</h3>
                <div className="mt-2 text-muted-foreground font-light">
                  <p>
                    If you are local and know me personally, you are welcome to come by for sizing. Otherwise, any local
                    jewelry store should offer complimentary ring sizing. When you get sized, take note of which type of
                    sizers they used - thin, wide, or comfort fit (rounded on the inside) since they can affect the fit.
                    Jewelers can typically determine if you need a quarter size, even if that don't have specific
                    quarter-size sizers.
                  </p>
                </div>
              </div>

              <div className="rounded-lg bg-white p-6 shadow-sm">
                <h3 className="text-lg font-medium">What is the difference between comfort fit and regular fit?</h3>
                <div className="mt-2 text-muted-foreground font-light">
                  <p>
                    Comfort fit rings are rounded on the inside, which many find makes them easier to slide on and off
                    and more comfortable for daily wear. All of our rings are made with comfort fit unless specifically
                    request otherwise. Comfort fit rings may feel slightly snugger than a regular fit; for instance, if
                    you are an 8 in a regular fit, you may be closer to a 7.5 or 7.75 in comfort fit.
                  </p>
                </div>
              </div>

              <div className="rounded-lg bg-white p-6 shadow-sm">
                <h3 className="text-lg font-medium">I just got my ring but it doesn't fit! What should I do?</h3>
                <div className="mt-2 space-y-4 text-muted-foreground font-light">
                  <p>
                    If your ring does not fit correctly, please{" "}
                    <Link href="/contact" className="text-primary hover:underline">
                      contact us
                    </Link>
                    . Resizing typically takes approximately two weeks to complete.
                  </p>
                  <p>Please note: Most ring sizings are subject to an additional labor fee.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
