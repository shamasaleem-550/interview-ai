import { useNavigate } from "react-router-dom";
import { useState } from "react";

import { createInterview } from "../lib/api";

function CreateInterview() {
  const navigate = useNavigate();

  const [role, setRole] = useState("");
  const [company, setCompany] = useState("");
  const [experience, setExperience] =
    useState("Mid Level");
  const [interviewType, setInterviewType] =
    useState("Technical");
  const [questions, setQuestions] =
    useState("10");
  const [jobDescription, setJobDescription] =
    useState("");

  const [isCreating, setIsCreating] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setIsCreating(true);

    try {
      const createdInterview = await createInterview({
        title: role.trim(),
        job_role: role.trim(),
        difficulty: experience,
        company: company.trim() || null,
        interview_type: interviewType,
        question_count: Number(questions),
        job_description: jobDescription.trim() || null,
      });

      localStorage.setItem(
        "currentInterviewId",
        createdInterview.id
      );

      navigate("/interview-setup");
    } catch (requestError) {
      console.error("Unable to create interview:", requestError);
      setError(
        requestError.message ||
          "We couldn't create the interview. Please make sure the backend is running and try again."
      );
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <div className="page narrow-page">
      <button
        className="back-link"
        onClick={() => navigate("/interviews")}
      >
        ← Back to interviews
      </button>

      <div className="form-heading">
        <span className="eyebrow">
          CREATE INTERVIEW
        </span>

        <h1>
          Build your <span>practice session.</span>
        </h1>

        <p>
          Tell us about the role you're preparing
          for and we'll create a personalized AI
          interview.
        </p>
      </div>

      <form
        className="create-form"
        onSubmit={handleSubmit}
      >
        {/* JOB TITLE */}
        <div className="form-card">
          <label>
            Job Title
            <span>Required</span>
          </label>

          <input
            type="text"
            placeholder="e.g. Frontend Developer"
            value={role}
            onChange={(event) =>
              setRole(event.target.value)
            }
            required
          />
        </div>

        {/* COMPANY */}
        <div className="form-card">
          <label>
            Company
            <span>Optional</span>
          </label>

          <input
            type="text"
            placeholder="e.g. Google, Microsoft, Startup..."
            value={company}
            onChange={(event) =>
              setCompany(event.target.value)
            }
          />
        </div>

        {/* EXPERIENCE LEVEL */}
        <div className="form-card">
          <label>
            Experience Level
          </label>

          <div className="option-grid">
            {[
              "Entry Level",
              "Mid Level",
              "Senior",
              "Lead",
            ].map((item) => (
              <button
                type="button"
                key={item}
                className={`option ${
                  experience === item
                    ? "selected"
                    : ""
                }`}
                onClick={() =>
                  setExperience(item)
                }
              >
                <strong>{item}</strong>

                <span>
                  {item === "Entry Level"
                    ? "0–2 years"
                    : item === "Mid Level"
                    ? "2–5 years"
                    : item === "Senior"
                    ? "5–8 years"
                    : "8+ years"}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* INTERVIEW TYPE */}
        <div className="form-card">
          <label>
            Interview Type
          </label>

          <div className="option-grid">
            {[
              "Technical",
              "Behavioral",
              "Mixed",
              "HR",
            ].map((item) => (
              <button
                type="button"
                key={item}
                className={`option ${
                  interviewType === item
                    ? "selected"
                    : ""
                }`}
                onClick={() =>
                  setInterviewType(item)
                }
              >
                <strong>{item}</strong>

                <span>
                  AI-generated questions
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* QUESTIONS + EXPERIENCE */}
        <div className="two-column">
          <div className="form-card">
            <label>
              Number of Questions
            </label>

            <div className="question-options">
              {["5", "10", "15"].map((item) => (
                <button
                  type="button"
                  key={item}
                  className={`question-option ${
                    questions === item
                      ? "selected"
                      : ""
                  }`}
                  onClick={() =>
                    setQuestions(item)
                  }
                >
                  <strong>{item}</strong>

                  <span>
                    Questions
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div className="form-card">
            <label>
              Experience
            </label>

            <select
              value={experience}
              onChange={(event) =>
                setExperience(event.target.value)
              }
            >
              <option>Entry Level</option>
              <option>Mid Level</option>
              <option>Senior</option>
              <option>Lead</option>
            </select>
          </div>
        </div>

        {/* JOB DESCRIPTION */}
        <div className="form-card">
          <label>
            Job Description
            <span>Optional</span>
          </label>

          <textarea
            placeholder="Paste the job description here..."
            value={jobDescription}
            onChange={(event) =>
              setJobDescription(event.target.value)
            }
          />

          <small className="input-help">
            The AI will use this information to
            generate relevant interview questions.
          </small>
        </div>

        {/* SUBMIT */}
        {error && (
          <div
            role="alert"
            style={{
              marginBottom: "14px",
              padding: "12px 14px",
              borderRadius: "12px",
              border: "1px solid rgba(220, 80, 80, 0.25)",
              background: "rgba(220, 80, 80, 0.08)",
              color: "#b33a3a",
              fontSize: "14px",
            }}
          >
            {error}
          </div>
        )}

        <button
          className="form-submit"
          type="submit"
          disabled={isCreating}
        >
          {isCreating ? "Creating interview..." : "Create Interview →"}
        </button>
      </form>
    </div>
  );
}

export default CreateInterview;