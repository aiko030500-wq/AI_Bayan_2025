import React from "react";

export default function Lesson({ topic }) {
  return (
    <div className="mt-6 bg-blue-800 p-6 rounded-lg shadow-md text-left">
      <h2 className="text-2xl font-bold text-yellow-300 mb-4">{topic}</h2>
      <p className="text-gray-100">
        Exercises and content for <strong>{topic}</strong> will appear here.
      </p>
      <button className="mt-4 bg-green-500 hover:bg-green-400 text-white font-bold py-2 px-4 rounded">
        Next →
      </button>
    </div>
  );
}
