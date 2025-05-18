import { Request, Response } from 'express';
import { Order } from '../models/order.model';
import { Product } from '../models/product.model';

export const orderController = {
  // Get all orders (admin only)
  getAllOrders: async (req: Request, res: Response) => {
    try {
      const orders = await Order.find().populate('userId', 'name email');
      res.json(orders);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching orders' });
    }
  },

  // Get orders for the current user
  getUserOrders: async (req: Request, res: Response) => {
    try {
      const orders = await Order.find({ userId: (req as any).user._id });
      res.json(orders);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching user orders' });
    }
  },

  // Get a single order
  getOrderById: async (req: Request, res: Response) => {
    try {
      const order = await Order.findById(req.params.id);
      if (!order) {
        return res.status(404).json({ error: 'Order not found' });
      }

      // Check if user is admin or the order belongs to them
      if ((req as any).user.role !== 'admin' && order.userId.toString() !== (req as any).user._id.toString()) {
        return res.status(403).json({ error: 'Access denied' });
      }

      res.json(order);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching order' });
    }
  },

  // Create a new order
  createOrder: async (req: Request, res: Response) => {
    try {
      const { items, shippingAddress, paymentMethod } = req.body;

      // Calculate total amount
      const totalAmount = items.reduce((total: number, item: any) => {
        return total + item.price * item.quantity;
      }, 0);

      // Create order
      const order = new Order({
        userId: (req as any).user._id,
        items,
        totalAmount,
        shippingAddress,
        paymentMethod,
      });

      // Update product stock
      for (const item of items) {
        await Product.findByIdAndUpdate(item.productId, {
          $inc: { stock: -item.quantity },
        });
      }

      await order.save();
      res.status(201).json(order);
    } catch (error) {
      res.status(400).json({ error: 'Error creating order' });
    }
  },

  // Update order status (admin only)
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

  // Cancel order
  cancelOrder: async (req: Request, res: Response) => {
    try {
      const order = await Order.findById(req.params.id);

      if (!order) {
        return res.status(404).json({ error: 'Order not found' });
      }

      // Check if user is admin or the order belongs to them
      if ((req as any).user.role !== 'admin' && order.userId.toString() !== (req as any).user._id.toString()) {
        return res.status(403).json({ error: 'Access denied' });
      }

      // Only allow cancellation if order is pending
      if (order.status !== 'pending') {
        return res.status(400).json({ error: 'Cannot cancel order in current status' });
      }

      // Restore product stock
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