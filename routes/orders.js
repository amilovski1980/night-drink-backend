const express = require('express');
const router = express.Router();
const { Order } = require('../models/Order');
const { authenticate } = require('../middleware/auth');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

router.post('/', authenticate, async (req, res) => {
  const { products, address, totalAmount, paymentMethodId } = req.body;

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: parseInt(totalAmount * 100),
      currency: 'eur',
      payment_method: paymentMethodId,
      confirm: true,
    });

    const order = await Order.create({
      userId: req.user.id,
      address,
      products,
      total: totalAmount,
      status: 'en_attente',
      paymentId: paymentIntent.id,
    });

    res.status(201).json({ message: 'Commande créée', order });
  } catch (err) {
    res.status(400).json({ error: 'Paiement échoué' });
  }
});

router.get('/:id', authenticate, async (req, res) => {
  const order = await Order.findOne({ where: { id: req.params.id, userId: req.user.id } });
  if (!order) return res.status(404).json({ error: 'Commande non trouvée' });
  res.json(order);
});

module.exports = router;
