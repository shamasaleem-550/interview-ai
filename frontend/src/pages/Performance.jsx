function Performance() {
  const skills = [
    {
      name: "Communication",
      score: 92,
      text: "You communicate your ideas clearly and confidently.",
    },
    {
      name: "Technical Knowledge",
      score: 84,
      text: "Your technical fundamentals are strong.",
    },
    {
      name: "Problem Solving",
      score: 88,
      text: "You demonstrate a structured approach to problems.",
    },
    {
      name: "Confidence",
      score: 76,
      text: "Try to speak with slightly more confidence.",
    },
  ];

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <span className="eyebrow">
            PERFORMANCE
          </span>

          <h1>Your Performance</h1>

          <p>
            Understand your strengths and discover
            exactly where you can improve.
          </p>
        </div>
      </div>

      <section className="performance-hero">
        <div className="performance-score">
          <span>OVERALL SCORE</span>

          <strong>86</strong>

          <small>/100</small>
        </div>

        <div>
          <span className="eyebrow">
            EXCELLENT PERFORMANCE
          </span>

          <h2>
            You're interview-ready.
          </h2>

          <p>
            Your overall performance is strong. Focus
            on improving confidence and continuing to
            practice technical questions.
          </p>
        </div>
      </section>

      <section className="performance-grid">
        {skills.map((skill) => (
          <div
            className="performance-card"
            key={skill.name}
          >
            <div className="performance-card-top">
              <span>{skill.name}</span>

              <strong>{skill.score}%</strong>
            </div>

            <div className="performance-bar">
              <div
                style={{
                  width: `${skill.score}%`,
                }}
              ></div>
            </div>

            <p>{skill.text}</p>
          </div>
        ))}
      </section>

      <section className="feedback-panel">
        <span className="eyebrow">
          AI FEEDBACK
        </span>

        <h2>
          Personalized recommendations
        </h2>

        <div className="feedback-list">
          <div>
            <span>✓</span>

            <div>
              <strong>
                Great answer structure
              </strong>

              <p>
                Your responses generally followed a
                clear beginning, middle, and conclusion.
              </p>
            </div>
          </div>

          <div>
            <span>↑</span>

            <div>
              <strong>
                Improve confidence
              </strong>

              <p>
                Try to avoid filler words and pause
                briefly before difficult questions.
              </p>
            </div>
          </div>

          <div>
            <span>★</span>

            <div>
              <strong>
                Use more specific examples
              </strong>

              <p>
                Concrete examples make your answers
                more memorable and convincing.
              </p>
            </div>
          </div>
        </div>

        <div className="result-note">
          AI feedback is based on your recent
          interview sessions.
        </div>
      </section>
    </div>
  );
}

export default Performance;