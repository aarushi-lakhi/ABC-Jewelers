import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"

const collections = [
  {
    id: "earrings",
    name: "Earrings",
    description: "Handcrafted earrings in various styles and designs",
    image: "/placeholder.svg?height=400&width=300",
  },
  {
    id: "rings",
    name: "Rings",
    description: "Beautiful rings for every occasion",
    image: "/placeholder.svg?height=400&width=300",
  },
  {
    id: "charms",
    name: "Charms",
    description: "Unique charms to personalize your jewelry",
    image: "/placeholder.svg?height=400&width=300",
  },
  {
    id: "chains",
    name: "Chains",
    description: "Elegant chains for necklaces and bracelets",
    image: "/placeholder.svg?height=400&width=300",
  },
]

export default function CollectionsPreview() {
  return (
    <section className="py-16 paper-texture">
      <div className="container">
        <h2 className="mb-10 text-center text-2xl font-bold md:text-3xl">Our Collections</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {collections.map((collection) => (
            <Link
              key={collection.id}
              href={`/shop/${collection.id}`}
              className="group relative overflow-hidden rounded-lg"
            >
              <div className="polaroid rotate-[0deg] group-hover:rotate-[1deg]">
                <div className="aspect-[3/4] w-full overflow-hidden">
                  <Image
                    src={collection.image || "/placeholder.svg"}
                    alt={collection.name}
                    width={300}
                    height={400}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-2 text-center">
                  <h3 className="text-xl font-bold text-primary">{collection.name}</h3>
                  <p className="mb-4 mt-1 text-sm text-muted-foreground">{collection.description}</p>
                  <Button variant="outline" className="text-primary hover:bg-primary hover:text-white">
                    Shop Now
                  </Button>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
