const jwt = require("jsonwebtoken");

// Middleware pour vérifier l'authentification
function authMiddleware(req, res, next) {
  const token = req.header("Authorization");
  if (!token) {
    return res.status(401).json({ message: "Accès refusé. Aucun token fourni." });
  }

  try {
    // Vérifie et décode le token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    console.error("Erreur lors de la vérification du token :", error.message); 
    res.status(400).json({ message: "Token invalide.", error: error.message });
  }
}

module.exports = authMiddleware;
