import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();

  const interviews = [
    {
      title: "Frontend Developer",
      company: "Tech Company",
      score: "86",
      date: "Today",
      duration: "24 min",
    },
    {
      title: "React Developer",
      company: "Startup Inc.",
      score: "82",
      date: "Yesterday",
      duration: "21 min",
    },
    {
      title: "Software Engineer",
      company: "Digital Labs",
      score: "91",
      date: "2 days ago",
      duration: "28 min",
    },
  ];

  return (
    <div className="page">
      <section className="hero-card">
        <div className="hero-content">
          <span className="hero-badge">
            AI POWERED INTERVIEW COACH
          </span>

          <h2>
            Practice smarter.
            <br />
            <span>Interview better.</span>
          </h2>

          <p>
            Prepare for your next interview with realistic AI
            interviews, personalized feedback, and detailed
            performance insights.
          </p>

          <div className="hero-buttons">
            <button
              className="hero-primary"
              onClick={() =>
                navigate("/interviews/create")
              }
            >
              Start Interview →
            </button>

            <button
              className="hero-secondary"
              onClick={() =>
                navigate("/performance")
              }
            >
              View Performance
            </button>
          </div>
        </div>

        <div className="hero-visual">
          <div className="orb">✦</div>

          <div className="ai-card">
            <div className="ai-card-top">
              <span>
                <i></i>
                AI COACH
              </span>

              <span>LIVE</span>
            </div>

            <h3>
              Tell me about a challenging
              project you worked on.
            </h3>

            <div className="wave">
              {Array.from({ length: 9 }).map(
                (_, index) => (
                  <b key={index}></b>
                )
              )}
            </div>

            <small>Listening...</small>
          </div>

          <div className="floating-score">
            <strong>86%</strong>
            <span>Interview Score</span>
          </div>
        </div>
      </section>

      <section className="stats-grid">
        <div className="stat-card">
          <div className="stat-top">
            <div className="stat-icon">◉</div>
            <span className="stat-change">+12%</span>
          </div>

          <strong className="stat-value">24</strong>
          <span className="stat-label">Interviews</span>
          <span className="stat-subtitle">
            Completed sessions
          </span>
        </div>

        <div className="stat-card">
          <div className="stat-top">
            <div className="stat-icon">★</div>
            <span className="stat-change">+8%</span>
          </div>

          <strong className="stat-value">86%</strong>
          <span className="stat-label">Average Score</span>
          <span className="stat-subtitle">
            Across all interviews
          </span>
        </div>

        <div className="stat-card">
          <div className="stat-top">
            <div className="stat-icon">◔</div>
            <span className="stat-change">+15%</span>
          </div>

          <strong className="stat-value">12h</strong>
          <span className="stat-label">Practice Time</span>
          <span className="stat-subtitle">
            Total interview practice
          </span>
        </div>

        <div className="stat-card">
          <div className="stat-top">
            <div className="stat-icon">↗</div>
            <span className="stat-change">+6%</span>
          </div>

          <strong className="stat-value">78%</strong>
          <span className="stat-label">Confidence</span>
          <span className="stat-subtitle">
            Overall confidence level
          </span>
        </div>
      </section>

      <section className="dashboard-columns">
        <div className="panel">
          <div className="panel-header">
            <div>
              <span className="eyebrow">
                RECENT ACTIVITY
              </span>

              <h2>Recent Interviews</h2>

              <p>
                Your latest practice sessions
              </p>
            </div>

            <button
              className="text-button"
              onClick={() =>
                navigate("/interviews")
              }
            >
              View all →
            </button>
          </div>

          <div className="interview-list">
            {interviews.map((interview) => (
              <button
                className="interview-row"
                key={interview.title}
              >
                <div className="row-icon">▣</div>

                <div className="row-info">
                  <strong>{interview.title}</strong>
                  <span>{interview.company}</span>
                </div>

                <span className="completed">
                  Completed
                </span>

                <span className="duration">
                  {interview.duration}
                </span>

                <span className="date">
                  {interview.date}
                </span>

                <strong className="score">
                  {interview.score}
                  <small>/100</small>
                </strong>
              </button>
            ))}
          </div>
        </div>

        <div className="panel progress-card">
          <div className="panel-header">
            <div>
              <span className="eyebrow">
                YOUR PROGRESS
              </span>

              <h2>Interview Readiness</h2>
            </div>

            <span className="panel-symbol">↗</span>
          </div>

          <div className="progress-content">
            <div className="progress-circle">
              <strong>84%</strong>
              <span>READY</span>
            </div>

            <div>
              <strong className="green">
                Excellent progress
              </strong>

              <p>
                You're performing better than
                most candidates in your practice
                sessions.
              </p>
            </div>
          </div>

          <div className="skill">
            <div>
              <span>Communication</span>
              <strong>92%</strong>
            </div>

            <div className="skill-track">
              <div
                className="skill-value"
                style={{ width: "92%" }}
              ></div>
            </div>
          </div>

          <div className="skill">
            <div>
              <span>Technical Knowledge</span>
              <strong>84%</strong>
            </div>

            <div className="skill-track">
              <div
                className="skill-value"
                style={{ width: "84%" }}
              ></div>
            </div>
          </div>

          <div className="skill">
            <div>
              <span>Confidence</span>
              <strong>76%</strong>
            </div>

            <div className="skill-track">
              <div
                className="skill-value"
                style={{ width: "76%" }}
              ></div>
            </div>
          </div>

          <div
            className="performance-link"
            onClick={() =>
              navigate("/performance")
            }
          >
            View detailed performance →
          </div>
        </div>
      </section>

      <section className="bottom-grid">
        <div className="momentum-card">
          <div className="big-icon">↗</div>

          <div>
            <span className="eyebrow">
              PRACTICE MOMENTUM
            </span>

            <h2>You're on a 7-day streak!</h2>

            <p>
              Keep practicing every day to improve
              your interview performance.
            </p>
          </div>

          <strong>7 DAYS</strong>
        </div>

        <div className="achievement-card">
          <div className="big-icon">★</div>

          <div>
            <span className="eyebrow">
              LATEST ACHIEVEMENT
            </span>

            <h2>Communication Master</h2>

            <p>
              You scored above 90% in communication
              across 5 interviews.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Dashboard;