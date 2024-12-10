const mongoose = require("mongoose");

// Charger les variables d'environnement pour sécuriser les identifiants
require("dotenv").config();

// Lire l'URI de connexion MongoDB à partir des variables d'environnement
const uri = process.env.MONGO_URI;

if (!uri) {
  throw new Error("MONGO_URI n'est pas défini dans le fichier .env");
}

async function connectDB() {
  try {
    // Connecter à la base de données
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connecté à MongoDB avec Mongoose !");
  } catch (error) {
    console.error("Erreur de connexion à MongoDB :", error.message);
    throw error;
  }
}

module.exports = {  connectDB };
