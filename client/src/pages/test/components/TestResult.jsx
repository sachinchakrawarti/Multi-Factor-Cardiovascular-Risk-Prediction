import React from "react";
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  ArcElement,
} from "chart.js";
import { Radar, Bar, Doughnut } from "react-chartjs-2";

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  ArcElement
);

const TestResult = ({ result, isLoading, error }) => {
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
        <h3 className="mt-4 text-lg font-medium text-gray-900">
          Analyzing Patient Data
        </h3>
        <p className="mt-2 text-sm text-gray-500">
          Running predictions through machine learning models...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-lg bg-red-50 p-6">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg
              className="h-5 w-5 text-red-400"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div className="ml-3">
            <h3 className="text-lg font-medium text-red-800">
              Error Processing Request
            </h3>
            <div className="mt-2 text-sm text-red-700">
              <p>
                {error.message ||
                  "An error occurred while processing your request."}
              </p>
              <p className="mt-1">
                Please check your input data and try again.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!result) {
    return (
      <div className="rounded-lg bg-blue-50 p-6">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg
              className="h-5 w-5 text-blue-400"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div className="ml-3">
            <h3 className="text-lg font-medium text-blue-800">
              No Results Yet
            </h3>
            <div className="mt-2 text-sm text-blue-700">
              <p>Submit patient data to see heart disease risk predictions.</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const { logisticRegression, randomForest, comparison } = result;

  const getRiskColor = (riskLevel) => {
    switch (riskLevel?.toLowerCase()) {
      case "low":
        return "bg-green-100 text-green-800";
      case "medium":
        return "bg-yellow-100 text-yellow-800";
      case "high":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const probabilityData = {
    labels: ["Logistic Regression", "Random Forest"],
    datasets: [
      {
        data: [logisticRegression.probability, randomForest.probability],
        backgroundColor: ["rgba(59, 130, 246, 0.8)", "rgba(239, 68, 68, 0.8)"],
        borderColor: ["rgba(59, 130, 246, 1)", "rgba(239, 68, 68, 1)"],
        borderWidth: 1,
      },
    ],
  };

  const modelComparisonData = {
    labels: ["Accuracy", "Precision", "Recall", "F1 Score", "ROC AUC"],
    datasets: [
      {
        label: "Logistic Regression",
        data: [0.872, 0.856, 0.892, 0.874, 0.934],
        backgroundColor: "rgba(59, 130, 246, 0.5)",
        borderColor: "rgba(59, 130, 246, 1)",
        borderWidth: 1,
      },
      {
        label: "Random Forest",
        data: [0.892, 0.876, 0.912, 0.894, 0.954],
        backgroundColor: "rgba(239, 68, 68, 0.5)",
        borderColor: "rgba(239, 68, 68, 1)",
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="space-y-6">
      {/* Summary Card */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="px-6 py-4 bg-gradient-to-r from-green-600 to-emerald-600">
          <h2 className="text-2xl font-bold text-white">
            Risk Assessment Summary
          </h2>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <div
                className={`rounded-lg p-4 ${getRiskColor(
                  comparison.finalRecommendation.risk
                )}`}
              >
                <h3 className="text-xl font-bold mb-2">
                  Overall Risk: {comparison.finalRecommendation.risk}
                </h3>
                <p className="mb-3">{comparison.finalRecommendation.action}</p>
                <div className="flex items-center space-x-4">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      comparison.modelsAgree === "YES"
                        ? "bg-green-200 text-green-800"
                        : "bg-yellow-200 text-yellow-800"
                    }`}
                  >
                    Models Agree: {comparison.modelsAgree}
                  </span>
                  <span className="px-3 py-1 rounded-full text-sm font-medium bg-blue-200 text-blue-800">
                    Confidence: {comparison.finalRecommendation.confidence}
                  </span>
                </div>
              </div>
              {comparison.finalRecommendation.note && (
                <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <p className="text-yellow-800 text-sm">
                    {comparison.finalRecommendation.note}
                  </p>
                </div>
              )}
            </div>
            <div>
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 mb-3">
                  Probability Distribution
                </h4>
                <div className="h-64">
                  <Doughnut
                    data={probabilityData}
                    options={{
                      plugins: {
                        legend: {
                          position: "bottom",
                        },
                      },
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Model Results */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Logistic Regression */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="px-6 py-4 bg-gradient-to-r from-blue-600 to-indigo-600">
            <h3 className="text-xl font-bold text-white flex items-center">
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                />
              </svg>
              Logistic Regression
            </h3>
          </div>
          <div className="p-6">
            <div className="text-center mb-6">
              <span
                className={`inline-block px-4 py-2 rounded-full text-lg font-bold ${getRiskColor(
                  logisticRegression.risk_level
                )}`}
              >
                {logisticRegression.risk_level} Risk
              </span>
              <div className="mt-4">
                <div className="text-4xl font-bold text-gray-900">
                  {(logisticRegression.probability * 100).toFixed(1)}%
                </div>
                <p className="text-gray-500">Probability of Heart Disease</p>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                <span className="font-medium text-blue-900">Prediction:</span>
                <span className="font-semibold">
                  {logisticRegression.prediction}
                </span>
              </div>
              <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                <span className="font-medium text-blue-900">Confidence:</span>
                <span className="px-3 py-1 rounded-full text-sm font-medium bg-blue-200 text-blue-800">
                  {logisticRegression.confidence}
                </span>
              </div>
            </div>

            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <h4 className="font-semibold text-gray-900 mb-2">
                Recommendation:
              </h4>
              <p className="text-gray-700">
                {logisticRegression.recommendation}
              </p>
            </div>
          </div>
        </div>

        {/* Random Forest */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="px-6 py-4 bg-gradient-to-r from-red-600 to-pink-600">
            <h3 className="text-xl font-bold text-white flex items-center">
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                />
              </svg>
              Random Forest
            </h3>
          </div>
          <div className="p-6">
            <div className="text-center mb-6">
              <span
                className={`inline-block px-4 py-2 rounded-full text-lg font-bold ${getRiskColor(
                  randomForest.risk_level
                )}`}
              >
                {randomForest.risk_level} Risk
              </span>
              <div className="mt-4">
                <div className="text-4xl font-bold text-gray-900">
                  {(randomForest.probability * 100).toFixed(1)}%
                </div>
                <p className="text-gray-500">Probability of Heart Disease</p>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg">
                <span className="font-medium text-red-900">Prediction:</span>
                <span className="font-semibold">{randomForest.prediction}</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg">
                <span className="font-medium text-red-900">Confidence:</span>
                <span className="px-3 py-1 rounded-full text-sm font-medium bg-red-200 text-red-800">
                  {randomForest.confidence}
                </span>
              </div>
              <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg">
                <span className="font-medium text-red-900">
                  Decision Trees:
                </span>
                <span className="font-semibold">
                  {randomForest.trees_used || 100}
                </span>
              </div>
            </div>

            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <h4 className="font-semibold text-gray-900 mb-2">
                Recommendation:
              </h4>
              <p className="text-gray-700">{randomForest.recommendation}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Model Performance Comparison
          </h3>
          <div className="h-80">
            <Bar
              data={modelComparisonData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                  y: {
                    beginAtZero: true,
                    max: 1,
                    ticks: {
                      callback: (value) => (value * 100).toFixed(0) + "%",
                    },
                  },
                },
                plugins: {
                  legend: {
                    position: "top",
                  },
                },
              }}
            />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Detailed Comparison
          </h3>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Metric
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Logistic Regression
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Random Forest
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr>
                  <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">
                    Prediction
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                    {logisticRegression.prediction}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                    {randomForest.prediction}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${
                        comparison.samePrediction
                          ? "bg-green-100 text-green-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {comparison.samePrediction ? "✓ Agree" : "✗ Disagree"}
                    </span>
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">
                    Probability
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                    {(logisticRegression.probability * 100).toFixed(2)}%
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                    {(randomForest.probability * 100).toFixed(2)}%
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                    Δ{(comparison.probabilityDifference * 100).toFixed(2)}%
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">
                    Risk Level
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${getRiskColor(
                        logisticRegression.risk_level
                      )}`}
                    >
                      {logisticRegression.risk_level}
                    </span>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${getRiskColor(
                        randomForest.risk_level
                      )}`}
                    >
                      {randomForest.risk_level}
                    </span>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                    {logisticRegression.risk_level === randomForest.risk_level
                      ? "Same"
                      : "Different"}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Disclaimer */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg
              className="h-5 w-5 text-yellow-400"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div className="ml-3">
            <h3 className="text-lg font-medium text-yellow-800">
              Important Medical Disclaimer
            </h3>
            <div className="mt-2 text-sm text-yellow-700">
              <p>
                This prediction is based on machine learning models and should
                not replace professional medical advice. The results are for
                informational purposes only. Please consult with a healthcare
                professional for accurate diagnosis and treatment.
              </p>
              <p className="mt-2">
                The models were trained on historical data and may not account
                for all individual circumstances. Always seek the advice of a
                qualified healthcare provider with any questions you may have
                regarding a medical condition.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestResult;
