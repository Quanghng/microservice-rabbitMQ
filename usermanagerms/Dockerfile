# Utiliser une image de base Node.js
FROM node:18

# Définir le répertoire de travail dans le conteneur
WORKDIR /app

# Copier les fichiers package.json et package-lock.json
COPY package*.json ./

# Installer les dépendances
RUN npm install

# Copier le reste de l'application dans le conteneur
COPY . .

# Exposer le port utilisé par l'application
EXPOSE 4000

# Commande pour démarrer l'application
CMD ["npm", "start"]
