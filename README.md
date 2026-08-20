# InterviewAI

Phase 2A adds the first real end-to-end interview creation flow while keeping the existing UI unchanged.

## What is real now

- Create Interview sends the form to FastAPI.
- A guest candidate session is created automatically for local testing.
- The interview is persisted in PostgreSQL.
- Gemini generates the exact requested number of questions.
- Questions are saved in PostgreSQL.
- Interview Setup loads the persisted interview and generated questions from the API.
- Mock Interview uses those generated questions instead of the old hard-coded list.

## Local setup

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Optional `frontend/.env`:

```text
VITE_API_URL=http://127.0.0.1:8000
```

### Backend

1. Copy `backend/.env.example` to `backend/.env`.
2. Put your PostgreSQL and Gemini credentials in `backend/.env`.
3. Install dependencies:

```bash
cd backend
pip install -r requirements.txt
```

4. Run the database migration:

```bash
alembic upgrade head
```

5. Start FastAPI:

```bash
uvicorn app.main:app --reload
```

The API runs at `http://127.0.0.1:8000`.

## Phase 2A test

1. Start the backend.
2. Start the frontend.
3. Open **Create Interview**.
4. Enter a role, choose the interview type and question count, and optionally paste a job description.
5. Click **Create Interview**.
6. Wait for AI generation to finish.
7. Confirm Interview Setup shows the selected count.
8. Click **Start Interview**.
9. Confirm the Mock Interview displays AI-generated questions rather than the old hard-coded questions.

## Next phase

Phase 2B will connect the microphone to real browser audio capture and submit real answers for AI evaluation.
