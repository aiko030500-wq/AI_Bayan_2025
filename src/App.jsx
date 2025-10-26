import React, { useState } from "react";
import Lesson from "./Lesson.jsx";
import ChatBayan from "./ChatBayan.jsx";

export default function App() {
  const [page, setPage] = useState("menu");

  const pages = [
    "Grammar",
    "Vocabulary",
    "Phonics",
    "Cross-curricular",
    "Listening",
    "Reading",
    "Dictation",
    "Writing",
    "Speaking",
    "Quiz",
  ];

  return (
    <div className="text-center p-6 font-sans">
      <header className="mb-6">
        <h1 className="text-3xl font-bold text-yellow-400 drop-shadow-md">
          🌟 AI Bayan 2025
        </h1>
        <p className="text-sm text-gray-300 italic mt-2">
          “Hello! I’m AI Bayan — your English friend 2025.”
        </p>
      </header>

      {page === "menu" && (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {pages.map((p) => (
            <button
              key={p}
              onClick={() => setPage(p)}
              className="bg-blue-600 hover:bg-blue-500 transition p-4 rounded-xl shadow-lg"
            >
              {p}
            </button>
          ))}
        </div>
      )}

      {page !== "menu" && (
        <div>
          <Lesson topic={page} />
          <button
            onClick={() => setPage("menu")}
            className="mt-6 bg-yellow-400 text-blue-900 px-4 py-2 rounded-lg font-bold hover:bg-yellow-300"
          >
            ← Back to Menu
          </button>
        </div>
      )}

      <ChatBayan />
    </div>
  );
}

      
