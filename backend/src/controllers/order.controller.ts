import { Request, Response } from 'express';
import mongoose from 'mongoose';
import { Order } from '../models/order.model';
import { Product } from '../models/product.model';

const PROMO_CODES: Record<string, number> = {
  IMPACT10: 0.1,
};

export const orderController = {
  getAllOrders: async (req: Request, res: Response) => {
    try {
      const orders = await Order.find().populate('userId', 'name email');
      res.json(orders);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching orders' });
    }
  },

  getUserOrders: async (req: Request, res: Response) => {
    try {
      const orders = await Order.find({ userId: (req as any).user._id });
      res.json(orders);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching user orders' });
    }
  },

  getOrderById: async (req: Request, res: Response) => {
    try {
      const order = await Order.findById(req.params.id);
      if (!order) {
        return res.status(404).json({ error: 'Order not found' });
      }

      const user = (req as any).user;
      if (user) {
        if (user.role !== 'admin' && order.userId?.toString() !== user._id.toString()) {
          return res.status(403).json({ error: 'Access denied' });
        }
      } else if (order.userId) {
        return res.status(403).json({ error: 'Access denied' });
      }

      res.json(order);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching order' });
    }
  },

  createOrder: async (req: Request, res: Response) => {
    try {
      const { items, shippingAddress, paymentMethod, guestEmail, guestName, promoCode } = req.body;

      if (!items || !Array.isArray(items) || items.length === 0) {
        return res.status(400).json({ error: 'Order must contain at least one item' });
      }
      if (!shippingAddress) {
        return res.status(400).json({ error: 'Shipping address is required' });
      }
      if (!paymentMethod) {
        return res.status(400).json({ error: 'Payment method is required' });
      }

      const user = (req as any).user;
      if (!user && !guestEmail) {
        return res.status(400).json({ error: 'Guest email is required for guest checkout' });
      }

      // Validate products exist and have sufficient stock; use DB prices
      const validatedItems = [];
      for (const item of items) {
        const product = await Product.findById(item.productId);
        if (!product) {
          return res.status(400).json({ error: `Product not found: ${item.productId}` });
        }
        if (product.stock < item.quantity) {
          return res.status(400).json({
            error: `Insufficient stock for "${product.name}". Available: ${product.stock}`,
          });
        }
        validatedItems.push({
          productId: product._id,
          name: product.name,
          price: product.price,
          quantity: item.quantity,
          options: {
            materials: item.options?.materials || '',
            customization: item.options?.customization || '',
          },
        });
      }

      let totalAmount = validatedItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

      let discountAmount = 0;
      if (promoCode) {
        const discount = PROMO_CODES[promoCode.toUpperCase()];
        if (!discount) {
          return res.status(400).json({ error: 'Invalid promo code' });
        }
        discountAmount = totalAmount * discount;
        totalAmount -= discountAmount;
      }

      // Atomically decrement stock — abort if any product is oversold
      for (const item of validatedItems) {
        const result = await Product.findOneAndUpdate(
          { _id: item.productId, stock: { $gte: item.quantity } },
          { $inc: { stock: -item.quantity } },
          { new: true }
        );
        if (!result) {
          // Rollback already-decremented items
          const idx = validatedItems.indexOf(item);
          for (let i = 0; i < idx; i++) {
            await Product.findByIdAndUpdate(validatedItems[i].productId, {
              $inc: { stock: validatedItems[i].quantity },
            });
          }
          return res.status(400).json({ error: `Item "${item.name}" went out of stock` });
        }
      }

      const order = new Order({
        userId: user?._id || null,
        guestEmail: user ? undefined : guestEmail,
        guestName: user ? undefined : guestName,
        items: validatedItems,
        totalAmount,
        shippingAddress,
        paymentMethod,
        promoCode: promoCode?.toUpperCase(),
        discountAmount,
      });

      await order.save();
      res.status(201).json(order);
    } catch (error) {
      res.status(400).json({ error: 'Error creating order' });
    }
  },

  updateOrderStatus: async (req: Request, res: Response) => {
    try {
      const { status, paymentStatus } = req.body;
      const order = await Order.findByIdAndUpdate(
        req.params.id,
        { status, paymentStatus },
        { new: true, runValidators: true }
      );

      if (!order) {
        return res.status(404).json({ error: 'Order not found' });
      }

      res.json(order);
    } catch (error) {
      res.status(400).json({ error: 'Error updating order status' });
    }
  },

  cancelOrder: async (req: Request, res: Response) => {
    try {
      const order = await Order.findById(req.params.id);

      if (!order) {
        return res.status(404).json({ error: 'Order not found' });
      }

      const user = (req as any).user;
      if (user) {
        if (user.role !== 'admin' && order.userId?.toString() !== user._id.toString()) {
          return res.status(403).json({ error: 'Access denied' });
        }
      } else if (order.userId) {
        return res.status(403).json({ error: 'Access denied' });
      }

      if (order.status !== 'pending') {
        return res.status(400).json({ error: 'Cannot cancel order in current status' });
      }

      for (const item of order.items) {
        await Product.findByIdAndUpdate(item.productId, {
          $inc: { stock: item.quantity },
        });
      }

      order.status = 'cancelled';
      await order.save();
      res.json(order);
    } catch (error) {
      res.status(500).json({ error: 'Error cancelling order' });
    }
  },
};
