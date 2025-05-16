import Link from "next/link"
import { ChevronLeft } from "lucide-react"

export default function CharmsChainsFAQPage() {
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
            <h1 className="text-3xl font-light tracking-wide md:text-4xl">Charms & Chains</h1>
            <p className="mt-4 text-lg text-muted-foreground font-light">Adding and customizing charms and chains</p>
          </div>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="py-12 paper-texture">
        <div className="container">
          <div className="mx-auto max-w-3xl">
            <div className="space-y-4">
              <div className="rounded-lg bg-white p-6 shadow-sm">
                <h3 className="text-lg font-medium">How do I know what charms work for what chain?</h3>
                <div className="mt-2 space-y-4 text-muted-foreground font-light">
                  <p>To ensure compatibility:</p>
                  <ul className="ml-6 list-disc space-y-2">
                    <li>
                      Check the Bail: The bail is the loop on the charm through which the chain passes. Product
                      descriptions may provide information on bail size or suggest compatible chain types.
                    </li>
                    <li>
                      Consider Chain Thickness: Generally, delicate charms pair best with finer chains, while larger
                      charms can be supported by sturdier chains.
                    </li>
                    <li>
                      Ask Us: If you're uncertain, please{" "}
                      <Link href="/contact" className="text-primary hover:underline">
                        contact us
                      </Link>
                      . We're happy to help you find a suitable match.
                    </li>
                  </ul>
                </div>
              </div>

              <div className="rounded-lg bg-white p-6 shadow-sm">
                <h3 className="text-lg font-medium">
                  How do I add charms to a bracelet/necklace I have already customized from ABC Jewelers?
                </h3>
                <div className="mt-2 space-y-4 text-muted-foreground font-light">
                  <p>
                    For a New Customized Piece: When adding to cart, purchase each charm and chain separately. In the
                    description, specify your desired chain length, the order and placement of the charms, and any other
                    relevant details for your order.
                  </p>
                  <p>
                    Adding to an Existing ABC Piece: If you already purchased a bracelet/necklace from ABC Jewelers and
                    wish to add more charms, place a new order for the charms. In the description, detail where you
                    would like the new charms placed on your existing piece. If you are in the area, ABC Jewelers will
                    schedule a pickup within 1-7 business days. If you are not local, you will need to cover shipping
                    costs to and from ABC Jewelers' location (please refer to the Shipping section). The delivery date
                    will depend on the arrival and necessary modification of your current ABC Jewelers piece.
                  </p>
                </div>
              </div>

              <div className="rounded-lg bg-white p-6 shadow-sm">
                <h3 className="text-lg font-medium">Can ABC Jewelers add charms to other bracelets/necklaces I own?</h3>
                <div className="mt-2 space-y-4 text-muted-foreground font-light">
                  <p>
                    Yes, we can often add our current or custom-made charms to a bracelet/necklace you already own.
                    However, please note ABC Jewelers is not liable for any of the following:
                  </p>
                  <ul className="ml-6 list-disc space-y-2">
                    <li>
                      Any pre-existing damage to your bracelet/necklace from neglect, abuse, or natural wear and tear.
                    </li>
                    <li>
                      Issues related to the original craftsmanship of bracelets/necklaces made by another jeweler.
                    </li>
                    <li>
                      The structural integrity of your existing piece if it appeared fragile or has weak points prior to
                      our work. We will inspect the item upon receipt and advise you of any potential concerns before
                      proceeding.
                    </li>
                  </ul>
                </div>
              </div>

              <div className="rounded-lg bg-white p-6 shadow-sm">
                <h3 className="text-lg font-medium">
                  How much does it cost to add a charm to a current bracelet/necklace I own?
                </h3>
                <div className="mt-2 text-muted-foreground font-light">
                  <p>
                    Apart from the cost for each individual charm, there is a labor fee for attaching charms to an
                    existing piece. This will depend on the complexity of the attachment. We will provide a quote before
                    beginning any work.
                  </p>
                </div>
              </div>

              <div className="rounded-lg bg-white p-6 shadow-sm">
                <h3 className="text-lg font-medium">
                  How long does it take to add a charm to a current bracelet/necklace I own?
                </h3>
                <div className="mt-2 text-muted-foreground font-light">
                  <p>
                    If you bring the item in person and the addition is straightforward, it might be possible to do it
                    while you wait. For more complex additions or if the item is shipped to us, it usually takes 1-3
                    business days after we receive your piece, plus any applicable shipping time. We will provide a time
                    estimate with your order.
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
