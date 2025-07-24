const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/ecommerce', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const Product = mongoose.model('Product', new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  image_url: String,
  category_id: String,
  stock_quantity: Number,
  is_featured: Boolean,
  created_at: String,
}));

const Category = mongoose.model('Category', new mongoose.Schema({
  name: String,
  description: String,
  image_url: String,
  created_at: String,
}));

const CartItem = mongoose.model('CartItem', new mongoose.Schema({
  user_id: String,
  product_id: String,
  quantity: Number,
  created_at: { type: Date, default: Date.now },
}));

app.get('/', (req, res) => {
  res.send('E-commerce API is running!');
});

app.get('/products', async (req, res) => {
  const products = await Product.find();
  // Map _id to id for frontend compatibility
  const mapped = products.map(prod => ({
    ...prod.toObject(),
    id: prod._id.toString(),
  }));
  res.json(mapped);
});

app.get('/categories', async (req, res) => {
  const categories = await Category.find();
  // Map _id to id for frontend compatibility
  const mapped = categories.map(cat => ({
    ...cat.toObject(),
    id: cat._id.toString(),
  }));
  res.json(mapped);
});

// Get all cart items for a user
app.get('/cart/:user_id', async (req, res) => {
  const { user_id } = req.params;
  const cartItems = await CartItem.find({ user_id });
  console.log('Cart items from DB:', cartItems);
  // Fetch product details for each cart item
  const itemsWithProduct = await Promise.all(
    cartItems.map(async (item) => {
      const product = await Product.findById(item.product_id);
      return {
        ...item.toObject(),
        id: item._id.toString(), // Add id field for frontend compatibility
        product: product ? { ...product.toObject(), id: product._id.toString() } : null,
      };
    })
  );
  console.log('Cart items with product:', itemsWithProduct);
  res.json(itemsWithProduct);
});

// Add or update a cart item
app.post('/cart', async (req, res) => {
  const { user_id, product_id, quantity } = req.body;
  let cartItem = await CartItem.findOne({ user_id, product_id });
  if (cartItem) {
    cartItem.quantity += quantity;
    await cartItem.save();
  } else {
    cartItem = new CartItem({ user_id, product_id, quantity });
    await cartItem.save();
  }
  res.json(cartItem);
});

// Update quantity of a cart item
app.put('/cart', async (req, res) => {
  const { user_id, product_id, quantity } = req.body;
  const cartItem = await CartItem.findOneAndUpdate(
    { user_id, product_id },
    { quantity },
    { new: true }
  );
  res.json(cartItem);
});

// Remove a cart item
app.delete('/cart', async (req, res) => {
  const { user_id, product_id } = req.body;
  await CartItem.findOneAndDelete({ user_id, product_id });
  res.json({ success: true });
});

// Debug endpoint to clear all cart items
app.delete('/cart-all', async (req, res) => {
  await CartItem.deleteMany({});
  res.json({ success: true, message: 'All cart items deleted.' });
});

app.listen(5000, () => console.log('Server running on port 5000')); 