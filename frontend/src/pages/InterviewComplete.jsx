import { useNavigate } from "react-router-dom";

function InterviewComplete() {
  const navigate = useNavigate();

  return (
    <div className="page narrow-page">
      <div className="panel center">
        <div
          style={{
            width: "70px",
            height: "70px",
            margin: "0 auto 20px",
            borderRadius: "50%",
            background: "#eaf6ef",
            color: "#48a073",
            display: "grid",
            placeItems: "center",
            fontSize: "30px",
          }}
        >
          ✓
        </div>

        <span className="eyebrow">
          INTERVIEW COMPLETE
        </span>

        <h1>
          Great job!
        </h1>

        <p>
          You've completed your Frontend Developer
          practice interview. Your performance has
          been analyzed.
        </p>

        <div
          style={{
            margin: "30px auto",
            width: "150px",
            height: "150px",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, white 55%, transparent 56%), conic-gradient(#53a97a 0 86%, #e4ebe7 86% 100%)",
            display: "grid",
            placeItems: "center",
          }}
        >
          <strong
            style={{
              fontSize: "35px",
              gridColumn: 1,
              gridRow: 1,
            }}
          >
            86
          </strong>
        </div>

        <strong
          style={{
            display: "block",
            marginBottom: "25px",
          }}
        >
          Overall Score
        </strong>

        <div
          style={{
            display: "flex",
            gap: "10px",
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          <button
            className="secondary-button"
            onClick={() =>
              navigate("/")
            }
          >
            Dashboard
          </button>

          <button
            className="primary-button"
            onClick={() =>
              navigate("/performance")
            }
          >
            View Performance →
          </button>
        </div>
      </div>
    </div>
  );
}

export default InterviewComplete;