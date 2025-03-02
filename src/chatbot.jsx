import { useState, useEffect, useRef } from "react";
import chatIcon from "/chat-icon.png"; // Ensure this exists in /public

const API_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:5000/reply";

const formatBotResponse = (text) => {
  const maxLength = 300;
  if (text.length > maxLength) {
    return { shortText: text.substring(0, maxLength) + " ...", fullText: text };
  }
  return { shortText: text, fullText: null };
};

export default function Chatbot() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [isOpen, setIsOpen] = useState(false); // Fix missing state

  const sendMessage = async () => {
    if (!input.trim()) return;

    const newMessage = { sender: "user", text: input };
    setMessages([...messages, newMessage]);
    setInput("");

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: input }),
      });

      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

      const data = await response.json();
      let botResponseText = data.body?.response?.data || "No response available.";
      const formattedResponse = formatBotResponse(botResponseText);

      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: formattedResponse.shortText, fullText: formattedResponse.fullText },
      ]);
    } catch (error) {
      console.error("Fetch error:", error);
      setMessages((prev) => [...prev, { sender: "bot", text: `Error: ${error.message}` }]);
    }
  };

  return (
    <>
      {/* Chatbot Icon */}
      <div className="chatbot-icon" onClick={() => setIsOpen(true)}>
        <img src={chatIcon} alt="Chat" width={40} height={40} />
      </div>

      {/* Chat Popup */}
      {isOpen && (
        <div className="chat-container fixed bottom-20 right-6 w-96 bg-white shadow-lg rounded-xl border border-gray-300">
          <div className="flex justify-between items-center bg-blue-600 text-white p-3 rounded-t-xl">
            <h2 className="text-lg font-bold">AI Chatbot</h2>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white text-xl font-bold hover:text-gray-300"
            >
              ✖
            </button>
          </div>

          {/* Chat Messages with Scrollbar */}
          <div className="h-64 overflow-y-auto p-3 bg-gray-50 border-b border-gray-300">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`my-2 p-2 rounded-lg max-w-[75%] shadow-md ${
                  msg.sender === "user"
                    ? "bg-green-500 text-white ml-auto text-right"
                    : "bg-purple-500 text-white mr-auto text-left"
                }`}
              >
                <p>{expandedIndex === index ? msg.fullText || msg.text : msg.text}</p>
                {msg.fullText && expandedIndex !== index && (
                  <button
                    onClick={() => setExpandedIndex(index)}
                    className="text-blue-300 text-sm underline ml-2"
                  >
                    View More
                  </button>
                )}
              </div>
            ))}
          </div>

          {/* Input Box */}
          <div className="flex p-3 border-t border-gray-300">
            <input
              type="text"
              className="flex-1 p-2 border border-gray-400 rounded-l-lg focus:outline-none"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask something..."
            />
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded-r-lg hover:bg-blue-600 transition"
              onClick={sendMessage}
            >
              Send
            </button>
          </div>
        </div>
      )}
    </>
  );
}
