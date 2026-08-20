import { Navigate, Route, Routes } from "react-router-dom";

import AppLayout from "./AppLayout";

import Dashboard from "../pages/Dashboard";
import Interviews from "../pages/Interviews";
import CreateInterview from "../pages/CreateInterview";
import InterviewSetup from "../pages/InterviewSetup";
import Performance from "../pages/Performance";
import Analytics from "../pages/Analytics";
import Settings from "../pages/Settings";

function AppRoutes() {
  return (
    <AppLayout>
      <Routes>
        <Route
          path="/"
          element={<Dashboard />}
        />

        <Route
          path="/interviews"
          element={<Interviews />}
        />

        <Route
          path="/interviews/create"
          element={<CreateInterview />}
        />

        <Route
          path="/interview-setup"
          element={<InterviewSetup />}
        />

        <Route
          path="/performance"
          element={<Performance />}
        />

        <Route
          path="/analytics"
          element={<Analytics />}
        />

        <Route
          path="/settings"
          element={<Settings />}
        />

        <Route
          path="*"
          element={
            <Navigate
              to="/"
              replace
            />
          }
        />
      </Routes>
    </AppLayout>
  );
}

export default AppRoutes;