# Étape 1 : Utiliser une image Maven avec OpenJDK pour construire le WAR
FROM maven:3.9.9-eclipse-temurin-21 AS build
WORKDIR /app

# Copier les fichiers Maven et le code source dans le conteneur
COPY pom.xml .
COPY src ./src

# Construire le projet et générer le fichier WAR
RUN mvn clean package -DskipTests

# Étape 2 : Utiliser Amazon Corretto 21 pour exécuter le WAR
FROM amazoncorretto:21
WORKDIR /app

# Copier le fichier WAR généré dans l'image
COPY --from=build /app/target/*.war app.war

# Exposer le port 8080 pour accéder à l'application
EXPOSE 8080

# Commande pour exécuter l'application
ENTRYPOINT ["java", "-jar", "app.war"]