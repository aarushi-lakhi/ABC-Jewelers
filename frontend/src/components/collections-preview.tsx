import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"

const collections = [
  {
    id: "earrings",
    name: "Earrings",
    description: "Handcrafted earrings in various styles and designs",
    image: "https://static.wixstatic.com/media/7033d2_2666911222f047dc8f546d4ea70f4243~mv2.png/v1/fill/w_600,h_800,q_90/file.jpg",
  },
  {
    id: "rings",
    name: "Rings",
    description: "Beautiful rings for every occasion",
    image: "https://static.wixstatic.com/media/7033d2_48ab4cf2a3fd49b7800d5cd3d0dcdf1c~mv2.jpg/v1/fill/w_600,h_800,q_90/file.jpg",
  },
  {
    id: "charms",
    name: "Charms",
    description: "Unique charms to personalize your jewelry",
    image: "https://static.wixstatic.com/media/7033d2_894b988e0fc841fe89be1420d012c0cb~mv2.png/v1/fill/w_600,h_800,q_90/file.jpg",
  },
  {
    id: "chains",
    name: "Chains",
    description: "Elegant chains for necklaces and bracelets",
    image: "https://static.wixstatic.com/media/7033d2_3d88408f9b8f4895a9d3eaf427bfdb00~mv2.png/v1/fill/w_600,h_800,q_90/file.jpg",
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
