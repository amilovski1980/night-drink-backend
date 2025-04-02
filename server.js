require('dotenv').config();
const express = require('express');
const cors = require('cors');
const db = require('./config/db');

const authRoutes = require('./routes/auth');
const productRoutes = require('./routes/products');
const orderRoutes = require('./routes/orders');
const deliveryRoutes = require('./routes/delivery');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/delivery', deliveryRoutes);

app.get('/', (_, res) => {
  res.send('Night Drink API 🍾 is running!');
});

db.sync()
  .then(() => console.log('✅ DB Synced'))
  .catch(err => console.error('❌ Sync error:', err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
