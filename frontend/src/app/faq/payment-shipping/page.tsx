import Link from "next/link"
import { ChevronLeft } from "lucide-react"

export default function PaymentShippingFAQPage() {
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
            <h1 className="text-3xl font-light tracking-wide md:text-4xl">Payment & Shipping</h1>
            <p className="mt-4 text-lg text-muted-foreground font-light">Orders, payments, shipping, and donations</p>
          </div>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="py-12 paper-texture">
        <div className="container">
          <div className="mx-auto max-w-3xl">
            <div className="space-y-4">
              <div className="rounded-lg bg-white p-6 shadow-sm">
                <h3 className="text-lg font-medium">How much does shipping cost?</h3>
                <div className="mt-2 space-y-4 text-muted-foreground font-light">
                  <p>Orders under $49.99: A flat shipping fee applies for standard domestic shipping</p>
                  <p>Orders $49.99 and over: Standard domestic shipping is complimentary.</p>
                  <p>
                    International Shipping: We ship internationally. Rates vary by destination and are calculated at
                    checkout. International orders may be subject to customs duties and taxes, which are the buyer's
                    responsibility.
                  </p>
                </div>
              </div>

              <div className="rounded-lg bg-white p-6 shadow-sm">
                <h3 className="text-lg font-medium">How long will it take for my order to arrive?</h3>
                <div className="mt-2 space-y-4 text-muted-foreground font-light">
                  <p>
                    In-Stock Items: Typically ship within 1-3 business days. Standard domestic shipping usually takes
                    3-7 business days thereafter. International shipping can take 2-4 weeks or longer, depending on
                    customs.
                  </p>
                  <p>
                    Made-to-Order & Custom Items: Please refer to the specific product description or your custom order
                    agreement for creation timelines. Once shipped, the standard transit times apply.
                  </p>
                  <p>You will receive a shipping confirmation with a tracking number when your order ships.</p>
                </div>
              </div>

              <div className="rounded-lg bg-white p-6 shadow-sm">
                <h3 className="text-lg font-medium">Can I track my order?</h3>
                <div className="mt-2 text-muted-foreground font-light">
                  <p>
                    Yes, once your order ships, we will email you a tracking number so you can monitor its progress.
                  </p>
                </div>
              </div>

              <div className="rounded-lg bg-white p-6 shadow-sm">
                <h3 className="text-lg font-medium">What if my package is lost or damaged during shipping?</h3>
                <div className="mt-2 space-y-4 text-muted-foreground font-light">
                  <p>
                    Damaged: If your order arrives damaged, please{" "}
                    <Link href="/contact" className="text-primary hover:underline">
                      contact us
                    </Link>{" "}
                    immediately (within 48 hours of receipt) with photographs of the damaged item and packaging.
                  </p>
                  <p>
                    Lost: If your tracking information hasn't updated for an extended period or indicates delivery but
                    you haven't received it, please{" "}
                    <Link href="/contact" className="text-primary hover:underline">
                      contact us
                    </Link>
                    . We will work with the carrier to investigate.
                  </p>
                </div>
              </div>

              <div className="rounded-lg bg-white p-6 shadow-sm">
                <h3 className="text-lg font-medium">What is the preferred payment method?</h3>
                <div className="mt-2 space-y-4 text-muted-foreground font-light">
                  <p>
                    Local In-Person Deliveries (if pre-arranged): Cash on delivery, Venmo, or Apple Pay can be accepted.
                  </p>
                  <p>
                    Website/Shipped Orders: We accept all major credit cards through our secure online checkout. For
                    other arrangements (e.g., specific custom order invoicing), Venmo or Apple Pay may be used. Shipping
                    fees apply for orders under $49.99 unless otherwise specified.
                  </p>
                </div>
              </div>

              <div className="rounded-lg bg-white p-6 shadow-sm">
                <h3 className="text-lg font-medium">Can I donate to ABC Jewelers?</h3>
                <div className="mt-2 text-muted-foreground font-light">
                  <p>
                    Yes, we gratefully accept donations. ABC Jewelers donates 100% of our profits to non-profit
                    organizations. Your contribution directly supports these efforts. We accept donations via cash,
                    Venmo, and Apple Pay. The entirety of your donation will go towards our designated charitable
                    causes, such as providing medical treatment to low-income patients abroad. As a token of our
                    appreciation, we may acknowledge donors on our website (with permission) or include a small
                    thank-you gesture in future interactions where appropriate.
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
