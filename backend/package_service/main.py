from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from database import Base, engine
from routes import router as subscription_router

# Create DB tables
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="BillMate Subscription Service",
    description="Handles packages and subscriptions",
    version="1.0.0"
)

# Enable CORS (for frontend calls)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # you can restrict later
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Include routes
app.include_router(subscription_router)


@app.get("/")
def root():
    return {"message": "Subscription Service is running"}
