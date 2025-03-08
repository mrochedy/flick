from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from src.core import engine, Base
from src.api import notes_router

Base.metadata.create_all(bind=engine)

app = FastAPI(title="Flick API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(notes_router)


@app.get("/")
def read_root():
    return {"message": "Welcome to the Flick API"}
