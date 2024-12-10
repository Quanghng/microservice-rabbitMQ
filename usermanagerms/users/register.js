const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const { body, validationResult } = require("express-validator");

const User = require("./../models/User");

router.post(
  "/",
  [
    // Validation des données d'entrée
    body("name").notEmpty().withMessage("Le nom est requis."),
    body("email").isEmail().withMessage("L'email fourni n'est pas valide."),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Le mot de passe doit contenir au moins 6 caractères."),
    body("role").notEmpty().withMessage("Le rôle est requis."),
    body("address").notEmpty().withMessage("L'adresse est requise."),
    body("phone")
      .matches(/^[0-9]{10}$/)
      .withMessage("Le numéro de téléphone doit contenir 10 chiffres."),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password, role, address, phone } = req.body;

    try {
      // Vérifier si l'utilisateur existe déjà
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res
          .status(400)
          .json({ message: "Un utilisateur avec cet email existe déjà." });
      }

      // Hacher le mot de passe
      const hashedPassword = await bcrypt.hash(password, 10);

      // Créer un nouvel utilisateur
      const newUser = new User({
        name,
        email,
        password: hashedPassword,
        role,
        address,
        phone,
      });
      await newUser.save();

      // Réponse réussie
      res.status(201).json({ message: "Utilisateur créé avec succès" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Erreur interne du serveur" });
    }
  }
);

module.exports = router;
