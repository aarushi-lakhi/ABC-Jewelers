import express from 'express';
import { userController } from '../controllers/user.controller';
import { auth } from '../middleware/auth.middleware';

const router = express.Router();

// Public routes
router.post('/register', userController.register);
router.post('/login', userController.login);

// Protected routes
router.get('/profile', auth, userController.getProfile);
router.put('/profile', auth, userController.updateProfile);
router.get('/wishlist', auth, userController.getWishlist);
router.post('/wishlist/:productId', auth, userController.toggleWishlist);

export const userRoutes = router; 