const express = require('express');
const router = express.Router();
const { Delivery } = require('../models/Delivery');
const { Order } = require('../models/Order');
const { authenticate } = require('../middleware/auth');

router.post('/assign', authenticate, async (req, res) => {
  if (req.user.role !== 'admin') return res.status(403).json({ error: 'Accès refusé' });

  const { orderId, deliveryGuyId } = req.body;

  const order = await Order.findByPk(orderId);
  if (!order) return res.status(404).json({ error: 'Commande non trouvée' });

  const delivery = await Delivery.create({
    orderId,
    deliveryGuyId,
    status: 'assigned'
  });

  order.status = 'en_livraison';
  await order.save();

  res.status(200).json({ message: 'Livreur assigné', delivery });
});

router.post('/update-location', authenticate, async (req, res) => {
  if (req.user.role !== 'livreur') return res.status(403).json({ error: 'Uniquement livreur' });

  const { lat, lng } = req.body;
  const delivery = await Delivery.findOne({ where: { deliveryGuyId: req.user.id, status: 'assigned' } });

  if (!delivery) return res.status(404).json({ error: 'Pas de livraison active' });

  delivery.location = { lat, lng };
  await delivery.save();

  res.status(200).json({ message: 'Localisation mise à jour' });
});

module.exports = router;
