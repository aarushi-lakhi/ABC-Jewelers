import express from 'express';
import { orderController } from '../controllers/order.controller';
import { auth, optionalAuth, adminAuth } from '../middleware/auth.middleware';

const router = express.Router();

// Guest-or-authenticated order creation
router.post('/', optionalAuth, orderController.createOrder);

// Protected routes (require login)
router.get('/my-orders', auth, orderController.getUserOrders);
router.get('/:id', optionalAuth, orderController.getOrderById);
router.post('/:id/cancel', optionalAuth, orderController.cancelOrder);

// Admin routes
router.get('/', adminAuth, orderController.getAllOrders);
router.put('/:id/status', adminAuth, orderController.updateOrderStatus);

export const orderRoutes = router;
