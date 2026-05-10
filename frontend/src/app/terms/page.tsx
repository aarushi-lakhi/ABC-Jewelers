export default function TermsPage() {
  return (
    <div className="container py-12 md:py-16">
      <div className="mx-auto max-w-3xl">
        <h1 className="mb-2 text-3xl font-light tracking-wide">Terms of Service</h1>
        <p className="mb-10 text-sm text-muted-foreground">Last updated: May 2026</p>

        <div className="prose prose-sm max-w-none space-y-8 font-light text-foreground">
          <section>
            <h2 className="text-xl font-medium">1. Acceptance of Terms</h2>
            <p className="mt-3 text-muted-foreground">
              By accessing or using the ABC Jewelers website, you agree to these Terms of Service. If you do not agree, please do not use the site.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-medium">2. Products and Pricing</h2>
            <ul className="mt-3 list-disc pl-6 text-muted-foreground space-y-1">
              <li>All prices are listed in US dollars and are subject to change without notice.</li>
              <li>We reserve the right to limit quantities and refuse orders at our discretion.</li>
              <li>Product images are for illustration purposes — slight variations in color may occur.</li>
              <li>Chain products are priced and sold per inch.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-medium">3. Orders and Payment</h2>
            <ul className="mt-3 list-disc pl-6 text-muted-foreground space-y-1">
              <li>Orders are confirmed once payment is successfully processed through Stripe.</li>
              <li>We accept major credit and debit cards via Stripe.</li>
              <li>You agree to provide accurate billing and shipping information.</li>
              <li>Stock availability is reflected at time of purchase; we cannot guarantee availability between cart and checkout.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-medium">4. Shipping</h2>
            <p className="mt-3 text-muted-foreground">
              Orders over $50 ship free. Orders under $50 carry a $5.99 shipping fee. We aim to ship within 3–5 business days. Delivery times may vary. We are not responsible for delays caused by carriers.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-medium">5. Returns and Refunds</h2>
            <p className="mt-3 text-muted-foreground">
              We want you to love your purchase. If you have an issue with your order, please contact us at jewelersabc@gmail.com within 14 days of receiving your item. We handle refund and replacement requests case by case.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-medium">6. Our Mission and Impact</h2>
            <p className="mt-3 text-muted-foreground">
              ABC Jewelers is a student-run nonprofit. Approximately 80 cents of every dollar raised goes toward funding medical care for low-income patients through our partner organizations. Purchases are not tax-deductible charitable contributions.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-medium">7. Intellectual Property</h2>
            <p className="mt-3 text-muted-foreground">
              All content on this site — including text, images, and branding — is the property of ABC Jewelers and may not be reproduced without permission.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-medium">8. Limitation of Liability</h2>
            <p className="mt-3 text-muted-foreground">
              ABC Jewelers is not liable for any indirect, incidental, or consequential damages arising from your use of the site or purchase of products. Our liability is limited to the amount you paid for the affected order.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-medium">9. Changes to Terms</h2>
            <p className="mt-3 text-muted-foreground">
              We may update these terms at any time. Continued use of the site after changes constitutes acceptance of the new terms.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-medium">10. Contact</h2>
            <p className="mt-3 text-muted-foreground">
              Questions about these terms? Email us at{" "}
              <a href="mailto:jewelersabc@gmail.com" className="text-primary hover:underline">jewelersabc@gmail.com</a>.
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}
