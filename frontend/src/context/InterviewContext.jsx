import { createContext, useContext, useState } from 'react';

const InterviewContext = createContext();

export function InterviewProvider({ children }) {
  const [interviewConfig, setInterviewConfig] = useState({
    role: '',
    experienceLevel: 'Mid-Level',
    type: 'Technical',
    questionCount: 5,
  });

  const [activeSession, setActiveSession] = useState(null);
  const [interviewHistory, setInterviewHistory] = useState([]);

  const updateConfig = (newConfig) => {
    setInterviewConfig((prev) => ({ ...prev, ...newConfig }));
  };

  const startSession = (sessionData) => {
    setActiveSession(sessionData);
  };

  const endSession = (results) => {
    if (results) {
      setInterviewHistory((prev) => [results, ...prev]);
    }
    setActiveSession(null);
  };

  return (
    <InterviewContext.Provider
      value={{
        interviewConfig,
        updateConfig,
        activeSession,
        startSession,
        endSession,
        interviewHistory,
      }}
    >
      {children}
    </InterviewContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export const useInterview = () => useContext(InterviewContext);