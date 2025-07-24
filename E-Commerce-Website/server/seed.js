const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/ecommerce', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const Category = mongoose.model('Category', new mongoose.Schema({
  name: String,
  description: String,
  image_url: String,
  created_at: String,
}));

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

async function seed() {
  await Category.deleteMany({});
  await Product.deleteMany({});

  const categories = await Category.insertMany([
    {
      name: 'Electronics',
      description: 'Electronic gadgets and devices',
      image_url: null,
      created_at: new Date().toISOString(),
    },
    {
      name: 'Clothing',
      description: 'Apparel and accessories',
      image_url: null,
      created_at: new Date().toISOString(),
    },
  ]);

  const products = await Product.insertMany([
    {
      name: 'Smartphone',
      description: 'Latest model smartphone',
      price: 14999,
      image_url: 'https://m.media-amazon.com/images/I/71SVRdsgY-L._UF1000,1000_QL80_.jpg',
      category_id: categories[0]._id.toString(),
      stock_quantity: 10,
      is_featured: true,
      created_at: new Date().toISOString(),
    },
    {
      name: 'T-Shirt',
      description: 'Comfortable cotton t-shirt',
      price: 299,
      image_url: 'https://nobero.com/cdn/shop/files/og.jpg?v=1744007258',
      category_id: categories[1]._id.toString(),
      stock_quantity: 50,
      is_featured: false,
      created_at: new Date().toISOString(),
    },
    {
      name: 'Laptop',
      description: 'High performance laptop for work and play',
      price: 59000,
      image_url: 'https://m.media-amazon.com/images/I/71DozMyPCBL.jpg',
      category_id: categories[0]._id.toString(),
      stock_quantity: 15,
      is_featured: true,
      created_at: new Date().toISOString(),
    },
    {
      name: 'Jeans',
      description: 'Stylish blue jeans',
      price: 499,
      image_url: 'https://xcdn.next.co.uk/common/items/default/default/itemimages/3_4Ratio/product/lge/D94453s5.jpg?im=Resize,width=750',
      category_id: categories[1]._id.toString(),
      stock_quantity: 40,
      is_featured: false,
      created_at: new Date().toISOString(),
    },
    {
      name: 'Headphones',
      description: 'Noise-cancelling over-ear headphones',
      price: 799,
      image_url: 'https://m.media-amazon.com/images/I/51ZR4lyxBHL._UF1000,1000_QL80_.jpg',
      category_id: categories[0]._id.toString(),
      stock_quantity: 25,
      is_featured: true,
      created_at: new Date().toISOString(),
    },
    {
      name: 'Jacket',
      description: 'Warm winter jacket',
      price: 899,
      image_url: 'https://images-cdn.ubuy.co.in/65622f1d73a1de12da0ed0cf-tacvasen-men-39-s-jackets-bomber.jpg',
      category_id: categories[1]._id.toString(),
      stock_quantity: 20,
      is_featured: false,
      created_at: new Date().toISOString(),
    },
    {
      name: 'IWatch',
      description: 'Premium IWatch with health tracking',
      price: 29999,
      image_url: 'https://m.media-amazon.com/images/I/71EoGntO5bL._UF1000,1000_QL80_.jpg',
      category_id: categories[1]._id.toString(),
      stock_quantity: 20,
      is_featured: false,
      created_at: new Date().toISOString(),
    },
    {
      name: 'Peshwai Kurta',
      description: 'Traditional Indian kurta for festive occasions',
      price: 3499,
      image_url: 'https://sareesbazaar.com/cdn/shop/products/SB24_KS11KP_1213.jpg?v=1741318692',
      category_id: categories[1]._id.toString(),
      stock_quantity: 20,
      is_featured: true,
      created_at: new Date().toISOString(),
    },
  ]);

  console.log('Database seeded!');
  mongoose.disconnect();
}

seed(); 