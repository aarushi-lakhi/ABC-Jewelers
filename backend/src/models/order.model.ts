import mongoose, { Document, Schema } from 'mongoose';

export interface IOrder extends Document {
  userId?: mongoose.Types.ObjectId;
  guestEmail?: string;
  guestName?: string;
  stripeSessionId?: string;
  items: {
    productId: mongoose.Types.ObjectId;
    name: string;
    price: number;
    quantity: number;
    options: {
      materials?: string;
      customization?: string;
    };
  }[];
  totalAmount: number;
  shippingAddress: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  paymentStatus: 'pending' | 'completed' | 'failed';
  paymentMethod: string;
  promoCode?: string;
  discountAmount?: number;
  createdAt: Date;
  updatedAt: Date;
}

const orderSchema = new Schema<IOrder>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', default: null },
    guestEmail: { type: String },
    guestName: { type: String },
    stripeSessionId: { type: String },
    items: [
      {
        productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
        name: { type: String, required: true },
        price: { type: Number, required: true },
        quantity: { type: Number, required: true, min: 1 },
        options: {
          materials: { type: String },
          customization: { type: String },
        },
      },
    ],
    totalAmount: { type: Number, required: true },
    shippingAddress: {
      street: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true },
      zipCode: { type: String, required: true },
      country: { type: String, required: true },
    },
    status: {
      type: String,
      enum: ['pending', 'processing', 'shipped', 'delivered', 'cancelled'],
      default: 'pending',
    },
    paymentStatus: {
      type: String,
      enum: ['pending', 'completed', 'failed'],
      default: 'pending',
    },
    paymentMethod: { type: String, required: true },
    promoCode: { type: String },
    discountAmount: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const Order = mongoose.model<IOrder>('Order', orderSchema); 