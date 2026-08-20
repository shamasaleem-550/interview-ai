import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const fallbackQuestion = {
  question: "Your interview questions will appear here.",
  hint: "Complete interview setup first.",
};


function MockInterview() {
  const navigate = useNavigate();

  const [interviewData, setInterviewData] =
    useState(null);

  const [currentQuestion, setCurrentQuestion] =
    useState(0);

  const [answer, setAnswer] = useState("");

  const [isRecording, setIsRecording] =
    useState(false);

  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const savedInterview =
      localStorage.getItem("currentInterview");

    if (!savedInterview) {
      navigate("/interviews/create");
      return;
    }

    try {
      const parsed = JSON.parse(savedInterview);
      setInterviewData(parsed);
    } catch (error) {
      console.error("Unable to load interview session:", error);
      navigate("/interviews/create");
    }
  }, [navigate]);

  const questions = interviewData?.questions || [];
  const question = questions[currentQuestion] || fallbackQuestion;

  const isLastQuestion =
    questions.length > 0 &&
    currentQuestion === questions.length - 1;

  const progress = questions.length
    ? ((currentQuestion + 1) / questions.length) * 100
    : 0;

  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds((value) => value + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = () => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;

    return `${String(minutes).padStart(
      2,
      "0"
    )}:${String(remainingSeconds).padStart(2, "0")}`;
  };

  const handleNext = () => {
    if (!questions.length) {
      navigate("/interview-setup");
      return;
    }
    if (isLastQuestion) {
      navigate("/interview-complete");
      return;
    }

    setCurrentQuestion(
      (value) => value + 1
    );

    setAnswer("");
    setIsRecording(false);
  };

  if (!interviewData) {
    return (
      <div className="mock-interview-page">
        <main className="mock-main">
          <section className="mock-interview-card">
            <div className="mock-ai-section">
              <div className="mock-eyebrow">PREPARING INTERVIEW</div>
              <h1>Loading your AI-generated questions...</h1>
              <p className="mock-question-hint">Please wait a moment.</p>
            </div>
          </section>
        </main>
      </div>
    );
  }

  return (
    <div className="mock-interview-page">
      <header className="mock-topbar">
        <div className="mock-brand">
          <div className="mock-brand-icon">
            ✦
          </div>

          <div className="mock-brand-copy">
            <strong>InterviewAI</strong>
            <span>AI Interview Coach</span>
          </div>
        </div>

        <div className="mock-session-info">
          <span className="mock-session-label">
            {interviewData.job_role || "Interview"}
          </span>

          <div className="mock-question-counter">
            <strong className="mock-question-current">
              {currentQuestion + 1}
            </strong>

            <span>
              / {questions.length}
            </span>
          </div>
        </div>

        <button
          className="mock-exit"
          onClick={() =>
            navigate("/interviews")
          }
        >
          ✕ Exit Interview
        </button>
      </header>

      <div className="mock-progress-track">
        <div
          className="mock-progress-fill"
          style={{ width: `${progress}%` }}
        ></div>
      </div>

      <main className="mock-main">
        <section className="mock-interview-card">
          <div className="mock-ai-section">
            <div className="mock-ai-orb-wrapper">
              <div className="mock-ai-glow"></div>

              <div className="mock-ai-orb">
                ✦
              </div>

              <div className="mock-ai-status">
                <span className="mock-status-dot"></span>
                AI Interviewer
              </div>
            </div>

            <div className="mock-eyebrow">
              QUESTION {currentQuestion + 1}
            </div>

            <h1>{question.question_text || question.question}</h1>

            <p className="mock-question-hint">
              {question.hint || "Take a moment to structure your answer and explain your reasoning clearly."}
            </p>

            <div className="mock-listening-card">
              <div className="mock-listening-icon">
                ◉
              </div>

              <div>
                <strong>
                  Think before you answer
                </strong>

                <span>
                  Take your time. There's no rush.
                </span>
              </div>
            </div>
          </div>

          <div className="mock-answer-section">
            <div className="mock-answer-header">
              <div>
                <span className="mock-answer-label">
                  YOUR ANSWER
                </span>

                <strong>
                  Speak naturally and clearly
                </strong>
              </div>

              <div className="mock-time">
                ◷ {formatTime()}
              </div>
            </div>

            <div
              className={`mock-mic-area ${
                isRecording
                  ? "recording"
                  : ""
              }`}
            >
              <div className="mock-wave">
                {Array.from({ length: 11 }).map(
                  (_, index) => (
                    <span key={index}></span>
                  )
                )}
              </div>

              <button
                className={`mock-mic-button ${
                  isRecording
                    ? "recording"
                    : ""
                }`}
                onClick={() =>
                  setIsRecording(
                    (value) => !value
                  )
                }
              >
                {isRecording ? "■" : "🎙"}
              </button>

              <strong>
                {isRecording
                  ? "Listening..."
                  : "Tap to speak"}
              </strong>

              <span>
                {isRecording
                  ? "Click again to stop"
                  : "Or type your answer below"}
              </span>
            </div>

            <textarea
              value={answer}
              onChange={(event) =>
                setAnswer(event.target.value)
              }
              placeholder="Type your answer here..."
              style={{
                width: "100%",
                marginTop: "14px",
                minHeight: "100px",
                border: "1px solid #dedee7",
                borderRadius: "14px",
                padding: "14px",
                resize: "vertical",
              }}
            />
          </div>

          <div className="mock-card-footer">
            <div className="mock-session-details">
              <span>
                Question {currentQuestion + 1} of{" "}
                {questions.length}
              </span>

              <span>•</span>

              <span>
                Your answers are analyzed by AI
              </span>
            </div>

            <button
              className={
                isLastQuestion
                  ? "mock-finish-button"
                  : "mock-next-button"
              }
              onClick={handleNext}
            >
              {isLastQuestion
                ? "Finish Interview"
                : "Next Question"}

              <span>→</span>
            </button>
          </div>
        </section>

        <aside className="mock-sidebar">
          <div className="mock-sidebar-card">
            <div className="mock-sidebar-icon">
              ✦
            </div>

            <span className="mock-sidebar-eyebrow">
              AI COACH
            </span>

            <h3>Stay confident.</h3>

            <p>
              Focus on explaining your thinking
              clearly. Use specific examples whenever
              possible.
            </p>

            <div className="mock-sidebar-list">
              <div>
                ✓ Be specific
              </div>

              <div>
                ✓ Structure your answer
              </div>

              <div>
                ✓ Explain your reasoning
              </div>

              <div>
                ✓ Stay concise
              </div>
            </div>
          </div>

          <div className="mock-sidebar-progress">
            <div className="mock-sidebar-progress-top">
              <span>INTERVIEW PROGRESS</span>

              <strong>
                {currentQuestion + 1}/
                {questions.length}
              </strong>
            </div>

            <div className="mock-mini-progress">
              <div
                style={{
                  width: `${progress}%`,
                }}
              ></div>
            </div>

            <p>
              You're doing great. Keep going!
            </p>
          </div>
        </aside>
      </main>
    </div>
  );
}

export default MockInterview;