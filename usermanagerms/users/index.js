const express = require("express");
const router = express.Router();
const User = require("../models/User");

const app = express();
app.use(express.json());



// Créer un utilisateur
router.post("/", async (req, res) => {
  const { name, email, password, role, address, phone } = req.body;
  try {
    const newUser = new User({ name, email, password, role, address, phone });
    await newUser.save();
    res.status(201).json({ message: "Utilisateur créé avec succès", user: newUser });
  } catch (err) {
    res.status(500).json({ message: "Erreur lors de la création", error: err.message });
  }
});


router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "Utilisateur non trouvé" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: "Mot de passe incorrect" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: "Erreur interne du serveur" });
  }
});

// Lire tous les utilisateurs ex:localhost:3000
router.get("/", async (req, res) => {
  try {
    const users = await User.find(); // Trouve tous les documents dans la collection `users`
    if (users.length === 0) {
      return res.status(404).json({ message: "Aucun utilisateur trouvé." }); // Gestion si la collection est vide
    }
    res.status(200).json(users); // Retourne les utilisateurs trouvés
  } catch (error) {
    console.error("Erreur lors de la récupération :", error.message);
    res.status(500).json({ message: "Erreur lors de la récupération des utilisateurs", error: error.message });
  }
});

// Lire un utilisateur par ID
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "Utilisateur non trouvé" });
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: "Erreur lors de la récupération de l'utilisateur", error: err.message });
  }
});

// Mettre à jour un utilisateur par ID
router.put("/:id", async (req, res) => {
  const { name, email, role, address, phone } = req.body;
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { name, email, role, address, phone },
      { new: true } // Retourner l'utilisateur mis à jour
    );
    if (!updatedUser) return res.status(404).json({ message: "Utilisateur non trouvé" });
    res.status(200).json({ message: "Utilisateur mis à jour avec succès", user: updatedUser });
  } catch (err) {
    res.status(500).json({ message: "Erreur lors de la mise à jour", error: err.message });
  }
});

// Supprimer un utilisateur par ID
router.delete("/:id", async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) return res.status(404).json({ message: "Utilisateur non trouvé" });
    res.status(200).json({ message: "Utilisateur supprimé avec succès", user: deletedUser });
  } catch (err) {
    res.status(500).json({ message: "Erreur lors de la suppression", error: err.message });
  }
});

module.exports = router;
