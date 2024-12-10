const express = require("express");
const { connectDB } = require("./config"); // Importer la configuration MongoDB
const { consumeMessages } = require("./services/mqService");
const usersRoutes = require("./users/index");
const orderRoutes = require("./routes/orderRoutes"); // Adjust the path

const loginRoute = require("./users/login");
const profileRoute = require("./users/profile");
const registerRoute = require("./users/register");

const app = express();
app.use(express.json());
app.use("/login", loginRoute);
app.use("/profile", profileRoute);
app.use("/register", registerRoute);
app.use("/orders", orderRoutes);

require("dotenv").config();

app.use((req, res, next) => {
  console.log(`Requête reçue : ${req.method} ${req.url}`);
  console.log("Corps de la requête :", req.body);
  next();
});
// Connexion à MongoDB
connectDB();

// RabbitMQ
consumeMessages()

app.use("/users", usersRoutes);

// Exemple de route
app.get("/", (req, res) => {
  res.send("Bienvenue dans le micro service : gestion des utilisateurs");
});

// Démarrer le serveur
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Serveur en cours d'exécution sur le port ${PORT}`);
});

// Fermer la connexion MongoDB lors de l'arrêt de l'application
process.on("SIGINT", async () => {
  console.log("Fermeture de l'application...");
  console.log("Connexion MongoDB fermée.");
  process.exit(0); // Terminer l'application proprement
});
