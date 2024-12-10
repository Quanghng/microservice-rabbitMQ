# UserManagerMS

## Description
UserManagerMS est un projet conçu pour gérer des utilisateurs via un ensemble de microservices intégrés. Il met en œuvre une architecture de microservices, une passerelle API, un courtier de messages pour la communication interservices, et un modèle de sécurité basé sur JWT.

## Fonctionnalités
- **Gestion des utilisateurs** : CRUD (Créer, Lire, Mettre à jour, Supprimer) pour les utilisateurs.
- **Authentification et Autorisation** : Utilisation de JWT pour sécuriser les API.
- **Communication entre services** : Message broker pour la communication asynchrone.
- **Déploiement facile** : Support pour Docker et CI/CD.

## Prérequis
- **Node.js** (ou tout autre langage utilisé pour un des microservices)
- **Docker** et Docker Compose
- Un outil comme Postman pour tester les API.

## Installation
1. Clone le dépôt :
   ```bash
   git clone https://gitlab.com/dktmody/usermanagerms.git
   cd usermanagerms
