from fastapi import FastAPI
from database import Base, engine
from routes import router
from fastapi.middleware.cors import CORSMiddleware
app = FastAPI(title="Auth Service")


# Add CORS Middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://127.0.0.1:5500"],  # Allows all origins. Change to ["http://127.0.0.1:5500"] for specific frontend URL
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods (GET, POST, OPTIONS, etc.)
    allow_headers=["*"],  # Allows all headers
)

Base.metadata.create_all(bind=engine)

app.include_router(router)