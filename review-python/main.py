from fastapi import FastAPI
from routes.review_routes import router as review_router
import uvicorn

app = FastAPI()

app.include_router(review_router, prefix="/api/reviews", tags=["Reviews"])

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=3556, reload=True)
