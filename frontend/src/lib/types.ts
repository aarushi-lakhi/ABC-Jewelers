export interface Product {
  _id: string;
  name: string;
  description: string;
  longDescription: string;
  price: number;
  images: string[];
  category: string;
  featured: boolean;
  new: boolean;
  options: {
    materials: string[];
    customization: string[];
  };
  reviews: {
    _id?: string;
    userId: string;
    name: string;
    rating: number;
    date: string;
    comment: string;
  }[];
  relatedProducts: string[];
  stock: number;
  createdAt: string;
  updatedAt: string;
}
