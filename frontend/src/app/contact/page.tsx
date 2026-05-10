"use client"

import type React from "react"
import { useState } from "react"
import { Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Instagram, Mail, Clock } from "lucide-react"
import { emailAPI } from "@/lib/api"

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" })
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setSubmitting(true)
    try {
      await emailAPI.contact(formData)
      setIsSubmitted(true)
    } catch (err: any) {
      setError(err.response?.data?.error || "Failed to send message. Please email us at jewelersabc@gmail.com.")
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="flex flex-col">
      <section className="bg-accent brown-paper py-16 md:py-24 torn-paper-bottom">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-light tracking-wide md:text-5xl">Contact Us</h1>
            <p className="mt-6 text-lg text-muted-foreground font-light">
              We&apos;d love to hear from you! Whether you have a question about our products, impact initiatives, or
              anything else, our team is ready to help.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container">
          <div className="grid gap-8 md:grid-cols-2">
            <div className="order-2 md:order-1">
              {isSubmitted ? (
                <div className="rounded-lg border bg-primary/10 p-8 text-center">
                  <h2 className="mb-4 text-2xl font-light">Thank You!</h2>
                  <p className="text-muted-foreground font-light">
                    Your message has been sent. We&apos;ll get back to you as soon as possible.
                  </p>
                  <Button
                    className="mt-6 font-light"
                    onClick={() => { setIsSubmitted(false); setFormData({ name: "", email: "", subject: "", message: "" }) }}
                  >
                    Send Another Message
                  </Button>
                </div>
              ) : (
                <div className="rounded-lg border bg-white p-6 shadow-sm">
                  <h2 className="mb-6 text-2xl font-light">Send Us a Message</h2>
                  <form onSubmit={handleSubmit} className="grid gap-4">
                    <div className="grid gap-2">
                      <label htmlFor="name" className="text-sm font-light">Your Name</label>
                      <Input id="name" name="name" value={formData.name} onChange={handleInputChange} required />
                    </div>
                    <div className="grid gap-2">
                      <label htmlFor="email" className="text-sm font-light">Your Email</label>
                      <Input id="email" name="email" type="email" value={formData.email} onChange={handleInputChange} required />
                    </div>
                    <div className="grid gap-2">
                      <label htmlFor="subject" className="text-sm font-light">Subject</label>
                      <Input id="subject" name="subject" value={formData.subject} onChange={handleInputChange} required />
                    </div>
                    <div className="grid gap-2">
                      <label htmlFor="message" className="text-sm font-light">Your Message</label>
                      <Textarea id="message" name="message" rows={5} value={formData.message} onChange={handleInputChange} required />
                    </div>
                    {error && <p className="text-sm text-destructive">{error}</p>}
                    <Button type="submit" className="mt-2 font-light" disabled={submitting}>
                      {submitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                      Send Message
                    </Button>
                  </form>
                </div>
              )}
            </div>

            <div className="order-1 md:order-2">
              <div className="rounded-lg border bg-white p-6 shadow-sm">
                <h2 className="mb-6 text-2xl font-light">Contact Information</h2>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                      <Mail className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium">Email</h3>
                      <p className="text-muted-foreground font-light">jewelersabc@gmail.com</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                      <Instagram className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium">Instagram</h3>
                      <p className="text-muted-foreground font-light">@abc.jewelers</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                      <Clock className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium">Hours</h3>
                      <p className="text-muted-foreground font-light">Monday–Friday: 9am–8pm</p>
                      <p className="text-muted-foreground font-light">Saturday: 9am–11pm</p>
                      <p className="text-muted-foreground font-light">Sunday: 12pm–11pm</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 rounded-lg border bg-white p-6 shadow-sm">
                <h2 className="mb-4 text-xl font-light">Follow Us</h2>
                <p className="mb-4 text-muted-foreground font-light">
                  Stay connected for updates, behind-the-scenes content, and impact stories.
                </p>
                <div className="flex gap-4">
                  <a
                    href="https://instagram.com/abc.jewelers"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary hover:bg-primary hover:text-white transition-colors"
                  >
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                    </svg>
                  </a>
                  <a
                    href="mailto:jewelersabc@gmail.com"
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary hover:bg-primary hover:text-white transition-colors"
                  >
                    <Mail className="h-5 w-5" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
