import { useEffect } from "react";
import Chatbot from "./chatbot";
import chatbotImage from "/IncidentManagement.png";
import './App.css';

function App() {
  useEffect(() => {
    console.log("App component is rendering!");
  }, []);

  return (
    <div className="h-screen flex flex-col bg-gradient-to-r from-blue-100 to-purple-200">
      {/* Header Section */}
      <header className="text-center p-5 bg-blue-600 text-white text-2xl font-bold shadow-lg">
        🔍 AI-Powered Incident Management System
      </header>
      
      {/* Main Content Section */}
      <main className="flex flex-col items-center justify-center flex-grow p-5 text-center">
        <img src={chatbotImage} alt="Chatbot" className="w-40 h-40 mb-4 drop-shadow-lg" />
        <p className="text-gray-800 text-xl font-semibold mb-4">Revolutionizing IT Service Management with AI</p>
        <div className="max-w-2xl text-gray-700 bg-white p-6 rounded-lg shadow-md">
          <p>
            Our AI-driven incident management system leverages Natural Language Processing (NLP) and predictive analytics
            to optimize the incident lifecycle, from root cause analysis to escalation prediction. 
          </p>
          <h3 className="text-lg font-bold mt-4">Key Components:</h3>
          <ul className="list-disc text-left mt-2 pl-6">
            <li><strong>Root Cause Analysis:</strong> Using Retrieval-Augmented Generation (RAG) and LangChain for faster and precise incident diagnosis.</li>
            <li><strong>Predictive Analysis:</strong> Forecasting escalations by integrating historical data with AI-powered insights.</li>
            <li><strong>Intelligent Ticket Categorization:</strong> Automating classification with NLP models for accuracy and efficiency.</li>
            <li><strong>Sentiment-Based Prioritization:</strong> Analyzing user sentiment to dynamically adjust ticket priorities.</li>
          </ul>
        </div>
      </main>
      
      {/* About Section */}
      <section className="bg-white shadow-md p-6 mt-6 text-center rounded-lg mx-10">
        <h2 className="text-2xl font-semibold text-gray-900">Anticipated Impact</h2>
        <ul className="list-disc text-left mt-2 pl-6 text-gray-700">
          <li>🚀 <strong>Operational Efficiency:</strong> Faster ticket resolution and optimized workflows.</li>
          <li>🔍 <strong>Proactive Management:</strong> Early detection and prevention of escalations.</li>
          <li>👍 <strong>Enhanced User Experience:</strong> Improved service quality and customer satisfaction.</li>
          <li>⚙️ <strong>Scalability:</strong> A flexible framework adaptable to evolving ITSM needs.</li>
        </ul>
      </section>
      
      {/* Footer */}
      <footer className="text-center p-4 bg-gray-300 mt-auto text-sm text-gray-700 font-medium shadow-inner">
        &copy; 2025 AI-Powered Incident Management. All rights reserved.
      </footer>
      
      {/* Chatbot floating in bottom-right */}
      <Chatbot />
    </div>
  );
}

export default App;
