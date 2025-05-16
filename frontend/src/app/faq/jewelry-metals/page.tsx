import Link from "next/link"
import { ChevronLeft } from "lucide-react"

export default function JewelryMetalsFAQPage() {
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
            <h1 className="text-3xl font-light tracking-wide md:text-4xl">Jewelry & Metals</h1>
            <p className="mt-4 text-lg text-muted-foreground font-light">Materials, care, and maintenance</p>
          </div>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="py-12 paper-texture">
        <div className="container">
          <div className="mx-auto max-w-3xl">
            <div className="space-y-4">
              <div className="rounded-lg bg-white p-6 shadow-sm">
                <h3 className="text-lg font-medium">What's the difference between metals?</h3>
                <div className="mt-2 space-y-4 text-muted-foreground font-light">
                  <p>
                    There are many metals we use to bring our designs to life! We specialize in materials that are both
                    beautiful and accessible.
                  </p>
                  <p className="font-medium">Sterling Silver:</p>
                  <ul className="ml-6 list-disc space-y-2">
                    <li>
                      The Look & Feel: A classic and popular precious metal, known for its bright, lustrous white shine.
                      It's very affordable for a precious metal.
                    </li>
                    <li>
                      The Quirks: Sterling silver naturally tarnishes over time when exposed to air and moisture, and
                      can react to chemicals (like those in perfumes, lotions, or cleaning supplies). This means it can
                      change color, often darkening.
                    </li>
                    <li>
                      The Upside: Tarnish on sterling silver is just a surface thing! You can slow it down by keeping
                      your silver jewelry dry and away from chemicals. When it does tarnish, it can be polished back to
                      its original brilliance.
                    </li>
                    <li>
                      Our Use: Because silver is a softer metal, we generally don't use it for settings that need to
                      hold stones with high tension or for very delicate, thin bands that might bend easily. It's
                      fantastic for wider bands, statement pieces, and for those who love the look of a precious metal
                      without a hefty price tag—great if you're trying out new styles or are concerned about misplacing
                      a very expensive item.
                    </li>
                  </ul>
                  <p className="font-medium">Brass:</p>
                  <ul className="ml-6 list-disc space-y-2">
                    <li>
                      The Look & Feel: An alloy primarily of copper and zinc, brass has a lovely warm, yellowish, almost
                      golden hue. It's quite affordable and has a nice weight to it.
                    </li>
                    <li>
                      The Quirks: Brass will also tarnish and oxidize over time, developing what's called a patina. This
                      can range from a deepening of its golden color to darker spots, or sometimes a greenish tinge,
                      especially if it's in frequent contact with skin oils or moisture. Some people actually love this
                      aged, vintage look!
                    </li>
                    <li>
                      The Upside: Like silver, tarnish on brass is on the surface and can be cleaned. (As we mentioned
                      in the cleaning section, a little ketchup or salsa can work wonders, or a dedicated brass
                      cleaner!)
                    </li>
                    <li>
                      Our Use: Brass is wonderful for bold, sculptural pieces, fashion jewelry, and components where its
                      warm color can really shine. It's strong and versatile for many designs.
                    </li>
                  </ul>
                  <p className="font-medium">Copper:</p>
                  <ul className="ml-6 list-disc space-y-2">
                    <li>
                      The Look & Feel: Known for its distinct, beautiful reddish-brown color. Copper is very malleable,
                      making it a joy to work with for artisans. It's also very affordable.
                    </li>
                    <li>
                      The Quirks: Copper reacts readily with oxygen, moisture, and skin oils, meaning it tarnishes and
                      oxidizes quite quickly. This can result in a darker patina or sometimes cause a greenish
                      discoloration on the skin for some wearers (this is a harmless chemical reaction, not an allergy
                      for most).
                    </li>
                    <li>
                      The Upside: The patina that develops on copper can be quite beautiful and is often sought after
                      for its rustic or antique charm. It can also be cleaned back to its bright, rosy shine.
                    </li>
                    <li>
                      Our Use: Copper is excellent for pieces where you want that warm, earthy reddish tone. It's used
                      for accents, entire pieces, and often in mixed-metal designs.
                    </li>
                  </ul>
                </div>
              </div>

              <div className="rounded-lg bg-white p-6 shadow-sm">
                <h3 className="text-lg font-medium">Which metal is best?</h3>
                <div className="mt-2 space-y-4 text-muted-foreground font-light">
                  <p>
                    The "best" metal truly depends on your personal preferences, how you plan to wear the piece, and
                    your budget! Since we work with sterling silver, brass, and copper, here's how they generally
                    compare for common considerations:
                  </p>
                  <p>
                    Most Cost-Effective: All three metals we use – sterling silver, brass, and copper – are
                    significantly more affordable than gold or platinum. Generally, brass and copper are the most
                    budget-friendly, with sterling silver being a precious metal that's still very accessibly priced.
                  </p>
                  <p>
                    If you're ordering a band and are concerned about losing an expensive ring: Any of these metals
                    would be a great choice! Sterling silver offers the "precious metal" feel, while brass and copper
                    provide beautiful warm tones, all without the high price tag of traditional fine jewelry.
                  </p>
                  <p>
                    If you have metal allergies: This can be a bit tricky, as sensitivities vary greatly from person to
                    person.
                  </p>
                  <ul className="ml-6 list-disc space-y-2">
                    <li>
                      Copper itself can cause skin discoloration (a greenish tint) for some individuals due to a
                      chemical reaction with skin oils, which is not necessarily an allergy but can be a sensitivity.
                      Some people are also genuinely allergic to copper.
                    </li>
                    <li>
                      Brass is an alloy containing copper and zinc, so if you are sensitive to copper, you might react
                      to brass.
                    </li>
                    <li>
                      Sterling Silver is an alloy that is typically 92.5% silver and 7.5% other metals, usually copper.
                      While many people can wear sterling silver without issue, those with copper allergies might still
                      experience a reaction.
                    </li>
                  </ul>
                  <p>
                    Our Advice: If you have known, significant metal allergies, particularly to copper, you might want
                    to exercise caution. Unfortunately, none of these metals are considered truly hypoallergenic like
                    titanium or niobium (which we don't currently specialize in). Patch testing a piece on a small area
                    of skin can sometimes help determine sensitivity.
                  </p>
                </div>
              </div>

              <div className="rounded-lg bg-white p-6 shadow-sm">
                <h3 className="text-lg font-medium">What can I do with my old jewelry?</h3>
                <div className="mt-2 text-muted-foreground font-light">
                  <p>
                    We can often repurpose precious metals and gemstones from your old jewelry into a beautiful new
                    custom piece. This is a wonderful way to preserve sentimental value while creating something new. We
                    may also offer credit for your old gold, platinum, or diamonds towards a new purchase. If you wish
                    to keep certain components (like specific stones) and repurpose others, we will carefully separate
                    them.
                  </p>
                </div>
              </div>

              <div className="rounded-lg bg-white p-6 shadow-sm">
                <h3 className="text-lg font-medium">Why is my silver jewelry changing colors?</h3>
                <div className="mt-2 text-muted-foreground font-light">
                  <p>
                    This is a natural process called tarnishing (oxidation). It occurs when silver reacts with sulfur
                    compounds in the air or on the skin. Fortunately, tarnish is a surface phenomenon and can usually be
                    removed by polishing.
                  </p>
                </div>
              </div>

              <div className="rounded-lg bg-white p-6 shadow-sm">
                <h3 className="text-lg font-medium">How should I clean my jewelry?</h3>
                <div className="mt-2 space-y-4 text-muted-foreground font-light">
                  <p>
                    Silver: We offer a polishing cloth effective for remove tarnish.{" "}
                    <Link href="/contact" className="text-primary hover:underline">
                      Contact us
                    </Link>{" "}
                    to purchase one.
                  </p>
                  <p>
                    Brass and other Base Metals: A well-known home method is to use a mild acid like ketchup or tomato
                    salsa. The acidity can help lift tarnish. Mix a small amount with water, apply briefly to the
                    jewelry, then rinse thoroughly with clean water and dry completely with a soft cloth. Use with
                    cation and avoid prolonged exposure.
                  </p>
                  <p>General Care Guidelines:</p>
                  <ul className="ml-6 list-disc space-y-2">
                    <li>Put jewelry on after applying lotions, perfumes, and hairspray.</li>
                    <li>Remove jewelry before swimming, showering, exercising, or engaging in heavy manual tasks.</li>
                    <li>
                      Store pieces separately in soft pouches or a lined jewelry box to prevent scratching and tangling.
                      Anti-tarnish strips can help protect silver.
                    </li>
                    <li>
                      Periodically check that stones in settings are secure. If anything feels loose,{" "}
                      <Link href="/contact" className="text-primary hover:underline">
                        contact us
                      </Link>{" "}
                      for an inspection.
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
