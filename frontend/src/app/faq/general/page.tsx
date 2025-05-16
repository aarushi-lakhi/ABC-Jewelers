import Link from "next/link"
import { ChevronLeft } from "lucide-react"

export default function GeneralFAQPage() {
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
            <h1 className="text-3xl font-light tracking-wide md:text-4xl">General Information</h1>
            <p className="mt-4 text-lg text-muted-foreground font-light">Warranty information and return policies</p>
          </div>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="py-12 paper-texture">
        <div className="container">
          <div className="mx-auto max-w-3xl">
            <div className="space-y-4">
              <div className="rounded-lg bg-white p-6 shadow-sm">
                <h3 className="text-lg font-medium">What warranties do you offer?</h3>
                <div className="mt-2 space-y-4 text-muted-foreground font-light">
                  <p>
                    Our warranty policy covers all jewelry purchased from ABC Jewelers. This warranty protects against
                    manufacturer defects in material or workmanship. It does not cover neglect, abuse, natural wear and
                    tear, or the loss of jewelry findings or other components.
                  </p>
                  <p>Warranty exceptions and exclusions:</p>
                  <ul className="ml-6 list-disc space-y-2">
                    <li>
                      Damage to jewelry resulting from neglect, abuse, or natural wear and tear. Significant impacts or
                      damage are typically detectable under magnification. For instance, if jewelry wears thin or prongs
                      become worn due to neglect or natural wear, the warranty is void. Similarly, if jewelry becomes
                      misshapen, potentially causing components to fall out, this may be due to damage incurred while
                      wearing.
                    </li>
                    <li>
                      Any jewelry that has been repaired or altered by another jeweler. We cannot be responsible for
                      merchandise that has been worked on elsewhere.
                    </li>
                    <li>
                      Damage to your center stone. Softer stones are more susceptible to damage from regular wear.
                      Please consider this when selecting your center stone.
                    </li>
                  </ul>
                  <p>
                    If you believe your merchandise has a defect, please{" "}
                    <Link href="/contact" className="text-primary hover:underline">
                      contact us
                    </Link>
                    . Upon receipt, we will carefully examine the merchandise. If a defect in manufacturing is
                    confirmed, we will ship your replacement item at no additional charge within 30 business days.
                  </p>
                  <p>
                    ABC Jewelers reserves the right to reject any returns that do not comply with the conditions stated
                    above.
                  </p>
                </div>
              </div>

              <div className="rounded-lg bg-white p-6 shadow-sm">
                <h3 className="text-lg font-medium">What is your return/exchange policy?</h3>
                <div className="mt-2 space-y-4 text-muted-foreground font-light">
                  <p>
                    ABC Jewelers wants you to love your new purchase. If, however, you need to return an item, we are
                    here to help.
                  </p>
                  <p>
                    For returns, please contact us within 30 days of receiving your order. We accept returns and will
                    offer a refund on in-stock items only (this does not include made-to-order or custom items). Items
                    returned after 30 days may be eligible for online and store credit only. For shipped purchases over
                    $20, refunds are subject to owner discretion and may be subject to a 35% restocking fee.
                  </p>
                  <p>
                    Returned items must be in original condition and not show any signs of wear or use. To request a
                    refund or exchange, please{" "}
                    <Link href="/contact" className="text-primary hover:underline">
                      contact us
                    </Link>
                    . Include your first and last name, customer number, purchase order form number, item name, and
                    reason for return. Once return is received, all items will be carefully examined, and a full refund
                    or store credit will be issued within 15 days. Please note that a refund/store credit will be issued
                    for the value of the merchandise returned only (shipping fees will not be credited). Store credit is
                    valid for 3 years once issued.
                  </p>
                  <p>
                    All custom and made-to-order purchases are nonrefundable. ABC Jewelers reserves the right to reject
                    any returns that do not comply with the conditions stated above. If you have any questions about
                    returns, please{" "}
                    <Link href="/contact" className="text-primary hover:underline">
                      contact us
                    </Link>
                    .
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
