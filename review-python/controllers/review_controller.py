from fastapi import HTTPException
from database import db
from models import review_model
from bson import ObjectId
import json
from datetime import datetime as dt  # Import explicite pour clarifier l'usage

class JSONEncoder(json.JSONEncoder):
    def default(self, o):
        if isinstance(o, ObjectId):
            return str(o)
        if isinstance(o, dt):  # Vérifie spécifiquement `datetime.datetime`
            return o.isoformat()  # Convertit datetime en chaîne ISO 8601
        return super().default(o)

# Ajouter un avis
async def add_review(review: review_model):
    try:
        # Validation optionnelle supplémentaire si nécessaire
        if review.rating < 1 or review.rating > 5:
            raise HTTPException(status_code=400, detail="Rating must be between 1 and 5")
        
        result = await db["reviews"].insert_one(review.dict())
        if result.inserted_id:
            return {"message": "Review added", "id": str(result.inserted_id)}
        raise HTTPException(status_code=500, detail="Error adding review")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error processing review: {str(e)}")

# Supprimer un avis
async def delete_review(review_id: str):
    if not ObjectId.is_valid(review_id):
        raise HTTPException(status_code=400, detail="Invalid review ID")

    result = await db["reviews"].delete_one({"_id": ObjectId(review_id)})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Review not found")
    return {"message": "Review deleted"}

# Récupérer les avis d'un produit
async def get_reviews(product_id: str):
    try:
        reviews_cursor = db["reviews"].find({"productId": product_id})
        reviews = await reviews_cursor.to_list(None)

        # Encode les résultats en JSON avec JSONEncoder
        reviews_json = JSONEncoder().encode(reviews)

        # Calcule la note moyenne
        average_rating = (
            sum(review["rating"] for review in reviews) / len(reviews)
            if reviews else 0
        )

        return {
            "reviews": json.loads(reviews_json),  # Décodage pour retourner un dict
            "averageRating": average_rating,
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Erreur serveur : {str(e)}")