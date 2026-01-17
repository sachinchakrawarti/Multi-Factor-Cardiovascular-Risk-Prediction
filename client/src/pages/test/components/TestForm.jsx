import React, { useState } from "react";
import { predictRisk } from "../testapi";

const QUESTIONS = [
  { key: "Chest_Pain", question: "Do you have chest pain?" },
  {
    key: "Shortness_of_Breath",
    question: "Do you experience shortness of breath?",
  },
  { key: "Fatigue", question: "Do you often feel fatigued?" },
  { key: "Palpitations", question: "Do you have palpitations?" },
  { key: "Dizziness", question: "Do you feel dizzy?" },
  { key: "Swelling", question: "Do you have swelling?" },
  {
    key: "Pain_Arms_Jaw_Back",
    question: "Do you have pain in arms, jaw, or back?",
  },
  {
    key: "Cold_Sweats_Nausea",
    question: "Do you experience cold sweats or nausea?",
  },
  { key: "High_BP", question: "Do you have high blood pressure?" },
  { key: "High_Cholesterol", question: "Do you have high cholesterol?" },
  { key: "Diabetes", question: "Do you have diabetes?" },
  { key: "Smoking", question: "Do you smoke?" },
  { key: "Obesity", question: "Do you have obesity?" },
  {
    key: "Sedentary_Lifestyle",
    question: "Do you have a sedentary lifestyle?",
  },
  {
    key: "Family_History",
    question: "Do you have a family history of heart disease?",
  },
  { key: "Chronic_Stress", question: "Do you experience chronic stress?" },
  { key: "Gender", question: "What is your gender?" },
  { key: "Age", question: "What is your age?" },
];

const TestForm = ({ setResult }) => {
  const [formData, setFormData] = useState({
    Chest_Pain: 0,
    Shortness_of_Breath: 0,
    Fatigue: 0,
    Palpitations: 0,
    Dizziness: 0,
    Swelling: 0,
    Pain_Arms_Jaw_Back: 0,
    Cold_Sweats_Nausea: 0,
    High_BP: 0,
    High_Cholesterol: 0,
    Diabetes: 0,
    Smoking: 0,
    Obesity: 0,
    Sedentary_Lifestyle: 0,
    Family_History: 0,
    Chronic_Stress: 0,
    Gender: 1,
    Age: 50,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const questionsPerPage = 4;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === "Age" ? parseFloat(value) : parseInt(value),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await predictRisk(formData);
      setResult(res);
    } catch (err) {
      console.error(err);
      setError("Failed to get prediction. Check API server.");
    } finally {
      setLoading(false);
    }
  };

  const totalPages = Math.ceil(QUESTIONS.length / questionsPerPage);
  const startIndex = currentPage * questionsPerPage;
  const endIndex = startIndex + questionsPerPage;
  const currentQuestions = QUESTIONS.slice(startIndex, endIndex);

  return (
    <form onSubmit={handleSubmit} className="h-full flex flex-col">
      {/* Progress indicator with question count */}
      <div className="border-b bg-gray-50 p-3">
        <div className="flex justify-between items-center mb-1">
          <div className="text-md font-semibold text-gray-800">
            Heart Disease Risk Assessment
          </div>
          <span className="text-xs font-medium text-gray-600">
            Page {currentPage + 1} of {totalPages}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <div className="text-xs text-gray-600">
            Questions {startIndex + 1} to {Math.min(endIndex, QUESTIONS.length)}{" "}
            of {QUESTIONS.length}
          </div>
          <div className="flex space-x-1">
            {Array.from({ length: totalPages }).map((_, idx) => (
              <div
                key={idx}
                className={`w-2 h-2 rounded-full ${
                  idx === currentPage ? "bg-blue-600" : "bg-gray-300"
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Current questions with numbers - No scrolling, compact layout */}
      <div className="flex-1 p-3 space-y-2">
        {currentQuestions.map(({ key, question }, index) => {
          const questionNumber = startIndex + index + 1;
          return (
            <div key={key} className="bg-white p-2 rounded border">
              <div className="flex items-center space-x-2">
                <div className="flex-shrink-0">
                  <div className="w-6 h-6 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center text-xs font-semibold">
                    {questionNumber}
                  </div>
                </div>
                <div className="flex-1">
                  <label className="block text-sm text-gray-800 font-medium">
                    {question}
                  </label>
                  <div className="mt-1">
                    {key === "Age" ? (
                      <input
                        type="number"
                        name={key}
                        value={formData[key]}
                        onChange={handleChange}
                        min={0}
                        max={120}
                        className="border border-gray-300 rounded px-2 py-1 text-sm w-24 focus:outline-none focus:ring-1 focus:ring-blue-500"
                      />
                    ) : key === "Gender" ? (
                      <select
                        name={key}
                        value={formData[key]}
                        onChange={handleChange}
                        className="border border-gray-300 rounded px-2 py-1 text-sm w-full focus:outline-none focus:ring-1 focus:ring-blue-500"
                      >
                        <option value={1}>Male</option>
                        <option value={0}>Female</option>
                      </select>
                    ) : (
                      <select
                        name={key}
                        value={formData[key]}
                        onChange={handleChange}
                        className="border border-gray-300 rounded px-2 py-1 text-sm w-full focus:outline-none focus:ring-1 focus:ring-blue-500"
                      >
                        <option value={0}>No</option>
                        <option value={1}>Yes</option>
                      </select>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Navigation buttons */}
      <div className="border-t bg-gray-50 p-3">
        <div className="flex justify-between">
          <button
            type="button"
            onClick={() => setCurrentPage((prev) => Math.max(0, prev - 1))}
            disabled={currentPage === 0}
            className="px-3 py-1.5 border border-gray-300 rounded text-sm text-gray-700 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            ← Previous
          </button>

          {currentPage < totalPages - 1 ? (
            <button
              type="button"
              onClick={() =>
                setCurrentPage((prev) => Math.min(totalPages - 1, prev + 1))
              }
              className="px-3 py-1.5 bg-blue-600 text-white rounded text-sm hover:bg-blue-700 transition-colors"
            >
              Next →
            </button>
          ) : (
            <button
              type="submit"
              className="px-3 py-1.5 bg-green-600 text-white rounded text-sm hover:bg-green-700 transition-colors disabled:opacity-50"
              disabled={loading}
            >
              {loading ? (
                <span className="flex items-center text-sm">
                  <svg
                    className="animate-spin -ml-1 mr-1 h-3 w-3 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Predicting...
                </span>
              ) : (
                "Predict Risk"
              )}
            </button>
          )}
        </div>

        {error && (
          <div className="mt-2 p-2 bg-red-50 border border-red-200 rounded">
            <p className="text-red-600 text-center text-sm">{error}</p>
          </div>
        )}
      </div>
    </form>
  );
};

export default TestForm;
