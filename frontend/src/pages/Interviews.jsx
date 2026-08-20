import { useNavigate } from "react-router-dom";

function Interviews() {
  const navigate = useNavigate();

  const interviews = [
    {
      title: "Frontend Developer",
      company: "Tech Company",
      score: 86,
      duration: "24 min",
      date: "Aug 18, 2026",
    },
    {
      title: "React Developer",
      company: "Startup Inc.",
      score: 82,
      duration: "21 min",
      date: "Aug 17, 2026",
    },
    {
      title: "Software Engineer",
      company: "Digital Labs",
      score: 91,
      duration: "28 min",
      date: "Aug 16, 2026",
    },
    {
      title: "Full Stack Developer",
      company: "Cloud Systems",
      score: 79,
      duration: "25 min",
      date: "Aug 14, 2026",
    },
  ];

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <span className="eyebrow">
            INTERVIEW PRACTICE
          </span>

          <h1>Your Interviews</h1>

          <p>
            Review your previous interview sessions
            and start a new practice interview.
          </p>
        </div>

        <button
          className="primary-button"
          onClick={() =>
            navigate("/interviews/create")
          }
        >
          + New Interview
        </button>
      </div>

      <div className="interviews-summary">
        <div>
          <strong>24</strong>
          <span>Total Interviews</span>
        </div>

        <div>
          <strong>86%</strong>
          <span>Average Score</span>
        </div>

        <div>
          <strong>12h</strong>
          <span>Total Practice Time</span>
        </div>
      </div>

      <div className="panel">
        <div className="panel-header">
          <div>
            <span className="eyebrow">
              HISTORY
            </span>

            <h2>Interview History</h2>
          </div>
        </div>

        <div className="full-interview-list">
          {interviews.map((interview) => (
            <div
              className="full-interview-row"
              key={interview.title}
            >
              <div className="row-icon">▣</div>

              <div className="row-info">
                <strong>{interview.title}</strong>
                <span>{interview.company}</span>
              </div>

              <span>
                Completed
              </span>

              <span>
                {interview.duration}
              </span>

              <span>
                {interview.date}
              </span>

              <strong className="score">
                {interview.score}
                <small>/100</small>
              </strong>

              <button
                className="small-button"
                onClick={() =>
                  navigate("/performance")
                }
              >
                View
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Interviews;