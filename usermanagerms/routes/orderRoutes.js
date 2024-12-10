const express = require('express');
const router = express.Router();
const authMiddleware = require("./../middlewares/auth"); // Middleware pour authentification
const Order = require('../models/Order'); 

router.get('/history/:userId', async (req, res) => {
  const { userId } = req.params;
  try {
    const orders = await Order.find({ userId }).sort({ createdAt: -1 }); 
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json({ message: 'Erreur lors de la récupération de l\'historique des commandes', error: err.message });
  }
});

// Ajouter une commande
router.post("/", authMiddleware, async (req, res) => {
    const { products } = req.body;
  
    // Vérification des données
    if (!products || !Array.isArray(products) || products.length === 0) {
      return res.status(400).json({ message: "Les produits de la commande sont requis." });
    }
  
    try {
      // Créer une nouvelle commande
      const newOrder = new Order({
        userId: req.user.id, // ID de l'utilisateur extrait du token JWT
        products,
      });
  
      // Sauvegarde de la commande dans la base de données
      await newOrder.save();
      res.status(201).json({ message: "Commande ajoutée avec succès", order: newOrder });
    } catch (error) {
      console.error("Erreur lors de l'ajout de la commande :", error.message);
      res.status(500).json({ message: "Erreur interne du serveur" });
    }
  });

module.exports = router;
