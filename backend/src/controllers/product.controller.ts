import { Request, Response } from 'express';
import { Product } from '../models/product.model';

export const productController = {
  // Get all products with optional filtering
  getAllProducts: async (req: Request, res: Response) => {
    try {
      const { category, featured, new: isNew, sortBy, minPrice, maxPrice } = req.query;
      const query: any = {};

      if (category) query.category = category;
      if (featured) query.featured = featured === 'true';
      if (isNew) query.new = isNew === 'true';
      if (minPrice || maxPrice) {
        query.price = {};
        if (minPrice) query.price.$gte = Number(minPrice);
        if (maxPrice) query.price.$lte = Number(maxPrice);
      }

      let sort: any = {};
      switch (sortBy) {
        case 'price-low':
          sort = { price: 1 };
          break;
        case 'price-high':
          sort = { price: -1 };
          break;
        case 'newest':
          sort = { createdAt: -1 };
          break;
        default:
          sort = { featured: -1 };
      }

      const products = await Product.find(query).sort(sort);
      res.json(products);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching products' });
    }
  },

  // Get a single product by ID
  getProductById: async (req: Request, res: Response) => {
    try {
      const product = await Product.findById(req.params.id);
      if (!product) {
        return res.status(404).json({ error: 'Product not found' });
      }
      res.json(product);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching product' });
    }
  },

  // Create a new product (admin only)
  createProduct: async (req: Request, res: Response) => {
    try {
      const product = new Product(req.body);
      await product.save();
      res.status(201).json(product);
    } catch (error) {
      res.status(400).json({ error: 'Error creating product' });
    }
  },

  // Update a product (admin only)
  updateProduct: async (req: Request, res: Response) => {
    try {
      const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
      });
      if (!product) {
        return res.status(404).json({ error: 'Product not found' });
      }
      res.json(product);
    } catch (error) {
      res.status(400).json({ error: 'Error updating product' });
    }
  },

  // Delete a product (admin only)
  deleteProduct: async (req: Request, res: Response) => {
    try {
      const product = await Product.findByIdAndDelete(req.params.id);
      if (!product) {
        return res.status(404).json({ error: 'Product not found' });
      }
      res.json({ message: 'Product deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Error deleting product' });
    }
  },

  // Add a review to a product
  addReview: async (req: Request, res: Response) => {
    try {
      const { rating, comment } = req.body;
      const product = await Product.findById(req.params.id);
      
      if (!product) {
        return res.status(404).json({ error: 'Product not found' });
      }

      product.reviews.push({
        userId: (req as any).user._id,
        name: (req as any).user.name,
        rating,
        comment,
        date: new Date(),
      });

      await product.save();
      res.status(201).json(product);
    } catch (error) {
      res.status(400).json({ error: 'Error adding review' });
    }
  },
}; 