// src/routes/routes.js
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";

const LandingPage = lazy(() => import("../Pages/LandingPage.jsx"));
const LoginPage = lazy(() => import("../Pages/LoginPage.jsx"));
const SignUp = lazy(() => import("../Pages/SignUp.jsx"));

const Activities = lazy(() => import("../Pages/Activities.jsx"));
const PlanPage = lazy(() => import("../Pages/PlanPage.jsx"));

const ProfilePage = lazy(() => import("../Pages/ProfilePage.jsx"));

const ProtectedRoute = lazy(() => import("./privateRoutes.jsx"));

const AppRoutes = () => {
  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/SignUp" element={<SignUp />} />

          {/* Protected Routes */}
          <Route
            path="/Activities"
            element={
              <ProtectedRoute>
                <Activities />
              </ProtectedRoute>
            }
          />
          <Route
            path="/PlanPage"
            element={
              <ProtectedRoute>
                <PlanPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/ProfilePage"
            element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Suspense>
    </Router>
  );
};

export default AppRoutes;
