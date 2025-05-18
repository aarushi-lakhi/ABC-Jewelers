import express from 'express';
import { productController } from '../controllers/product.controller';
import { auth, adminAuth } from '../middleware/auth.middleware';

const router = express.Router();

// Public routes
router.get('/', productController.getAllProducts);
router.get('/:id', productController.getProductById);

// Protected routes
router.post('/:id/reviews', auth, productController.addReview);

// Admin routes
router.post('/', adminAuth, productController.createProduct);
router.put('/:id', adminAuth, productController.updateProduct);
router.delete('/:id', adminAuth, productController.deleteProduct);

export const productRoutes = router; 