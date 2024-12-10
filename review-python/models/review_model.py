from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime

class ReviewModel(BaseModel):
    productId: str
    userId: str
    rating: int = Field(..., ge=1, le=5)  # Min: 1, Max: 5
    comment: Optional[str]
    createdAt: datetime = Field(default_factory=datetime.utcnow)
