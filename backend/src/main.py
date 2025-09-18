from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from src.words.router import router as words_router

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",  # Vite dev server
        "https://rate-den-artikel.vercel.app",  # Production frontend
    ],
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(words_router)


@app.get("/health")
def health_check():
    """Simple health check endpoint."""
    return {"status": "healthy"}
