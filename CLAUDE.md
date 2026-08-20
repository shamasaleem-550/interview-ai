# InterviewAI — Claude Project Context

## Project Status

This repository contains InterviewAI Phase 2A.

Phase 2A is the current master version of the project. Do not revert to the older Phase 1 project unless explicitly asked.

The project is an AI-powered mock interview application with a React frontend and FastAPI backend.

## Current Phase 2A Functionality

The following end-to-end flow is currently implemented:

1. User opens Create Interview.
2. Interview creation form is submitted to the FastAPI backend.
3. A guest candidate session is automatically created for local testing.
4. The interview is persisted in PostgreSQL.
5. Gemini generates the requested number of interview questions.
6. Generated questions are persisted in PostgreSQL.
7. Interview Setup loads the persisted interview and generated questions through the API.
8. Mock Interview displays the generated questions instead of the previous hard-coded question list.

## Technology Stack

### Frontend
- React
- Vite
- JavaScript/JSX
- CSS
- npm

### Backend
- Python
- FastAPI
- SQLAlchemy
- Alembic
- PostgreSQL
- Gemini API

## Repository Structure

- `backend/` — FastAPI backend
- `backend/app/` — backend application code
- `backend/app/api/` — API endpoints
- `backend/app/models/` — database models
- `backend/app/schemas/` — Pydantic schemas
- `backend/app/services/` — business logic and AI/database services
- `backend/alembic/` — database migrations
- `frontend/` — React/Vite application
- `frontend/src/` — frontend source code
- `docs/` — project documentation
- `README.md` — project setup and Phase 2A documentation

## Running the Project

### Backend

From `backend/`:

```bash
pip install -r requirements.txt
alembic upgrade head
uvicorn app.main:app --reload