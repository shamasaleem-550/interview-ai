function Analytics() {
  const scores = [
    65,
    72,
    68,
    78,
    74,
    82,
    86,
  ];

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <span className="eyebrow">
            ANALYTICS
          </span>

          <h1>Practice Analytics</h1>

          <p>
            Track your improvement and understand how
            your interview performance changes over
            time.
          </p>
        </div>
      </div>

      <div className="analytics-grid">
        <div className="analytics-card">
          <span>Average Score</span>

          <strong>86%</strong>

          <small>
            ↑ 12% this month
          </small>
        </div>

        <div className="analytics-card">
          <span>Best Score</span>

          <strong>94%</strong>

          <small>
            ↑ New personal best
          </small>
        </div>

        <div className="analytics-card">
          <span>Practice Hours</span>

          <strong>12.4h</strong>

          <small>
            ↑ 3.2h this month
          </small>
        </div>
      </div>

      <section className="panel chart-panel">
        <div className="panel-header">
          <div>
            <span className="eyebrow">
              PERFORMANCE TREND
            </span>

            <h2>Interview Scores</h2>

            <p>
              Your scores over recent interviews
            </p>
          </div>
        </div>

        <div className="fake-chart">
          {scores.map((score, index) => (
            <div
              key={index}
              style={{
                height: `${score}%`,
              }}
            >
              {score}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Analytics;