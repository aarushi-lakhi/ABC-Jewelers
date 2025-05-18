import express from 'express';
import { orderController } from '../controllers/order.controller';
import { auth, adminAuth } from '../middleware/auth.middleware';

const router = express.Router();

// Protected routes
router.get('/my-orders', auth, orderController.getUserOrders);
router.get('/:id', auth, orderController.getOrderById);
router.post('/', auth, orderController.createOrder);
router.post('/:id/cancel', auth, orderController.cancelOrder);

// Admin routes
router.get('/', adminAuth, orderController.getAllOrders);
router.put('/:id/status', adminAuth, orderController.updateOrderStatus);

export const orderRoutes = router; 