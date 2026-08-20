import { Navigate, Route, Routes } from "react-router-dom";

import AppLayout from "./components/AppLayout";

import Dashboard from "./pages/Dashboard";
import Interviews from "./pages/Interviews";
import CreateInterview from "./pages/CreateInterview";
import InterviewSetup from "./pages/InterviewSetup";
import MockInterview from "./pages/MockInterview";
import InterviewComplete from "./pages/InterviewComplete";
import Performance from "./pages/Performance";
import Analytics from "./pages/Analytics";
import Settings from "./pages/Settings";

import "./App.css";

function App() {
  return (
    <AppLayout>
      <Routes>
        {/* Dashboard */}
        <Route path="/" element={<Dashboard />} />

        {/* Interviews */}
        <Route path="/interviews" element={<Interviews />} />
        <Route
          path="/interviews/create"
          element={<CreateInterview />}
        />

        {/* Interview Flow */}
        <Route
          path="/interview-setup"
          element={<InterviewSetup />}
        />

        <Route
          path="/mock-interview"
          element={<MockInterview />}
        />

        <Route
          path="/interview-complete"
          element={<InterviewComplete />}
        />

        {/* Performance */}
        <Route
          path="/performance"
          element={<Performance />}
        />

        {/* Analytics */}
        <Route
          path="/analytics"
          element={<Analytics />}
        />

        {/* Settings */}
        <Route
          path="/settings"
          element={<Settings />}
        />

        {/* Unknown Route */}
        <Route
          path="*"
          element={<Navigate to="/" replace />}
        />
      </Routes>
    </AppLayout>
  );
}

export default App;