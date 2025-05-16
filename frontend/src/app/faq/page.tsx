export default function FAQPage() {
    return (
      <div className="flex flex-col">
        {/* Hero Section */}
        <section className="bg-accent brown-paper py-16 md:py-24 torn-paper-bottom">
          <div className="container">
            <div className="mx-auto max-w-3xl text-center">
              <h1 className="text-4xl font-light tracking-wide md:text-5xl">Frequently Asked Questions</h1>
              <p className="mt-6 text-lg text-muted-foreground font-light">
                Find answers to common questions about our products, services, and policies.
              </p>
            </div>
          </div>
        </section>
  
        {/* FAQ Content */}
        <section className="py-16 paper-texture">
          <div className="container">
            <div className="mx-auto max-w-4xl">
              {/* General */}
              <div className="mb-12">
                <h2 className="mb-6 text-2xl font-light tracking-wide text-primary">General</h2>
                <div className="space-y-4">
                  <div className="rounded-lg bg-white p-6 shadow-sm">
                    <h3 className="text-lg font-medium">What warranties do you offer?</h3>
                    <div className="mt-2 space-y-4 text-muted-foreground font-light">
                      <p>
                        Our warranty policy covers all jewelry purchased from ABC Jewelers. This warranty protects against
                        manufacturer defects in material or workmanship. It does not cover neglect, abuse, natural wear
                        and tear, or the loss of jewelry findings or other components.
                      </p>
                      <p>Warranty exceptions and exclusions:</p>
                      <ul className="ml-6 list-disc space-y-2">
                        <li>
                          Damage to jewelry resulting from neglect, abuse, or natural wear and tear. Significant impacts
                          or damage are typically detectable under magnification. For instance, if jewelry wears thin or
                          prongs become worn due to neglect or natural wear, the warranty is void. Similarly, if jewelry
                          becomes misshapen, potentially causing components to fall out, this may be due to damage
                          incurred while wearing.
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
                        If you believe your merchandise has a defect, please contact us here. Upon receipt, we will
                        carefully examine the merchandise. If a defect in manufacturing is confirmed, we will ship your
                        replacement item at no additional charge within 30 business days.
                      </p>
                      <p>
                        ABC Jewelers reserves the right to reject any returns that do not comply with the conditions
                        stated above.
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
                        returned after 30 days may be eligible for online and store credit only. For shipped purchases
                        over $20, refunds are subject to owner discretion and may be subject to a 35% restocking fee.
                      </p>
                      <p>
                        Returned items must be in original condition and not show any signs of wear or use. To request a
                        refund or exchange, please contact us here. Include your first and last name, customer number,
                        purchase order form number, item name, and reason for return. Once return is received, all items
                        will be carefully examined, and a full refund or store credit will be issued within 15 days.
                        Please note that a refund/store credit will be issued for the value of the merchandise returned
                        only (shipping fees will not be credited). Store credit is valid for 3 years once issued.
                      </p>
                      <p>
                        All custom and made-to-order purchases are nonrefundable. ABC Jewelers reserves the right to
                        reject any returns that do not comply with the conditions stated above. If you have any questions
                        about returns, please contact us here.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
  
              {/* Ring Sizing and Fitting */}
              <div className="mb-12">
                <h2 className="mb-6 text-2xl font-light tracking-wide text-primary">Ring Sizing and Fitting</h2>
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
                          If they wear rings frequently, try to borrow one they wear on the correct finger and hand. You
                          can then take it to to a local jeweler to have it size.
                        </li>
                        <li>
                          Alternatively, carefully measure the inside diameter of the ring and refer to the sizing
                          information in our product details. Be sure to note which finger and hand they wear it on since
                          finger sizes can vary between hands and different fingers.
                        </li>
                        <li>
                          As a last resort, providing their height and general clothing size(S, M, L) can sometimes help
                          us make an educated guess, though this is less precise.
                        </li>
                      </ul>
                    </div>
                  </div>
  
                  <div className="rounded-lg bg-white p-6 shadow-sm">
                    <h3 className="text-lg font-medium">How should I get my finger sized?</h3>
                    <div className="mt-2 text-muted-foreground font-light">
                      <p>
                        If you are local and know me personally, you are welcome to come by for sizing. Otherwise, any
                        local jewelry store should offer complimentary ring sizing. When you get sized, take note of which
                        type of sizers they used - thin, wide, or comfort fit (rounded on the inside) since they can
                        affect the fit. Jewelers can typically determine if you need a quarter size, even if that don't
                        have specific quarter-size sizers.
                      </p>
                    </div>
                  </div>
  
                  <div className="rounded-lg bg-white p-6 shadow-sm">
                    <h3 className="text-lg font-medium">What is the difference between comfort fit and regular fit?</h3>
                    <div className="mt-2 text-muted-foreground font-light">
                      <p>
                        Comfort fit rings are rounded on the inside, which many find makes them easier to slide on and off
                        and more comfortable for daily wear. All of our rings are made with comfort fit unless
                        specifically request otherwise. Comfort fit rings may feel slightly snugger than a regular fit;
                        for instance, if you are an 8 in a regular fit, you may be closer to a 7.5 or 7.75 in comfort fit.
                      </p>
                    </div>
                  </div>
  
                  <div className="rounded-lg bg-white p-6 shadow-sm">
                    <h3 className="text-lg font-medium">I just got my ring but it doesn't fit! What should I do?</h3>
                    <div className="mt-2 space-y-4 text-muted-foreground font-light">
                      <p>
                        If your ring does not fit correctly, please contact us here. Resizing typically takes
                        approximately two weeks to complete.
                      </p>
                      <p>Please note: Most ring sizings are subject to an additional labor fee.</p>
                    </div>
                  </div>
                </div>
              </div>
  
              {/* Charms/Chain Procedure */}
              <div className="mb-12">
                <h2 className="mb-6 text-2xl font-light tracking-wide text-primary">Charms/Chain Procedure</h2>
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
                          Ask Us: If you're uncertain, please contact us here. We're happy to help you find a suitable
                          match.
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
                        description, specify your desired chain length, the order and placement of the charms, and any
                        other relevant details for your order.
                      </p>
                      <p>
                        Adding to an Existing ABC Piece: If you already purchased a bracelet/necklace from ABC Jewelers
                        and wish to add more charms, place a new order for the charms. In the description, detail where
                        you would like the new charms placed on your existing piece. If you are in the area, ABC Jewelers
                        will schedule a pickup within 1-7 business days. If you are not local, you will need to cover
                        shipping costs to and from ABC Jewelers' location (please refer to the Shipping section). The
                        delivery date will depend on the arrival and necessary modification of your current ABC Jewelers
                        piece.
                      </p>
                    </div>
                  </div>
  
                  <div className="rounded-lg bg-white p-6 shadow-sm">
                    <h3 className="text-lg font-medium">
                      Can ABC Jewelers add charms to other bracelets/necklaces I own?
                    </h3>
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
                          The structural integrity of your existing piece if it appeared fragile or has weak points prior
                          to our work. We will inspect the item upon receipt and advise you of any potential concerns
                          before proceeding.
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
                        existing piece. This will depend on the complexity of the attachment. We will provide a quote
                        before beginning any work.
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
                        business days after we receive your piece, plus any applicable shipping time. We will provide a
                        time estimate with your order.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
  
              {/* Custom Design */}
              <div className="mb-12">
                <h2 className="mb-6 text-2xl font-light tracking-wide text-primary">Custom Design</h2>
                <div className="space-y-4">
                  <div className="rounded-lg bg-white p-6 shadow-sm">
                    <h3 className="text-lg font-medium">Do you do custom work?</h3>
                    <div className="mt-2 text-muted-foreground font-light">
                      <p>
                        Yes, we specialize in custom jewelry design. We enjoy collaborating with clients to create unique
                        pieces. If you would like us create a custom design for you, please contact us here with photo
                        attachments and/or detailed descriptions of your vision. We will respond within 1-5 business days
                        with a design sketch, estimated cost, and expected timeline of completion.
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
                          If we are only making minor modifications to existing designs, these can often be completed in
                          1-2 weeks. A more specific timeline will be provided with your quote.
                        </li>
                      </ul>
                    </div>
                  </div>
  
                  <div className="rounded-lg bg-white p-6 shadow-sm">
                    <h3 className="text-lg font-medium">
                      Can I provide my own jewelry components for the custom design?
                    </h3>
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
                        Warranty: All custom jewelry is covered under our warranty against manufacturer defects. Normal
                        wear and tear, abuse, or accidental damage are not covered.
                      </p>
                      <p>Refunds: All custom orders are nonrefundable.</p>
                      <p>
                        Payment: Once the custom jewelry is complete, the remaining balance is required upon completion.
                        Late payments will accrue additional charges (5% of the balance per 2 weeks) for every 2 weeks
                        past the completion date.
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
                        unethical and may infringe on copyright. However, if you admire certain styles, patterns, or
                        motifs, we can use those as inspiration to design a new original piece that captures the essence
                        you are looking for.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
  
              {/* Jewelry and Metals */}
              <div className="mb-12">
                <h2 className="mb-6 text-2xl font-light tracking-wide text-primary">Jewelry and Metals</h2>
                <div className="space-y-4">
                  <div className="rounded-lg bg-white p-6 shadow-sm">
                    <h3 className="text-lg font-medium">What's the difference between metals?</h3>
                    <div className="mt-2 space-y-4 text-muted-foreground font-light">
                      <p>
                        There are many metals we use to bring our designs to life! We specialize in materials that are
                        both beautiful and accessible.
                      </p>
                      <p className="font-medium">Sterling Silver:</p>
                      <ul className="ml-6 list-disc space-y-2">
                        <li>
                          The Look & Feel: A classic and popular precious metal, known for its bright, lustrous white
                          shine. It's very affordable for a precious metal.
                        </li>
                        <li>
                          The Quirks: Sterling silver naturally tarnishes over time when exposed to air and moisture, and
                          can react to chemicals (like those in perfumes, lotions, or cleaning supplies). This means it
                          can change color, often darkening.
                        </li>
                        <li>
                          The Upside: Tarnish on sterling silver is just a surface thing! You can slow it down by keeping
                          your silver jewelry dry and away from chemicals. When it does tarnish, it can be polished back
                          to its original brilliance.
                        </li>
                        <li>
                          Our Use: Because silver is a softer metal, we generally don't use it for settings that need to
                          hold stones with high tension or for very delicate, thin bands that might bend easily. It's
                          fantastic for wider bands, statement pieces, and for those who love the look of a precious metal
                          without a hefty price tag—great if you're trying out new styles or are concerned about
                          misplacing a very expensive item.
                        </li>
                      </ul>
                      <p className="font-medium">Brass:</p>
                      <ul className="ml-6 list-disc space-y-2">
                        <li>
                          The Look & Feel: An alloy primarily of copper and zinc, brass has a lovely warm, yellowish,
                          almost golden hue. It's quite affordable and has a nice weight to it.
                        </li>
                        <li>
                          The Quirks: Brass will also tarnish and oxidize over time, developing what's called a patina.
                          This can range from a deepening of its golden color to darker spots, or sometimes a greenish
                          tinge, especially if it's in frequent contact with skin oils or moisture. Some people actually
                          love this aged, vintage look!
                        </li>
                        <li>
                          The Upside: Like silver, tarnish on brass is on the surface and can be cleaned. (As we mentioned
                          in the cleaning section, a little ketchup or salsa can work wonders, or a dedicated brass
                          cleaner!)
                        </li>
                        <li>
                          Our Use: Brass is wonderful for bold, sculptural pieces, fashion jewelry, and components where
                          its warm color can really shine. It's strong and versatile for many designs.
                        </li>
                      </ul>
                      <p className="font-medium">Copper:</p>
                      <ul className="ml-6 list-disc space-y-2">
                        <li>
                          The Look & Feel: Known for its distinct, beautiful reddish-brown color. Copper is very
                          malleable, making it a joy to work with for artisans. It's also very affordable.
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
                        If you have metal allergies: This can be a bit tricky, as sensitivities vary greatly from person
                        to person.
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
                          Sterling Silver is an alloy that is typically 92.5% silver and 7.5% other metals, usually
                          copper. While many people can wear sterling silver without issue, those with copper allergies
                          might still experience a reaction.
                        </li>
                      </ul>
                      <p>
                        Our Advice: If you have known, significant metal allergies, particularly to copper, you might want
                        to exercise caution. Unfortunately, none of these metals are considered truly hypoallergenic like
                        titanium or niobium (which we don't currently specialize in). Patch testing a piece on a small
                        area of skin can sometimes help determine sensitivity.
                      </p>
                    </div>
                  </div>
  
                  <div className="rounded-lg bg-white p-6 shadow-sm">
                    <h3 className="text-lg font-medium">What can I do with my old jewelry?</h3>
                    <div className="mt-2 text-muted-foreground font-light">
                      <p>
                        We can often repurpose precious metals and gemstones from your old jewelry into a beautiful new
                        custom piece. This is a wonderful way to preserve sentimental value while creating something new.
                        We may also offer credit for your old gold, platinum, or diamonds towards a new purchase. If you
                        wish to keep certain components (like specific stones) and repurpose others, we will carefully
                        separate them.
                      </p>
                    </div>
                  </div>
  
                  <div className="rounded-lg bg-white p-6 shadow-sm">
                    <h3 className="text-lg font-medium">Why is my silver jewelry changing colors?</h3>
                    <div className="mt-2 text-muted-foreground font-light">
                      <p>
                        This is a natural process called tarnishing (oxidation). It occurs when silver reacts with sulfur
                        compounds in the air or on the skin. Fortunately, tarnish is a surface phenomenon and can usually
                        be removed by polishing.
                      </p>
                    </div>
                  </div>
  
                  <div className="rounded-lg bg-white p-6 shadow-sm">
                    <h3 className="text-lg font-medium">How should I clean my jewelry?</h3>
                    <div className="mt-2 space-y-4 text-muted-foreground font-light">
                      <p>
                        Silver: We offer a polishing cloth effective for remove tarnish. Contact us here to purchase one.
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
                          Store pieces separately in soft pouches or a lined jewelry box to prevent scratching and
                          tangling. Anti-tarnish strips can help protect silver.
                        </li>
                        <li>
                          Periodically check that stones in settings are secure. If anything feels loose, contact us for
                          an inspection.
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
  
              {/* Payment and Donations */}
              <div className="mb-12">
                <h2 className="mb-6 text-2xl font-light tracking-wide text-primary">Payment and Donations</h2>
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
                        Made-to-Order & Custom Items: Please refer to the specific product description or your custom
                        order agreement for creation timelines. Once shipped, the standard transit times apply.
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
                        Damaged: If your order arrives damaged, please contact us immediately (within 48 hours of receipt)
                        with photographs of the damaged item and packaging.
                      </p>
                      <p>
                        Lost: If your tracking information hasn't updated for an extended period or indicates delivery but
                        you haven't received it, please contact us. We will work with the carrier to investigate.
                      </p>
                    </div>
                  </div>
  
                  <div className="rounded-lg bg-white p-6 shadow-sm">
                    <h3 className="text-lg font-medium">What is the preferred payment method?</h3>
                    <div className="mt-2 space-y-4 text-muted-foreground font-light">
                      <p>
                        Local In-Person Deliveries (if pre-arranged): Cash on delivery, Venmo, or Apple Pay can be
                        accepted.
                      </p>
                      <p>
                        Website/Shipped Orders: We accept all major credit cards through our secure online checkout. For
                        other arrangements (e.g., specific custom order invoicing), Venmo or Apple Pay may be used.
                        Shipping fees apply for orders under $49.99 unless otherwise specified.
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
  
              {/* Ethical Sourcing & Sustainability */}
              <div className="mb-12">
                <h2 className="mb-6 text-2xl font-light tracking-wide text-primary">Ethical Sourcing & Sustainability</h2>
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
                          conflict-free gemstones and adhere to responsible mining practices. This includes adherence to
                          the Kimberley Process for diamonds and seeking transparency in the supply chain for colored
                          stones.
                        </li>
                        <li>
                          Supporting Artisans: Where applicable, we may partner with small-scale artisans, valuing fair
                          labor practices.
                        </li>
                        <li>
                          Transparency: We are open to discussing the sourcing of our materials. If you have questions
                          about a specific piece, please ask. Our commitment to ethical and sustainable practices is an
                          ongoing effort.
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    )
  }
  