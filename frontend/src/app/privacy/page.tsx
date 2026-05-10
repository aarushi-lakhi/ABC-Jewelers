export default function PrivacyPage() {
  return (
    <div className="container py-12 md:py-16">
      <div className="mx-auto max-w-3xl">
        <h1 className="mb-2 text-3xl font-light tracking-wide">Privacy Policy</h1>
        <p className="mb-10 text-sm text-muted-foreground">Last updated: May 2026</p>

        <div className="prose prose-sm max-w-none space-y-8 font-light text-foreground">
          <section>
            <h2 className="text-xl font-medium">1. Information We Collect</h2>
            <p className="mt-3 text-muted-foreground">
              When you use ABC Jewelers, we may collect the following information:
            </p>
            <ul className="mt-2 list-disc pl-6 text-muted-foreground space-y-1">
              <li><strong>Account information:</strong> name and email address when you create an account or check out.</li>
              <li><strong>Order information:</strong> shipping address, items purchased, and payment status (we do not store card numbers — payments are processed securely by Stripe).</li>
              <li><strong>Newsletter:</strong> email address if you subscribe to updates.</li>
              <li><strong>Contact messages:</strong> name, email, and message content when you contact us.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-medium">2. How We Use Your Information</h2>
            <ul className="mt-3 list-disc pl-6 text-muted-foreground space-y-1">
              <li>To process and fulfill your orders.</li>
              <li>To communicate with you about your order or inquiries.</li>
              <li>To send newsletter updates you have opted into (you can unsubscribe at any time).</li>
              <li>To improve our website and services.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-medium">3. Sharing Your Information</h2>
            <p className="mt-3 text-muted-foreground">
              We do not sell or rent your personal information to third parties. We share data only with:
            </p>
            <ul className="mt-2 list-disc pl-6 text-muted-foreground space-y-1">
              <li><strong>Stripe</strong> — to process payments securely.</li>
              <li>Service providers who help us operate our website, under confidentiality agreements.</li>
              <li>Law enforcement or legal authorities when required by law.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-medium">4. Cookies</h2>
            <p className="mt-3 text-muted-foreground">
              We use browser local storage to keep you logged in and remember your cart. We do not use third-party tracking cookies.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-medium">5. Data Retention</h2>
            <p className="mt-3 text-muted-foreground">
              We retain your order history to provide order tracking and account history. You may request deletion of your account and personal data by emailing us at jewelersabc@gmail.com.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-medium">6. Security</h2>
            <p className="mt-3 text-muted-foreground">
              We use industry-standard security practices including encrypted connections (HTTPS) and secure password hashing. Payment information is handled entirely by Stripe and never stored on our servers.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-medium">7. Your Rights</h2>
            <p className="mt-3 text-muted-foreground">
              You may request access to, correction of, or deletion of your personal data at any time by contacting us at <a href="mailto:jewelersabc@gmail.com" className="text-primary hover:underline">jewelersabc@gmail.com</a>.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-medium">8. Contact</h2>
            <p className="mt-3 text-muted-foreground">
              If you have any questions about this Privacy Policy, please contact us at{" "}
              <a href="mailto:jewelersabc@gmail.com" className="text-primary hover:underline">jewelersabc@gmail.com</a>.
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}
