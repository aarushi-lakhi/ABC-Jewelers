import express from 'express';
import { stripeController } from '../controllers/stripe.controller';
import { optionalAuth } from '../middleware/auth.middleware';

const router = express.Router();

router.post('/create-checkout-session', optionalAuth, stripeController.createCheckoutSession);

// Webhook needs raw body for signature verification
router.post('/webhook', express.raw({ type: 'application/json' }), stripeController.handleWebhook);

export const stripeRoutes = router;
