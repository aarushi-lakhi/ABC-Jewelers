import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../models/user.model';

export const userController = {
  // Register a new user
  register: async (req: Request, res: Response) => {
    try {
      const { email, password, name } = req.body;

      // Check if user already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ error: 'Email already registered' });
      }

      // Create new user
      const user = new User({
        email,
        password,
        name,
      });

      await user.save();

      // Generate token
      const token = jwt.sign(
        { _id: user._id.toString() },
        process.env.JWT_SECRET || 'your_jwt_secret_key',
        { expiresIn: '7d' }
      );

      res.status(201).json({ user, token });
    } catch (error) {
      res.status(400).json({ error: 'Error registering user' });
    }
  },

  // Login user
  login: async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;

      // Find user
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }

      // Check password
      const isMatch = await user.comparePassword(password);
      if (!isMatch) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }

      // Generate token
      const token = jwt.sign(
        { _id: user._id.toString() },
        process.env.JWT_SECRET || 'your_jwt_secret_key',
        { expiresIn: '7d' }
      );

      res.json({ user, token });
    } catch (error) {
      res.status(400).json({ error: 'Error logging in' });
    }
  },

  // Get user profile
  getProfile: async (req: Request, res: Response) => {
    try {
      const user = await User.findById((req as any).user._id).select('-password');
      res.json(user);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching profile' });
    }
  },

  // Update user profile
  updateProfile: async (req: Request, res: Response) => {
    try {
      const updates = Object.keys(req.body);
      const allowedUpdates = ['name', 'email', 'password'];
      const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

      if (!isValidOperation) {
        return res.status(400).json({ error: 'Invalid updates' });
      }

      const user = await User.findById((req as any).user._id);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      updates.forEach((update) => (user as any)[update] = req.body[update]);
      await user.save();

      res.json(user);
    } catch (error) {
      res.status(400).json({ error: 'Error updating profile' });
    }
  },

  // Add/remove product from wishlist
  toggleWishlist: async (req: Request, res: Response) => {
    try {
      const { productId } = req.params;
      const user = await User.findById((req as any).user._id);

      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      const wishlistIndex = user.wishlist.indexOf(productId as any);
      if (wishlistIndex === -1) {
        user.wishlist.push(productId as any);
      } else {
        user.wishlist.splice(wishlistIndex, 1);
      }

      await user.save();
      res.json(user);
    } catch (error) {
      res.status(400).json({ error: 'Error updating wishlist' });
    }
  },

  // Get user's wishlist
  getWishlist: async (req: Request, res: Response) => {
    try {
      const user = await User.findById((req as any).user._id).populate('wishlist');
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      res.json(user.wishlist);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching wishlist' });
    }
  },
}; 