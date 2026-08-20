import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  FileText,
  Sparkles,
  Plus,
  FolderOpen,
  Brain,
  LayoutTemplate,
  ArrowRight,
} from "lucide-react";
import axiosClient from "../api/axiosClient";
import { useAuth } from "../context/AuthContext";

export default function Dashboard() {
  const { user } = useAuth();
  const [count, setCount] = useState(0);

  useEffect(() => {
    axiosClient
      .get("/resumes")
      .then(({ data }) => setCount(data.length))
      .catch(() => {});
  }, []);

  const cards = [
    {
      title: "My Resumes",
      value: count,
      icon: <FileText className="w-7 h-7 text-blue-600" />,
    },
    {
      title: "AI Assistant",
      value: "Ready",
      icon: <Sparkles className="w-7 h-7 text-violet-600" />,
    },
    {
      title: "Templates",
      value: "3",
      icon: <LayoutTemplate className="w-7 h-7 text-emerald-600" />,
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="mx-auto max-w-7xl">

        {/* Hero */}
        <div className="rounded-3xl bg-gradient-to-r from-blue-600 to-indigo-700 p-10 text-white shadow-xl">
          <p className="uppercase tracking-widest text-sm text-blue-100">
            Resume Builder
          </p>

          <h1 className="mt-3 text-4xl font-bold">
            Welcome back, {user?.name || "User"} 👋
          </h1>

          <p className="mt-3 max-w-xl text-blue-100">
            Create ATS-friendly resumes, improve them with AI, and download
            professional PDFs in minutes.
          </p>

          <Link
            to="/create"
            className="mt-8 inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 font-semibold text-blue-700 transition hover:scale-105"
          >
            <Plus size={20} />
            Create Resume
          </Link>
        </div>

        {/* Stats */}
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {cards.map((card) => (
            <div
              key={card.title}
              className="rounded-2xl bg-white p-6 shadow-md transition hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500">{card.title}</p>
                  <h2 className="mt-2 text-3xl font-bold">
                    {card.value}
                  </h2>
                </div>

                {card.icon}
              </div>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="mt-10">
          <h2 className="mb-5 text-2xl font-bold">
            Quick Actions
          </h2>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">

            <Link
              to="/create"
              className="rounded-2xl bg-white p-6 shadow-md hover:shadow-xl"
            >
              <Plus className="mb-4 text-blue-600" />
              <h3 className="font-semibold text-lg">
                New Resume
              </h3>
              <p className="text-gray-500 text-sm mt-2">
                Start building from scratch.
              </p>
            </Link>

            <Link
              to="/my-resumes"
              className="rounded-2xl bg-white p-6 shadow-md hover:shadow-xl"
            >
              <FolderOpen className="mb-4 text-emerald-600" />
              <h3 className="font-semibold text-lg">
                My Resumes
              </h3>
              <p className="text-gray-500 text-sm mt-2">
                View and manage saved resumes.
              </p>
            </Link>

            <Link
              to="/improve"
              className="rounded-2xl bg-white p-6 shadow-md hover:shadow-xl"
            >
              <Brain className="mb-4 text-violet-600" />
              <h3 className="font-semibold text-lg">
                AI Improve
              </h3>
              <p className="text-gray-500 text-sm mt-2">
                Improve your resume using AI.
              </p>
            </Link>

            <Link
              to="/choose-template"
              className="rounded-2xl bg-white p-6 shadow-md hover:shadow-xl"
            >
              <LayoutTemplate className="mb-4 text-orange-600" />
              <h3 className="font-semibold text-lg">
                Templates
              </h3>
              <p className="text-gray-500 text-sm mt-2">
                Explore resume templates.
              </p>
            </Link>

          </div>
        </div>

        {/* Resume Status */}
        <div className="mt-10 rounded-2xl bg-white p-8 shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">
                Resume Workspace
              </h2>

              <p className="mt-2 text-gray-500">
                {count > 0
                  ? `You currently have ${count} resume${count > 1 ? "s" : ""}.`
                  : "You haven't created a resume yet."}
              </p>
            </div>

            <Link
              to="/my-resumes"
              className="flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-white hover:bg-blue-700"
            >
              Manage
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}