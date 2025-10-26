import React, { useState } from "react";

export default function ChatBayan() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const sendMessage = () => {
    if (input.trim()) {
      setMessages([...messages, { text: input, user: true }]);
      setInput("");
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          { text: "I'm AI Bayan 😊 Let's learn together!", user: false },
        ]);
      }, 800);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 bg-white text-blue-900 p-4 rounded-xl w-64 shadow-lg">
      <h3 className="font-bold text-blue-700 mb-2">AI Bayan 💬</h3>
      <div className="h-40 overflow-y-auto border border-gray-300 rounded p-2 mb-2 bg-gray-50 text-left">
        {messages.map((m, i) => (
          <p key={i} className={m.user ? "text-right" : ""}>
            {m.text}
          </p>
        ))}
      </div>
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="w-full border border-gray-400 rounded px-2 py-1"
        placeholder="Type here..."
      />
      <button
        onClick={sendMessage}
        className="mt-2 w-full bg-blue-600 text-white rounded py-1 font-bold hover:bg-blue-500"
      >
        Send
      </button>
    </div>
  );
}

