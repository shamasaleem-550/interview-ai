from pydantic import BaseModel, Field
from google import genai
from google.genai import types

from app.core.config import settings


client = genai.Client(api_key=settings.GEMINI_API_KEY)
MODEL_NAME = "gemini-3.5-flash"


class QuestionList(BaseModel):
    questions: list[str] = Field(min_length=1)


def generate_interview_questions(
    job_role: str,
    difficulty: str,
    number_of_questions: int,
    interview_type: str = "Technical",
    company: str | None = None,
    job_description: str | None = None,
) -> list[str]:
    company_context = f"Company: {company}" if company else "Company: Not specified"
    jd_context = job_description if job_description else "No job description provided."

    prompt = f"""
You are an expert professional interviewer creating a realistic practice interview.

Generate exactly {number_of_questions} distinct questions for this candidate:
Job role: {job_role}
Experience level: {difficulty}
Interview type: {interview_type}
{company_context}
Job description:
{jd_context}

Rules:
- Match the requested interview type.
- Tailor questions to the role and job description when provided.
- Match the candidate's experience level.
- For Technical, emphasize role-specific technical knowledge and practical problem solving.
- For Behavioral, emphasize situations, decisions, collaboration, ownership, and outcomes.
- For Mixed, balance technical and behavioral questions.
- For HR, focus on motivation, communication, culture, strengths, weaknesses, and workplace scenarios.
- Avoid duplicates and vague questions.
- Questions should sound like questions a real interviewer would ask.
- Return exactly the requested number of questions.
"""

    response = client.models.generate_content(
        model=MODEL_NAME,
        contents=prompt,
        config=types.GenerateContentConfig(
            response_mime_type="application/json",
            response_schema=QuestionList,
        ),
    )

    parsed = QuestionList.model_validate_json(response.text)
    questions = [q.strip() for q in parsed.questions if q.strip()]

    if len(questions) != number_of_questions:
        raise ValueError(
            f"Gemini returned {len(questions)} questions; expected {number_of_questions}."
        )

    return questions


def evaluate_answer(question: str, answer: str) -> dict:
    prompt = f"""
You are an expert technical interviewer.

Evaluate the candidate's answer to this interview question.

Interview question:
{question}

Candidate answer:
{answer}

Evaluate based on technical correctness, understanding, completeness, and clarity.
Give a score from 0 to 10.

Return JSON with exactly: score (integer 0-10) and feedback (string).
"""

    class Evaluation(BaseModel):
        score: int = Field(ge=0, le=10)
        feedback: str

    response = client.models.generate_content(
        model=MODEL_NAME,
        contents=prompt,
        config=types.GenerateContentConfig(
            response_mime_type="application/json",
            response_schema=Evaluation,
        ),
    )
    result = Evaluation.model_validate_json(response.text)
    return result.model_dump()
