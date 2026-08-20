from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.auth import router as auth_router
from app.api.interview import router as interview_router
from app.api.question import router as question_router
from app.api.answer import router as answer_router
from app.api.result import router as result_router


app = FastAPI(
    title="Interview AI API",
    version="1.0.0",
)


app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(auth_router)
app.include_router(interview_router)
app.include_router(question_router)
app.include_router(answer_router)
app.include_router(result_router)


@app.get("/")
def root():
    return {
        "message": "Welcome to Interview AI API"
    }


@app.get("/health")
def health_check():
    return {
        "status": "healthy"
    }