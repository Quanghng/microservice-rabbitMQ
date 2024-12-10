const express = require("express");
const router = express.Router();

// Middleware pour vérifier le JWT
const authMiddleware = require("./../middlewares/auth");

const User = require("./../models/User");

// Récupérer les informations du profil
router.get("/", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Erreur interne du serveur" });
  }
});

// Mettre à jour le profil utilisateur
router.put("/", authMiddleware, async (req, res) => {
  const updates = req.body;

  try {
    const user = await User.findByIdAndUpdate(req.user.id, updates, { new: true }).select("-password");
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Erreur interne du serveur" });
  }
});

module.exports = router;
