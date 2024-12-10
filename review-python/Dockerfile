# Utilise une image officielle de Python
FROM python:3.11-slim

# Définit le répertoire de travail dans le conteneur
WORKDIR /app

# Copie les fichiers nécessaires dans le conteneur
COPY . /app/

# Installe les dépendances
RUN pip install fastapi uvicorn pydantic pymongo python-dotenv motor

EXPOSE 3556

# Commande pour lancer l'application FastAPI
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "3556", "--reload"]
