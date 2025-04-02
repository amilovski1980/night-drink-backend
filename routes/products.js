const express = require('express');
const router = express.Router();
const { Product } = require('../models/Product');

router.get('/', async (_, res) => {
  const products = await Product.findAll();
  res.json(products);
});

module.exports = router;
