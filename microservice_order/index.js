const express = require('express')
const mongoose = require("mongoose");

require("dotenv").config();

const app = express()
const PORT = process.env.PORT || 3000;

app.use(express.json());

mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        console.log("Connexion à MongoDB réussie");
    })
    .catch((error) => {
        console.error("Erreur lors de la connexion à MongoDB :", error);
    });

require("./routes/order.routes.js")(app)

app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`)
})
