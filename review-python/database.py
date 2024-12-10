from motor.motor_asyncio import AsyncIOMotorClient
import os
from dotenv import load_dotenv

load_dotenv()

MONGO_URI = os.getenv("MONGO_URI")
if MONGO_URI is None :
    print("Connexion à la base de donnée distante échoué")
    
client = AsyncIOMotorClient(MONGO_URI)
db = client["reviewsdb"]
