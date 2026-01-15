import React from "react";
import { FaHeartbeat, FaUserMd, FaChartLine } from "react-icons/fa";

export default function App() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-gray-100">
      {/* Main Card */}
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-3xl p-10 border border-gray-200">
        {/* Header */}
        <div className="flex items-center justify-center mb-6">
          <FaHeartbeat className="text-red-500 text-5xl mr-4" />
          <h1 className="text-3xl font-bold text-gray-800 text-center">
            Multi-Factor Cardiovascular Risk Prediction
          </h1>
        </div>

        {/* Description */}
        <p className="text-gray-600 text-center mb-8 leading-relaxed">
          An intelligent system designed to predict cardiovascular disease risk
          using multiple clinical and lifestyle factors. This application
          supports early detection and informed medical decision-making.
        </p>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="flex flex-col items-center text-center p-4 rounded-xl bg-gray-50">
            <FaUserMd className="text-blue-500 text-3xl mb-3" />
            <h3 className="font-semibold text-gray-800">Clinical Factors</h3>
            <p className="text-sm text-gray-600">
              Age, blood pressure, cholesterol, and medical history
            </p>
          </div>

          <div className="flex flex-col items-center text-center p-4 rounded-xl bg-gray-50">
            <FaChartLine className="text-green-500 text-3xl mb-3" />
            <h3 className="font-semibold text-gray-800">Risk Analysis</h3>
            <p className="text-sm text-gray-600">
              Advanced models assess risk with high accuracy
            </p>
          </div>

          <div className="flex flex-col items-center text-center p-4 rounded-xl bg-gray-50">
            <FaHeartbeat className="text-red-500 text-3xl mb-3" />
            <h3 className="font-semibold text-gray-800">Early Prevention</h3>
            <p className="text-sm text-gray-600">
              Helps identify risks before critical events occur
            </p>
          </div>
        </div>

        {/* Button */}
        <div className="flex justify-center">
          <button className="px-8 py-3 rounded-xl bg-red-500 text-white font-semibold hover:bg-red-600 transition duration-300">
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
}
