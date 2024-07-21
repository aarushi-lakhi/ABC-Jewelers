const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

let products = [
  { id: 1, name: 'Gold Ring', description: '24K Gold Ring', price: 300, image: 'link-to-image' },
  { id: 2, name: 'Silver Necklace', description: 'Pure Silver Necklace', price: 150, image: 'link-to-image' },
  // Add more products as needed
];

app.get('/api/products', (req, res) => {
  res.json(products);
});

app.get('/api/products/:id', (req, res) => {
  const product = products.find(p => p.id == req.params.id);
  if (product) {
    res.json(product);
  } else {
    res.status(404).send('Product not found');
  }
});

app.post('/api/cart', (req, res) => {
  const { product } = req.body;
  // Process the cart logic, e.g., save to database
  res.status(200).send('Product added to cart');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
