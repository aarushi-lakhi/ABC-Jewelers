"use client"

import { useState, useEffect, use } from "react"
import Image from "next/image"
import Link from "next/link"
import { Heart, Minus, Plus, Share2, ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { useCart } from "@/components/cart-provider"

// Type Definitions
interface Review {
    id: string;
    name: string;
    rating: number;
    date: string;
    comment: string;
}

const productIds = ["1", "2", "5", "7"] as const;
type ProductId = typeof productIds[number];

interface SimpleProduct {
    id: ProductId;
    name: string;
    price: number;
    image: string;
    category: string;
    new?: boolean;
}

interface FullProduct {
    id: ProductId;
    name: string;
    description: string;
    longDescription: string;
    price: number;
    images: string[];
    category: string;
    featured?: boolean;
    new?: boolean;
    options: {
        materials: string[];
        customization: string[];
    };
    reviews: Review[];
    relatedProducts: ProductId[];
}

type ProductsData = {
    "1": FullProduct;
    "2": SimpleProduct;
    "5": SimpleProduct;
    "7": SimpleProduct;
};

// TODO: replace sample product data with real products from database
const products: ProductsData = {
    "1": {
        id: "1",
        name: "Sunflower Earrings",
        description:
            "Handcrafted sunflower earrings made with sustainable materials. Each purchase helps fund medical care.",
        longDescription:
            "These beautiful sunflower earrings are handcrafted with love and care. Made from sustainable materials, they feature vibrant yellow petals and a detailed center. The earrings hang from hypoallergenic hooks and are lightweight enough for all-day wear. Each pair is slightly unique due to the handmade nature, making them a special addition to your jewelry collection.\n\nAs part of our commitment to social impact, a portion of each purchase goes directly to funding medical care for low-income patients. By wearing these earrings, you're not only expressing your personal style but also contributing to a meaningful cause that helps those in need access essential healthcare services.",
        price: 29.99,
        images: [
            "/placeholder.svg?height=600&width=600",
            "/placeholder.svg?height=600&width=600",
            "/placeholder.svg?height=600&width=600",
            "/placeholder.svg?height=600&width=600",
        ],
        category: "earrings",
        featured: true,
        new: true,
        options: {
            materials: ["Silver", "Gold"],
            customization: ["None", "Engraving (+$5)"],
        },
        reviews: [
            {
                id: "r1",
                name: "Sarah J.",
                rating: 5,
                date: "2023-12-15",
                comment:
                    "These earrings are absolutely beautiful! The craftsmanship is excellent, and I love knowing my purchase is helping fund medical care.",
            },
            {
                id: "r2",
                name: "Emily R.",
                rating: 4,
                date: "2023-11-30",
                comment: "Lovely earrings that are lightweight and comfortable to wear. The sunflower design is so cheerful!",
            },
            {
                id: "r3",
                name: "Michael T.",
                rating: 5,
                date: "2023-10-22",
                comment: "Bought these for my wife and she loves them. Great quality and beautiful design.",
            },
        ],
        relatedProducts: ["2", "5", "7"],
    },
    "2": {
        id: "2",
        name: "Butterfly Charm",
        price: 19.99,
        image: "/placeholder.svg?height=300&width=300",
        category: "charms",
    },
    "5": {
        id: "5",
        name: "Ocean Wave Earrings",
        price: 32.99,
        image: "/placeholder.svg?height=300&width=300",
        category: "earrings",
    },
    "7": {
        id: "7",
        name: "Star Charm",
        price: 15.99,
        image: "/placeholder.svg?height=300&width=300",
        category: "charms",
        new: true,
    },
}

// Type guard to check if a string is a valid ProductId
function isValidProductId(id: string): id is ProductId {
    return (productIds as readonly string[]).includes(id);
}

// Type guard to check if a product is a FullProduct (suitable for detailed view)
function isFullProduct(product: FullProduct | SimpleProduct | undefined): product is FullProduct {
    if (!product) return false;
    return (
        (product as FullProduct).longDescription !== undefined &&
        (product as FullProduct).options !== undefined &&
        (product as FullProduct).reviews !== undefined &&
        (product as FullProduct).images !== undefined
    );
}

// Define the expected shape of the resolved params object
interface ResolvedProductPageParams {
    category: string;
    id: string; // This will be further validated by isValidProductId
  }
  
  // Define the props for the page, where params is now a Promise
  interface ProductPageProps {
    params: Promise<ResolvedProductPageParams>;
  }

export default function ProductPage({ params: paramsPromise }: ProductPageProps) {
    // Unwrap the params Promise using React.use()
  // This must be called at the top level of the component or hook.
  const params = use(paramsPromise);

    const [selectedImage, setSelectedImage] = useState(0)
    const [quantity, setQuantity] = useState(1)
    const [selectedOptions, setSelectedOptions] = useState<{ materials: string; customization: string } | null>(null);
    const { addItem } = useCart()

    // Access params.id on the resolved params object
    if (!isValidProductId(params.id)) {
        return (
            <div className="container flex min-h-[400px] items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl font-bold">Product Not Found</h1>
                    <p className="mt-2 text-muted-foreground">The product ID in the URL is invalid.</p>
                    <Button className="mt-4" asChild>
                        <Link href="/shop">Back to Shop</Link>
                    </Button>
                </div>
            </div>
        );
    }

    // TODO: fetch product data based on id
    const productData = products[params.id]; // params.id is from resolved params, and is ProductId

    if (!isFullProduct(productData)) {
        return (
            <div className="container flex min-h-[400px] items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl font-bold">Product Not Found</h1>
                    <p className="mt-2 text-muted-foreground">The product you're looking for doesn't exist.</p>
                    <Button className="mt-4" asChild>
                        <Link href="/shop">Back to Shop</Link>
                    </Button>
                </div>
            </div>
        )
    }

    const product: FullProduct = productData;

    useEffect(() => {
        // Initialize selectedOptions when product is loaded
        if (product) {
            setSelectedOptions({
                materials: product.options.materials[0] || "", // Default to first material
                customization: product.options.customization[0] || "", // Default to first customization
            });
            setSelectedImage(0); // Reset selected image when product changes
            setQuantity(1); // Reset quantity
        }
    }, [product]);

    const handleOptionChange = (optionType: keyof FullProduct['options'], value: string) => {
        setSelectedOptions((prev) => ({
            ...(prev as { materials: string; customization: string }),
            [optionType]: value,
        }));
    };

    const handleAddToCart = () => {
        if (!selectedOptions) return; // Guard if options not initialized

        const finalPrice = product.price + (selectedOptions.customization === "Engraving (+$5)" ? 5 : 0);

        addItem({
            id: product.id,
            name: product.name,
            price: finalPrice,
            image: product.images[0], // FullProduct always has images, use the first one
            quantity,
            options: selectedOptions,
        });
    };

    // product.relatedProducts is ProductId[]. products[id] will be SimpleProduct here.
    const relatedProductsData: SimpleProduct[] = product.relatedProducts
        .map((id: ProductId): SimpleProduct => products[id] as SimpleProduct) // Assert as SimpleProduct as per our data model
        .filter((rp): rp is SimpleProduct => !!rp); // Filter out undefined just in case, though our types should prevent it


    const averageRating = product.reviews.length > 0
        ? product.reviews.reduce((acc: number, review: Review) =>
            acc + review.rating, 0) / product.reviews.length : 0;

    // Early return or loading state if selectedOptions are not yet initialized by useEffect
    if (!selectedOptions) {
        return (
            <div className="container flex min-h-[400px] items-center justify-center">
                <p>Loading product details...</p>
            </div>
        );
    }

    return (
        <div className="container py-8 md:py-12">
            <div className="grid gap-8 md:grid-cols-2">
                {/* Product Images */}
                <div className="flex flex-col gap-4">
                    <div className="relative aspect-square overflow-hidden rounded-lg border">
                        <Image
                            src={product.images[selectedImage]} // product is FullProduct, so images exists
                            alt={product.name}
                            fill
                            className="object-cover"
                        />
                    </div>
                    {product.images.length > 1 && (
                        <div className="flex gap-2 overflow-auto pb-2">
                            {product.images.map((image: string, index: number) => ( // Type `image` as string, `index` as number
                                <button
                                    key={index}
                                    className={`relative aspect-square w-20 overflow-hidden rounded-md border ${selectedImage === index ? "ring-2 ring-primary" : ""
                                        }`}
                                    onClick={() => setSelectedImage(index)}
                                >
                                    <Image
                                        src={image}
                                        alt={`${product.name} ${index + 1}`}
                                        fill
                                        className="object-cover"
                                    />
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                {/* Product Details */}
                <div className="flex flex-col gap-6">
                    <div>
                        <h1 className="text-3xl font-bold">{product.name}</h1>
                        <div className="mt-2 flex items-center gap-4">
                            <div className="flex">
                                {[...Array(5)].map((_, i: number) => ( // Type `i` as number
                                    <svg
                                        key={i}
                                        className={`h-5 w-5 ${i < Math.round(averageRating)
                                            ? "fill-primary"
                                            : "fill-muted stroke-muted-foreground"
                                            }`}
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                ))}
                            </div>
                            <span className="text-sm text-muted-foreground">{product.reviews.length} reviews</span>
                        </div>
                        <p className="mt-4 text-2xl font-bold">
                            ${(product.price + (selectedOptions.customization === "Engraving (+$5)" ? 5 : 0)).toFixed(2)}
                        </p>
                        <p className="mt-2 text-sm text-muted-foreground">
                            A portion of this purchase funds medical care for those in need
                        </p>
                    </div>

                    <div className="grid gap-4">
                        {product.options.materials && (
                            <div>
                                <h3 className="mb-2 font-medium">Material</h3>
                                <RadioGroup
                                    value={selectedOptions.materials}
                                    onValueChange={(value) => handleOptionChange("materials", value)}
                                    className="flex flex-wrap gap-2"
                                >
                                    {product.options.materials.map((material: string) => ( // Type `material` as string
                                        <div key={material}>
                                            <RadioGroupItem id={`material-${material}`} value={material} className="peer sr-only" />
                                            <Label
                                                htmlFor={`material-${material}`}
                                                className="flex cursor-pointer items-center justify-center rounded-md border px-4 py-2 peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/10 peer-data-[state=checked]:font-medium"
                                            >
                                                {material}
                                            </Label>
                                        </div>
                                    ))}
                                </RadioGroup>
                            </div>
                        )}

                        {product.options.customization && (
                            <div>
                                <h3 className="mb-2 font-medium">Customization</h3>
                                <RadioGroup
                                    value={selectedOptions.customization}
                                    onValueChange={(value) => handleOptionChange("customization", value)}
                                    className="flex flex-wrap gap-2"
                                >
                                    {product.options.customization.map((option: string) => ( // Type `option` as string
                                        <div key={option}>
                                            <RadioGroupItem id={`customization-${option}`} value={option} className="peer sr-only" />
                                            <Label
                                                htmlFor={`customization-${option}`}
                                                className="flex cursor-pointer items-center justify-center rounded-md border px-4 py-2 peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/10 peer-data-[state=checked]:font-medium"
                                            >
                                                {option}
                                            </Label>
                                        </div>
                                    ))}
                                </RadioGroup>
                            </div>
                        )}

                        <div>
                            <h3 className="mb-2 font-medium">Quantity</h3>
                            <div className="flex items-center">
                                <Button
                                    variant="outline"
                                    size="icon"
                                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                    disabled={quantity <= 1}
                                >
                                    <Minus className="h-4 w-4" />
                                    <span className="sr-only">Decrease quantity</span>
                                </Button>
                                <span className="w-12 text-center">{quantity}</span>
                                <Button variant="outline" size="icon" onClick={() => setQuantity(quantity + 1)}>
                                    <Plus className="h-4 w-4" />
                                    <span className="sr-only">Increase quantity</span>
                                </Button>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col gap-4 sm:flex-row">
                        <Button className="flex-1" size="lg" onClick={handleAddToCart}>
                            <ShoppingCart className="mr-2 h-5 w-5" />
                            Add to Cart
                        </Button>
                        <Button variant="outline" size="lg">
                            <Heart className="mr-2 h-5 w-5" />
                            Add to Wishlist
                        </Button>
                    </div>

                    <div className="flex items-center gap-4">
                        <Button variant="ghost" size="sm" className="gap-1">
                            <Share2 className="h-4 w-4" />
                            Share
                        </Button>
                    </div>
                </div>
            </div>

            {/* Product Information Tabs */}
            <div className="mt-12">
                <Tabs defaultValue="description">
                    <TabsList className="w-full justify-start">
                        <TabsTrigger value="description">Description</TabsTrigger>
                        <TabsTrigger value="details">Details</TabsTrigger>
                        <TabsTrigger value="impact">Our Impact</TabsTrigger>
                        <TabsTrigger value="reviews">Reviews ({product.reviews.length || 0})</TabsTrigger>
                    </TabsList>
                    <TabsContent value="description" className="mt-4">
                        <div className="prose max-w-none">
                            {/* Using whitespace-pre-line to preserve newlines from longDescription */}
                            <p className="whitespace-pre-line">{product.longDescription || product.description}</p>
                        </div>
                    </TabsContent>
                    <TabsContent value="details" className="mt-4">
                        <div className="grid gap-4 sm:grid-cols-2">
                            <div className="rounded-lg border p-4">
                                <h3 className="font-medium">Materials</h3>
                                <p className="text-sm text-muted-foreground">
                                    Recycled metals, ethically sourced gemstones, and sustainable materials. Specifics: {product.options.materials.join(", ")}.
                                </p>
                            </div>
                            <div className="rounded-lg border p-4">
                                <h3 className="font-medium">Dimensions</h3>
                                <p className="text-sm text-muted-foreground">
                                    Approximately 1.5 inches in length and 0.75 inches in width (example dimensions).
                                </p>
                            </div>
                            <div className="rounded-lg border p-4">
                                <h3 className="font-medium">Care Instructions</h3>
                                <p className="text-sm text-muted-foreground">
                                    Store in a cool, dry place. Clean with a soft cloth. Avoid contact with water and chemicals.
                                </p>
                            </div>
                            <div className="rounded-lg border p-4">
                                <h3 className="font-medium">Shipping</h3>
                                <p className="text-sm text-muted-foreground">
                                    Ships within 1-3 business days. Free shipping on orders over $50.
                                </p>
                            </div>
                        </div>
                    </TabsContent>
                    <TabsContent value="impact" className="mt-4">
                        <div className="prose max-w-none">
                            <p>
                                At ABC Jewelers, we believe in making a tangible difference in the world. With every purchase, a portion
                                of the proceeds goes directly to funding medical care for low-income patients who otherwise wouldn't
                                have access to essential healthcare services.
                            </p>
                            <p className="mt-4">
                                This specific product helps support our partnership with Aravind Eye Care System, providing cataract
                                surgeries for patients in need. Your purchase makes a real difference in someone's life.
                            </p>
                            <div className="mt-6 rounded-lg bg-primary/10 p-4">
                                <h3 className="text-lg font-medium">Your Impact</h3>
                                <p className="mt-2">
                                    Each piece of jewelry sold contributes approximately $5-10 to our medical care fund, which directly
                                    supports surgeries, medical equipment, and healthcare access for those in need.
                                </p>
                            </div>
                        </div>
                    </TabsContent>
                    <TabsContent value="reviews" className="mt-4">
                        {product.reviews.length > 0 ? (
                            <div className="grid gap-6">
                                {product.reviews.map((review: Review) => ( // Type `review` as Review
                                    <div key={review.id} className="rounded-lg border p-4">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className="font-medium">{review.name}</p>
                                                <p className="text-sm text-muted-foreground">{new Date(review.date).toLocaleDateString()}</p>
                                            </div>
                                            <div className="flex">
                                                {[...Array(5)].map((_, i: number) => ( // Type `i` as number
                                                    <svg
                                                        key={i}
                                                        className={`h-5 w-5 ${i < review.rating ? "fill-primary" : "fill-muted stroke-muted-foreground"
                                                            }`}
                                                        viewBox="0 0 20 20"
                                                        fill="currentColor"
                                                    >
                                                        <path
                                                            fillRule="evenodd"
                                                            d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z"
                                                            clipRule="evenodd"
                                                        />
                                                    </svg>
                                                ))}
                                            </div>
                                        </div>
                                        <p className="mt-4">{review.comment}</p>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="rounded-lg border border-dashed p-8 text-center">
                                <h3 className="text-lg font-medium">No Reviews Yet</h3>
                                <p className="mt-2 text-muted-foreground">Be the first to review this product</p>
                            </div>
                        )}
                    </TabsContent>
                </Tabs>
            </div>

            {/* Related Products */}
            {relatedProductsData.length > 0 && (
                <div className="mt-16">
                    <h2 className="mb-6 text-2xl font-bold">You May Also Like</h2>
                    <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4">
                        {relatedProductsData.map((relatedProduct: SimpleProduct) => ( // Type `relatedProduct` as SimpleProduct
                            <Link
                                key={relatedProduct.id}
                                href={`/shop/${relatedProduct.category}/${relatedProduct.id}`}
                                className="group rounded-lg border bg-background p-2"
                            >
                                <div className="relative mb-2 aspect-square overflow-hidden rounded-md">
                                    <Image
                                        src={relatedProduct.image} // SimpleProduct has `image`
                                        alt={relatedProduct.name}
                                        fill
                                        className="object-cover transition-transform group-hover:scale-105"
                                    />
                                </div>
                                <div className="p-2">
                                    <h3 className="font-medium group-hover:underline">{relatedProduct.name}</h3>
                                    <p className="font-semibold">${relatedProduct.price.toFixed(2)}</p>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}