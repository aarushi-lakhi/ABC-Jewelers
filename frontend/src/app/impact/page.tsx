import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ExternalLink, Mail, Phone } from "lucide-react"

export default function ImpactPage() {
  // Timeline data with organization details
  const timelineEvents = [
    {
      date: "2018",
      title: "The Beginning",
      description:
        "Founded ABC Jewelers and launched our first collection with a mission to create beautiful jewelry that funds medical care.",
      image: "/placeholder.svg?height=200&width=300",
      caption: "Our first collection launch",
      organization: {
        name: "ABC Jewelers",
        logo: "/logo.png",
        website: "",
        email: "jewelersabc@gmail.com",
        phone: "",
      },
    },
    {
      date: "September 2019",
      title: "First Partnership",
      description: "Sponsored 4 cataract eye surgeries at the Aravind Eye Hospital, beginning our journey of impact.",
      image: "/placeholder.svg?height=200&width=300",
      caption: "Aravind Eye Hospital Partnership",
      organization: {
        name: "Aravind Eye Hospital",
        logo: "/placeholder.svg?height=60&width=60",
        website: "https://aravind.org",
        email: "cbe.info@aravind.org",
        phone: "+99 (042) 436-0400",
      },
    },
    {
      date: "January 2020",
      title: "Expanding Our Reach",
      description: "Sponsored 5 ophthalmological surgeries at Sankara Nethralaya.",
      image: "/placeholder.svg?height=200&width=300",
      caption: "Sankara Nethralaya Partnership",
      organization: {
        name: "Sankara Nethralaya",
        logo: "/placeholder.svg?height=60&width=60",
        website: "https://sankaranethralaya.org",
        email: "indurti@snomtrust.org",
        phone: "+1 (855) 463-8472",
      },
    },
    {
      date: "June 2020",
      title: "Continued Support",
      description: "Sponsored 8 additional ophthalmological surgeries at Sankara Nethralaya.",
      organization: {
        name: "Sankara Nethralaya",
        logo: "/placeholder.svg?height=60&width=60",
        website: "https://sankaranethralaya.org",
        email: "indurti@snomtrust.org",
        phone: "+1 (855) 463-8472",
      },
    },
    {
      date: "August 2020",
      title: "Summer Initiative",
      description: "Sponsored 5 ophthalmological surgeries at Sankara Nethralaya.",
      organization: {
        name: "Sankara Nethralaya",
        logo: "/placeholder.svg?height=60&width=60",
        website: "https://sankaranethralaya.org",
        email: "indurti@snomtrust.org",
        phone: "+1 (855) 463-8472",
      },
    },
    {
      date: "December 2020",
      title: "Year-End Giving",
      description:
        "Sponsored 7 ophthalmological surgeries at Sankara Nethralaya, bringing our 2020 total to 25 surgeries.",
      image: "/placeholder.svg?height=200&width=300",
      caption: "Celebrating our 25th surgery funded",
      organization: {
        name: "Sankara Nethralaya",
        logo: "/placeholder.svg?height=60&width=60",
        website: "https://sankaranethralaya.org",
        email: "indurti@snomtrust.org",
        phone: "+1 (855) 463-8472",
      },
    },
    {
      date: "February 2021",
      title: "Kits for Kids Project",
      description:
        "Started ABC Jewelers' Kits for Kids project which donates jewelry making kits for young children and adolescents with cancer and blood disorders in the Texas Children's Hospital through the Periwinkle Arts in Medicine Program, helping encourage the development of coping skills.",
      image: "/placeholder.svg?height=200&width=300",
      caption: "Kits for Kids Project launch",
      organization: {
        name: "Texas Children's Hospital",
        logo: "/placeholder.svg?height=60&width=60",
        website: "https://texaschildrens.org",
        email: "cbherron@texaschildrens.org",
        phone: "+1 (832) 824-1000",
      },
    },
    {
      date: "July 2021",
      title: "COVID-19 Relief",
      description:
        'Supported SEWA International\'s "Help India Defeat COVID-19" campaign which helped millions in India during their acute oxygen shortage. ABC donated 2 oxygen concentrators, reducing hospitalization significantly.',
      image: "/placeholder.svg?height=200&width=300",
      caption: "COVID-19 Relief Efforts",
      organization: {
        name: "SEWA International",
        logo: "/placeholder.svg?height=60&width=60",
        website: "https://sewausa.org",
        email: "info-sdm@sewausa.org",
        phone: "+1 (713) 357-8216",
      },
    },
    {
      date: "December 2021",
      title: "Year-End Initiative",
      description: "Sponsored 5 ophthalmological surgeries at Sankara Nethralaya.",
      organization: {
        name: "Sankara Nethralaya",
        logo: "/placeholder.svg?height=60&width=60",
        website: "https://sankaranethralaya.org",
        email: "indurti@snomtrust.org",
        phone: "+1 (855) 463-8472",
      },
    },
    {
      date: "April 2022",
      title: "Cancer Research Support",
      description: "$500 donation to Texas4000 for cancer research.",
      image: "/placeholder.svg?height=200&width=300",
      caption: "Supporting cancer research",
      organization: {
        name: "Texas4000",
        logo: "/placeholder.svg?height=60&width=60",
        website: "https://texas4000.org",
        email: "info@texas4000.org",
        phone: "+1 (737) 300-2318",
      },
    },
    {
      date: "October 2022",
      title: "Major Milestone",
      description:
        "Sponsored 10 ophthalmological surgeries at Sankara Nethralaya, our largest single contribution to date.",
      organization: {
        name: "Sankara Nethralaya",
        logo: "/placeholder.svg?height=60&width=60",
        website: "https://sankaranethralaya.org",
        email: "indurti@snomtrust.org",
        phone: "+1 (855) 463-8472",
      },
    },
    {
      date: "May 2023",
      title: "Spring Initiative",
      description: "Sponsored 5 ophthalmological surgeries at Sankara Nethralaya.",
      organization: {
        name: "Sankara Nethralaya",
        logo: "/placeholder.svg?height=60&width=60",
        website: "https://sankaranethralaya.org",
        email: "indurti@snomtrust.org",
        phone: "+1 (855) 463-8472",
      },
    },
    {
      date: "November 2023",
      title: "Year-End Initiative",
      description: "Sponsored 5 ophthalmological surgeries at Sankara Nethralaya.",
      image: "/placeholder.svg?height=200&width=300",
      caption: "Our ongoing partnership with Sankara Nethralaya",
      organization: {
        name: "Sankara Nethralaya",
        logo: "/placeholder.svg?height=60&width=60",
        website: "https://sankaranethralaya.org",
        email: "indurti@snomtrust.org",
        phone: "+1 (855) 463-8472",
      },
    },
    {
      date: "March 2025",
      title: "Continued Commitment",
      description: "Sponsored 5 ophthalmological surgeries at Sankara Nethralaya.",
      organization: {
        name: "Sankara Nethralaya",
        logo: "/placeholder.svg?height=60&width=60",
        website: "https://sankaranethralaya.org",
        email: "indurti@snomtrust.org",
        phone: "+1 (855) 463-8472",
      },
    },
  ]

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="bg-accent brown-paper py-16 md:py-24 torn-paper-bottom">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-light tracking-wide md:text-5xl">Our Impact</h1>
            <p className="mt-6 text-lg text-muted-foreground font-light">
              ABC Jewelers is proud to have made a tangible impact on the lives of those in need. From sponsoring
              surgeries to supporting pediatric centers and donating to medical research, our initiatives have touched
              countless lives.
            </p>
          </div>
        </div>
      </section>

      {/* Impact Overview */}
      <section className="py-16 paper-texture">
        <div className="container">
          <div className="grid gap-8 md:grid-cols-3">
            <div className="impact-card">
              <div className="impact-number">60+</div>
              <h3 className="mb-2 text-xl font-bold">Surgeries Funded</h3>
              <p className="text-muted-foreground font-light">
                We've sponsored over 60 life-changing surgeries for patients who couldn't otherwise afford them.
              </p>
            </div>
            <div className="impact-card">
              <div className="impact-number">10+</div>
              <h3 className="mb-2 text-xl font-bold">Organizations Supported</h3>
              <p className="text-muted-foreground font-light">
                We've partnered with over 10 healthcare and charitable organizations worldwide to maximize our impact.
              </p>
            </div>
            <div className="impact-card">
              <div className="impact-number">$35K+</div>
              <h3 className="mb-2 text-xl font-bold">Donated to Medical Care</h3>
              <p className="text-muted-foreground font-light">
                We've contributed over $35,000 to medical care initiatives, research, and treatment programs for
                low-income patients.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Journey */}
      <section className="bg-primary/10 brown-paper py-16 torn-paper-top torn-paper-bottom">
        <div className="container">
          <h2 className="mb-16 text-center text-3xl font-light tracking-wide soft-heading">Our Impact Journey</h2>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute inset-0 flex justify-center">
              <div className="w-1 bg-primary/50"></div>
            </div>

            <div className="relative z-10 space-y-16">
              {timelineEvents.map((event, index) => (
                <div key={index} className="grid items-center gap-6 md:grid-cols-2">
                  <div className={`text-center ${index % 2 === 0 ? "md:text-right" : "order-2 md:text-left"}`}>
                    <div className="text-3xl font-light text-primary">{event.date}</div>
                    <h3 className="mt-2 text-xl font-light">{event.title}</h3>
                    <p className="mt-2 text-muted-foreground font-light">{event.description}</p>

                    {/* Organization info */}
                    <div
                      className={`mt-4 flex items-center gap-3 ${index % 2 === 0 ? "justify-end" : "justify-start"}`}
                    >
                      <div className="h-12 w-12 overflow-hidden rounded-full bg-white p-1 shadow-sm">
                        <Image
                          src={event.organization.logo || "/placeholder.svg"}
                          alt={event.organization.name}
                          width={48}
                          height={48}
                          className="h-full w-full object-contain"
                        />
                      </div>
                      <div className={`text-sm ${index % 2 === 0 ? "text-right" : "text-left"}`}>
                        <p className="font-medium">{event.organization.name}</p>
                        <div className="flex flex-col gap-1 text-xs text-muted-foreground">
                          <a
                            href={event.organization.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1 hover:text-primary"
                          >
                            <ExternalLink className="h-3 w-3" />
                            <span>Website</span>
                          </a>
                          <a
                            href={`mailto:${event.organization.email}`}
                            className="flex items-center gap-1 hover:text-primary"
                          >
                            <Mail className="h-3 w-3" />
                            <span>{event.organization.email}</span>
                          </a>
                          <a
                            href={`tel:${event.organization.phone}`}
                            className="flex items-center gap-1 hover:text-primary"
                          >
                            <Phone className="h-3 w-3" />
                            <span>{event.organization.phone}</span>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className={`relative ${index % 2 === 1 ? "order-1" : ""}`}>
                    <div
                      className={`absolute top-1/2 -translate-y-1/2 ${
                        index % 2 === 0 ? "-left-4 md:-left-4" : "-right-4 md:-right-4"
                      } h-8 w-8 rounded-full border-4 border-white bg-primary/70`}
                    ></div>

                    {event.image && (
                      <div className="polaroid mx-auto max-w-[250px] rotate-[0deg] hover:rotate-[1deg]">
                        <Image
                          src={event.image || "/placeholder.svg"}
                          alt={event.title}
                          width={250}
                          height={180}
                          className="h-auto w-full object-cover"
                        />
                        {event.caption && <p className="polaroid-caption">{event.caption}</p>}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Impact Stories */}
      <section className="py-16 paper-texture">
        <div className="container">
          <h2 className="mb-10 text-center text-3xl font-light tracking-wide soft-heading">Impact Stories</h2>
          <div className="grid gap-8 md:grid-cols-2">
            <div className="polaroid rotate-[-1deg]">
              <div className="rounded-lg bg-white p-6">
                <div className="mb-6 aspect-video overflow-hidden rounded-md">
                  <Image
                    src="/placeholder.svg?height=400&width=600"
                    alt="Impact Story"
                    width={600}
                    height={400}
                    className="h-full w-full object-cover"
                  />
                </div>
                <h3 className="mb-2 text-xl font-light text-primary">Aravind Eye Care Partnership</h3>
                <p className="text-muted-foreground font-light">
                  Our partnership with Aravind Eye Care System has enabled us to fund cataract surgeries for patients in
                  rural India. These surgeries have restored sight and independence to individuals who previously had
                  limited access to eye care.
                </p>
                <p className="mt-4 italic text-muted-foreground font-light">
                  "The gift of sight has transformed my life. I can now work and provide for my family again." - Raj,
                  surgery recipient
                </p>
              </div>
            </div>
            <div className="polaroid rotate-[1deg]">
              <div className="rounded-lg bg-white p-6">
                <div className="mb-6 aspect-video overflow-hidden rounded-md">
                  <Image
                    src="/placeholder.svg?height=400&width=600"
                    alt="Impact Story"
                    width={600}
                    height={400}
                    className="h-full w-full object-cover"
                  />
                </div>
                <h3 className="mb-2 text-xl font-light text-primary">Texas Children's Hospital Initiative</h3>
                <p className="text-muted-foreground font-light">
                  Our "Kits for Kids" project with the Periwinkle in Arts program at Texas Children's Hospital provides
                  creative outlets for children undergoing treatment. These art therapy kits help young patients express
                  themselves and cope with the challenges of hospitalization.
                </p>
                <p className="mt-4 italic text-muted-foreground font-light">
                  "The art kits bring so much joy to our patients. They're a bright spot during difficult treatments." -
                  Dr. Emily Chen, Pediatric Oncologist
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Partner Organizations */}
      <section className="bg-accent brown-paper py-16 torn-paper-top">
        <div className="container">
          <h2 className="mb-10 text-center text-3xl font-light tracking-wide soft-heading">
            Our Partner Organizations
          </h2>
          <div className="grid gap-6 md:grid-cols-3">
            <div className="flex flex-col items-center gap-4 rounded-lg bg-white p-6 shadow-sm">
              <div className="h-20 w-20">
                <Image
                  src="/placeholder.svg?height=80&width=80"
                  alt="Aravind Eye Care System"
                  width={80}
                  height={80}
                  className="h-full w-full object-contain"
                />
              </div>
              <h3 className="text-center text-xl font-light text-primary">Aravind Eye Care System</h3>
              <p className="text-center text-sm text-muted-foreground font-light">
                Providing affordable eye care services to underserved communities internationally
              </p>
              <a
                href="https://aravind.org"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 text-sm font-light text-primary hover:underline flex items-center gap-1"
              >
                <ExternalLink className="h-3 w-3" />
                Visit Website
              </a>
            </div>
            <div className="flex flex-col items-center gap-4 rounded-lg bg-white p-6 shadow-sm">
              <div className="h-20 w-20">
                <Image
                  src="/placeholder.svg?height=80&width=80"
                  alt="Sankara Nethralaya"
                  width={80}
                  height={80}
                  className="h-full w-full object-contain"
                />
              </div>
              <h3 className="text-center text-xl font-light text-primary">Sankara Nethralaya</h3>
              <p className="text-center text-sm text-muted-foreground font-light">
                Providing comprehensive eye care services to patients regardless of their ability to pay
              </p>
              <a
                href="https://sankaranethralaya.org"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 text-sm font-light text-primary hover:underline flex items-center gap-1"
              >
                <ExternalLink className="h-3 w-3" />
                Visit Website
              </a>
            </div>
            <div className="flex flex-col items-center gap-4 rounded-lg bg-white p-6 shadow-sm">
              <div className="h-20 w-20">
                <Image
                  src="/placeholder.svg?height=80&width=80"
                  alt="Texas Children's Hospital"
                  width={80}
                  height={80}
                  className="h-full w-full object-contain"
                />
              </div>
              <h3 className="text-center text-xl font-light text-primary">Texas Children's Hospital</h3>
              <p className="text-center text-sm text-muted-foreground font-light">
                Supporting pediatric healthcare and research for children worldwide
              </p>
              <a
                href="https://texaschildrens.org"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 text-sm font-light text-primary hover:underline flex items-center gap-1"
              >
                <ExternalLink className="h-3 w-3" />
                Visit Website
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 paper-texture">
        <div className="container">
          <div className="rounded-lg bg-primary/10 p-8 md:p-12">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="mb-4 text-3xl font-light tracking-wide soft-heading">Join Us in Making a Difference</h2>
              <p className="mb-6 text-lg text-muted-foreground font-light">
                Every purchase from ABC Jewelers contributes to our mission of providing medical care to those in need.
                Shop our collections and be part of the change.
              </p>
              <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
                <Button size="lg" asChild className="font-light">
                  <Link href="/shop">Shop to Support</Link>
                </Button>
                <Button size="lg" variant="outline" asChild className="font-light">
                  <Link href="/contact">Partner With Us</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
