import { Request, Response } from 'express';
import Stripe from 'stripe';
import { Order } from '../models/order.model';

const getStripe = (): Stripe => {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key || key === 'sk_test_REPLACE_ME') {
    throw new Error('STRIPE_SECRET_KEY is not configured');
  }
  return new Stripe(key);
};

export const stripeController = {
  createCheckoutSession: async (req: Request, res: Response) => {
    try {
      const stripe = getStripe();
      const { orderId, successUrl, cancelUrl } = req.body;

      if (!orderId || !successUrl || !cancelUrl) {
        return res.status(400).json({ error: 'orderId, successUrl, and cancelUrl are required' });
      }

      const order = await Order.findById(orderId);
      if (!order) {
        return res.status(404).json({ error: 'Order not found' });
      }

      if (order.paymentStatus === 'completed') {
        return res.status(400).json({ error: 'Order already paid' });
      }

      const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = order.items.map((item) => ({
        price_data: {
          currency: 'usd',
          product_data: {
            name: item.name,
          },
          unit_amount: Math.round(item.price * 100),
        },
        quantity: item.quantity,
      }));

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: lineItems,
        mode: 'payment',
        success_url: successUrl,
        cancel_url: cancelUrl,
        metadata: {
          orderId: order._id.toString(),
        },
        customer_email: order.guestEmail || undefined,
      });

      order.stripeSessionId = session.id;
      await order.save();

      res.json({ url: session.url, sessionId: session.id });
    } catch (error: any) {
      if (error.message?.includes('not configured')) {
        return res.status(503).json({ error: 'Payment processing is not configured yet' });
      }
      console.error('Stripe session error:', error);
      res.status(500).json({ error: 'Failed to create checkout session' });
    }
  },

  handleWebhook: async (req: Request, res: Response) => {
    try {
      const stripe = getStripe();
      const sig = req.headers['stripe-signature'] as string;
      const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

      if (!webhookSecret || webhookSecret === 'whsec_REPLACE_ME') {
        return res.status(503).json({ error: 'Webhook secret not configured' });
      }

      let event: Stripe.Event;
      try {
        event = stripe.webhooks.constructEvent(req.body, sig, webhookSecret);
      } catch {
        return res.status(400).json({ error: 'Invalid webhook signature' });
      }

      if (event.type === 'checkout.session.completed') {
        const session = event.data.object as Stripe.Checkout.Session;
        const orderId = session.metadata?.orderId;

        if (orderId) {
          await Order.findByIdAndUpdate(orderId, {
            paymentStatus: 'completed',
            status: 'processing',
            stripeSessionId: session.id,
          });
        }
      }

      res.json({ received: true });
    } catch (error) {
      console.error('Webhook error:', error);
      res.status(500).json({ error: 'Webhook processing failed' });
    }
  },
};
