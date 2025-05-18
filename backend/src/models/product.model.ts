import mongoose, { Document, Schema } from 'mongoose';

export interface IProduct extends Document {
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
    userId: mongoose.Types.ObjectId;
    name: string;
    rating: number;
    date: Date;
    comment: string;
  }[];
  relatedProducts: mongoose.Types.ObjectId[];
  stock: number;
  createdAt: Date;
  updatedAt: Date;
}

const productSchema = new Schema<IProduct>(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    longDescription: { type: String, required: true },
    price: { type: Number, required: true },
    images: [{ type: String, required: true }],
    category: { type: String, required: true },
    featured: { type: Boolean, default: false },
    new: { type: Boolean, default: false },
    options: {
      materials: [{ type: String }],
      customization: [{ type: String }],
    },
    reviews: [
      {
        userId: { type: Schema.Types.ObjectId, ref: 'User' },
        name: { type: String, required: true },
        rating: { type: Number, required: true, min: 1, max: 5 },
        date: { type: Date, default: Date.now },
        comment: { type: String, required: true },
      },
    ],
    relatedProducts: [{ type: Schema.Types.ObjectId, ref: 'Product' }],
    stock: { type: Number, required: true, default: 0 },
  },
  { timestamps: true }
);

export const Product = mongoose.model<IProduct>('Product', productSchema); 