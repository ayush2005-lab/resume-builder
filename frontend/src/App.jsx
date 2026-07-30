import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import { DraftProvider } from "./context/DraftContext";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import CreateResume from "./pages/CreateResume";
import ImproveResume from "./pages/ImproveResume";
import AISuggestions from "./pages/AISuggestions";
import ChooseTemplate from "./pages/ChooseTemplate";
import ResumePreview from "./pages/PreviewResume";
import EditResume from "./pages/EditResume";
import ExportResume from "./pages/ExportResume";
import MyResumes from "./pages/MyResumes";
import AccountSettings from "./pages/AccountSettings";

export default function App() {
  return (
    <DraftProvider>
      <Navbar />
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/create" element={<ProtectedRoute><CreateResume /></ProtectedRoute>} />
        <Route path="/improve" element={<ProtectedRoute><ImproveResume /></ProtectedRoute>} />
        <Route path="/ai-suggestions" element={<ProtectedRoute><AISuggestions /></ProtectedRoute>} />
        <Route path="/choose-template" element={<ProtectedRoute><ChooseTemplate /></ProtectedRoute>} />
        <Route path="/preview" element={<ResumePreview />} />
        <Route path="/edit" element={<ProtectedRoute><EditResume /></ProtectedRoute>} />
        <Route path="/export" element={<ProtectedRoute><ExportResume /></ProtectedRoute>} />
        <Route path="/my-resumes" element={<ProtectedRoute><MyResumes /></ProtectedRoute>} />
        <Route path="/account" element={<ProtectedRoute><AccountSettings /></ProtectedRoute>} />
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </DraftProvider>
  );
}
