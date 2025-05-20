"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderController = void 0;
const order_model_1 = require("../models/order.model");
const product_model_1 = require("../models/product.model");
exports.orderController = {
    // Get all orders (admin only)
    getAllOrders: async (req, res) => {
        try {
            const orders = await order_model_1.Order.find().populate('userId', 'name email');
            res.json(orders);
        }
        catch (error) {
            res.status(500).json({ error: 'Error fetching orders' });
        }
    },
    // Get orders for the current user
    getUserOrders: async (req, res) => {
        try {
            const orders = await order_model_1.Order.find({ userId: req.user._id });
            res.json(orders);
        }
        catch (error) {
            res.status(500).json({ error: 'Error fetching user orders' });
        }
    },
    // Get a single order
    getOrderById: async (req, res) => {
        try {
            const order = await order_model_1.Order.findById(req.params.id);
            if (!order) {
                return res.status(404).json({ error: 'Order not found' });
            }
            // Check if user is admin or the order belongs to them
            if (req.user.role !== 'admin' && order.userId.toString() !== req.user._id.toString()) {
                return res.status(403).json({ error: 'Access denied' });
            }
            res.json(order);
        }
        catch (error) {
            res.status(500).json({ error: 'Error fetching order' });
        }
    },
    // Create a new order
    createOrder: async (req, res) => {
        try {
            const { items, shippingAddress, paymentMethod } = req.body;
            // Calculate total amount
            const totalAmount = items.reduce((total, item) => {
                return total + item.price * item.quantity;
            }, 0);
            // Create order
            const order = new order_model_1.Order({
                userId: req.user._id,
                items,
                totalAmount,
                shippingAddress,
                paymentMethod,
            });
            // Update product stock
            for (const item of items) {
                await product_model_1.Product.findByIdAndUpdate(item.productId, {
                    $inc: { stock: -item.quantity },
                });
            }
            await order.save();
            res.status(201).json(order);
        }
        catch (error) {
            res.status(400).json({ error: 'Error creating order' });
        }
    },
    // Update order status (admin only)
    updateOrderStatus: async (req, res) => {
        try {
            const { status, paymentStatus } = req.body;
            const order = await order_model_1.Order.findByIdAndUpdate(req.params.id, { status, paymentStatus }, { new: true, runValidators: true });
            if (!order) {
                return res.status(404).json({ error: 'Order not found' });
            }
            res.json(order);
        }
        catch (error) {
            res.status(400).json({ error: 'Error updating order status' });
        }
    },
    // Cancel order
    cancelOrder: async (req, res) => {
        try {
            const order = await order_model_1.Order.findById(req.params.id);
            if (!order) {
                return res.status(404).json({ error: 'Order not found' });
            }
            // Check if user is admin or the order belongs to them
            if (req.user.role !== 'admin' && order.userId.toString() !== req.user._id.toString()) {
                return res.status(403).json({ error: 'Access denied' });
            }
            // Only allow cancellation if order is pending
            if (order.status !== 'pending') {
                return res.status(400).json({ error: 'Cannot cancel order in current status' });
            }
            // Restore product stock
            for (const item of order.items) {
                await product_model_1.Product.findByIdAndUpdate(item.productId, {
                    $inc: { stock: item.quantity },
                });
            }
            order.status = 'cancelled';
            await order.save();
            res.json(order);
        }
        catch (error) {
            res.status(500).json({ error: 'Error cancelling order' });
        }
    },
};
