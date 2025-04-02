const axios = require('axios');
const { Product } = require('../models/Product');

async function syncWooProducts() {
  const res = await axios.get(`${process.env.WC_URL}/wp-json/wc/v3/products`, {
    auth: {
      username: process.env.WC_KEY,
      password: process.env.WC_SECRET,
    }
  });

  const products = res.data;
  for (let p of products) {
    await Product.upsert({
      id: p.id,
      name: p.name,
      price: p.price,
      image: p.images[0]?.src || '',
    });
  }

  console.log('✅ WooCommerce sync done');
}

module.exports = syncWooProducts;
