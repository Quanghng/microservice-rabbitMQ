from fastapi import APIRouter
from controllers.review_controller import add_review, get_reviews, delete_review
from models.review_model import ReviewModel

router = APIRouter()

@router.post("/", response_model=dict)
async def create_review(review: ReviewModel):
    return await add_review(review)

@router.get("/{product_id}", response_model=dict)
async def fetch_reviews(product_id: str):
    return await get_reviews(product_id)

@router.delete("/{id}", response_model=dict)
async def remove_review(id: str):
    return await delete_review(id)
