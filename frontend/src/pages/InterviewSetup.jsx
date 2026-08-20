import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getInterview, getInterviewQuestions } from "../lib/api";

function InterviewSetup() {
  const navigate = useNavigate();

  const [interview, setInterview] = useState(null);
  const [generatedQuestions, setGeneratedQuestions] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const interviewId = localStorage.getItem(
      "currentInterviewId"
    );

    if (!interviewId) {
      navigate("/interviews/create");
      return;
    }

    let cancelled = false;

    const loadInterview = async () => {
      try {
        const [interviewData, questionsData] =
          await Promise.all([
            getInterview(interviewId),
            getInterviewQuestions(interviewId),
          ]);

        if (cancelled) return;

        setInterview(interviewData);
        setGeneratedQuestions(questionsData);

        localStorage.setItem(
          "currentInterview",
          JSON.stringify({
            ...interviewData,
            questions: questionsData,
          })
        );
      } catch (requestError) {
        if (cancelled) return;

        console.error(
          "Unable to load interview:",
          requestError
        );

        setError(
          requestError.message ||
            "Unable to load the interview. Please try again."
        );
      }
    };

    loadInterview();

    return () => {
      cancelled = true;
    };
  }, [navigate]);

  if (error) {
    return (
      <div className="page narrow-page">
        <div className="form-heading">
          <span className="eyebrow">INTERVIEW SETUP</span>
          <h1>We couldn't load your interview.</h1>
          <p>{error}</p>
        </div>

        <button
          className="primary-button"
          onClick={() => navigate("/interviews/create")}
        >
          Create Again →
        </button>
      </div>
    );
  }

  if (!interview) {
    return (
      <div className="page narrow-page">
        <div className="form-heading">
          <span className="eyebrow">INTERVIEW SETUP</span>
          <h1>Preparing your interview.</h1>
          <p>
            Your AI interviewer is generating questions tailored to your role.
          </p>
        </div>
      </div>
    );
  }

  const {
    job_role: role,
    company,
    difficulty: experience,
    interview_type: interviewType,
    question_count: requestedQuestionCount,
    job_description: jobDescription,
  } = interview;

  const questionCount =
    generatedQuestions.length || requestedQuestionCount || 10;

  const duration =
    questionCount === 5
      ? "10–15 min"
      : questionCount === 15
      ? "30–40 min"
      : "20–30 min";

  const roleShort =
    role?.split(" ")[0] || "Role";

  return (
    <div className="page">
      <div className="center page-header">
        <div>
          <span className="eyebrow">
            INTERVIEW SETUP
          </span>

          <h1>You're all set.</h1>

          <p>
            Review your interview details before
            starting your AI-powered practice session.
          </p>
        </div>
      </div>

      <div className="setup-progress-bar">
        <div className="step done">
          <span>✓</span>
          Create
        </div>

        <div className="progress-line active"></div>

        <div className="step current">
          <span>2</span>
          Setup
        </div>

        <div className="progress-line"></div>

        <div className="step">
          <span>3</span>
          Interview
        </div>
      </div>

      <div className="setup-grid">
        <div className="setup-main">
          <div className="setup-title">
            <div>
              <span className="eyebrow">
                INTERVIEW DETAILS
              </span>

              <h2>{role}</h2>

              <p>
                {interviewType} · {experience}
                {company ? ` · ${company}` : ""}
              </p>
            </div>

            <div className="ready-icon">✓</div>
          </div>

          <div className="details-grid">
            <div className="detail-card">
              <div>▣</div>
              <span>ROLE</span>
              <strong>{roleShort}</strong>
            </div>

            <div className="detail-card">
              <div>◉</div>
              <span>LEVEL</span>
              <strong>{experience}</strong>
            </div>

            <div className="detail-card">
              <div>?</div>
              <span>QUESTIONS</span>
              <strong>{questionCount}</strong>
            </div>

            <div className="detail-card">
              <div>◷</div>
              <span>DURATION</span>
              <strong>{duration}</strong>
            </div>

            <div className="detail-card">
              <div>✦</div>
              <span>AI COACH</span>
              <strong>Enabled</strong>
            </div>
          </div>

          <div className="job-preview">
            <div>
              <strong>Job Description</strong>
              <span>PREVIEW</span>
            </div>

            <p>
              {jobDescription
                ? jobDescription
                : "No job description was provided. Your interview will be based on the role, experience level, and interview type."}
            </p>
          </div>

          <div className="ai-info">
            <div>✦</div>

            <div>
              <h3>Your AI interviewer is ready</h3>

              <p>
                {questionCount} questions were generated for your {interviewType.toLowerCase()} interview based on your role and experience level.
                {company
                  ? ` The questions were also tailored toward ${company}.`
                  : ""}
              </p>
            </div>
          </div>

          <div className="setup-actions">
            <button
              className="secondary-button"
              onClick={() =>
                navigate("/interviews/create")
              }
            >
              ← Edit
            </button>

            <button
              className="primary-button"
              disabled={!generatedQuestions.length}
              onClick={() => navigate("/mock-interview")}
            >
              Start Interview →
            </button>
          </div>
        </div>

        <div className="setup-side">
          <div className="coach-card">
            <div className="coach-icon">✦</div>

            <span className="eyebrow">
              AI INTERVIEW COACH
            </span>

            <h2>
              Stay calm.
              <br />
              Think clearly.
            </h2>

            <p>
              Your AI coach will evaluate your
              communication, confidence, technical
              knowledge, and answer quality.
            </p>

            <ul>
              <li>✓ Realistic interview questions</li>
              <li>✓ Adaptive follow-up questions</li>
              <li>✓ Detailed performance feedback</li>
              <li>✓ Personalized improvement tips</li>
            </ul>
          </div>

          <div className="tip-card">
            <strong>Quick Tip</strong>

            <p>
              Take a moment to think before answering.
              A clear and structured answer is better
              than a rushed one.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InterviewSetup;