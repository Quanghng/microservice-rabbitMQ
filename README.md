# Microservice-projet

Groupe 7 : Mathis OUDJANE, Jules DUARTES, Mody DIAKHITE, Minh-Quang HOANG, Callicles BAZOLO

### Setup project : 

- Créer un .env à la racine du projet avec les variables d'environnement Java et Python : 

```properties
SPRING_DATA_MONGODB_URI=lien vers la db mongo distante
MONGO_URI=lien vers la db mongo distante
```


ajouter un .env à la racine de Microservice_order
```properties
MONGO_URI=lien vers la db mongo distante
```

ajouter un .env à la racine de Microservice review
```properties
MONGO_URI=lien vers la db mongo distante
```

ajouter un .env à la racine de Microservice user
```properties
MONGO_URI=lien vers la db mongo distante
PORT=4000
JWT_SECRET=le jwt
```


- Naviguer dans les microservices et lancer la commande suivante pour chaque microservices : 

```shell
docker compose up
```
pour voir les messages échangés avec RabbitMQ: 

- Créer un utilisateur et ajouter une nouvelle commande pour voir l'engistrement de la commande à la base de données

- Ajouter une nouvelle commande avec un mauvais nom d'utilisateur pour voir la validation échouée et la suppresion de la commande 

Lien vers les différentes endpoints :
- http://localhost/dashboard/

Microservice poduct : http://localhost/product/swagger-ui/index.html
Review : http://localhost/product/swagger-ui/index.html
