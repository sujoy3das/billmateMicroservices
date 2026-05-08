from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from database import Base, engine
from routes import router as company_service_router

# Create DB tables
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="BillMate Company Service",
    description="Handles company creation and management",
    version="1.0.0"
)

# Enable CORS (for frontend calls)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # restrict later in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routes
app.include_router(company_service_router)


@app.get("/")
def root():
    return {"message": "Company Service is running"}
