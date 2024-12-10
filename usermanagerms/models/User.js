const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      default: "client", // Exemple de valeur par défaut
    },
    address: {
      type: String,
    },
    phone: {
      type: String,
      required: true,
      match: /^[0-9]{10}$/, // Validation pour les numéros à 10 chiffres
    },
  },
  {
    timestamps: true, // Ajoute automatiquement createdAt et updatedAt
    versionKey: false // Désactive le champ __v
  }
);

const User = mongoose.model("User", UserSchema);

module.exports = User;
