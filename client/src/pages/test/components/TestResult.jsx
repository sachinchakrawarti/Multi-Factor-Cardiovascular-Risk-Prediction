import React from "react";

const getRiskColor = (prob) => {
  if (prob < 0.3) return "bg-green-500";
  if (prob < 0.7) return "bg-orange-500";
  return "bg-red-600";
};

const getRiskTextColor = (prob) => {
  if (prob < 0.3) return "text-green-600";
  if (prob < 0.7) return "text-orange-600";
  return "text-red-600";
};

const getRiskLabel = (prob) => {
  if (prob < 0.3) return "Low Risk";
  if (prob < 0.7) return "Medium Risk";
  return "High Risk";
};

const TestResult = ({ result }) => {
  if (!result) {
    return (
      <div className="h-full flex flex-col items-center justify-center p-6 text-gray-500">
        <div className="text-center">
          <div className="text-gray-400 mb-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-12 w-12 mx-auto"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-600">
            No Prediction Yet
          </h3>
          <p className="text-sm mt-1">
            Complete the form and click "Predict Risk" to see results
          </p>
        </div>
      </div>
    );
  }

  if (result.error) {
    return (
      <div className="h-full flex items-center justify-center p-6">
        <div className="text-center">
          <div className="text-red-400 mb-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-12 w-12 mx-auto"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-red-600">Error</h3>
          <p className="text-sm text-red-500 mt-1">{result.error}</p>
        </div>
      </div>
    );
  }

  const probability = result.predicted_probability || 0;
  const percentage = (probability * 100).toFixed(1);
  const riskColor = getRiskColor(probability);
  const riskTextColor = getRiskTextColor(probability);
  const riskLabel = getRiskLabel(probability);

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="border-b bg-gray-50 p-4">
        <h3 className="text-lg font-semibold text-gray-800">
          Prediction Result
        </h3>
        <p className="text-sm text-gray-600 mt-1">
          Heart Disease Risk Assessment
        </p>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 space-y-6">
        {/* Risk Level Card */}
        <div className="bg-white border rounded-lg p-4 shadow-sm">
          <div className="flex justify-between items-center mb-2">
            <h4 className="font-medium text-gray-700">Risk Level</h4>
            <span
              className={`px-3 py-1 rounded-full text-xs font-semibold ${riskTextColor} ${riskColor.replace(
                "bg-",
                "bg-opacity-20"
              )}`}
            >
              {riskLabel}
            </span>
          </div>

          {/* Probability Percentage */}
          <div className="text-center my-4">
            <div className={`text-4xl font-bold ${riskTextColor}`}>
              {percentage}%
            </div>
            <p className="text-sm text-gray-500 mt-1">
              Probability of Heart Disease
            </p>
          </div>

          {/* Progress Bar */}
          <div className="mt-4">
            <div className="flex justify-between text-sm text-gray-600 mb-1">
              <span>0%</span>
              <span>50%</span>
              <span>100%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div
                className={`h-3 rounded-full ${riskColor} transition-all duration-500`}
                style={{ width: `${percentage}%` }}
              ></div>
            </div>
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>Low</span>
              <span>Medium</span>
              <span>High</span>
            </div>
          </div>
        </div>

        {/* Details Card */}
        <div className="bg-white border rounded-lg p-4 shadow-sm">
          <h4 className="font-medium text-gray-700 mb-3">Prediction Details</h4>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Predicted Class:</span>
              <span className="text-sm font-medium">
                {result.predicted_class || "N/A"}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Risk Band:</span>
              <span className="text-sm font-medium">
                {result.risk_band || "N/A"}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Raw Probability:</span>
              <span className="text-sm font-medium">
                {probability.toFixed(4)}
              </span>
            </div>
          </div>
        </div>

        {/* Risk Interpretation */}
        <div className="bg-white border rounded-lg p-4 shadow-sm">
          <h4 className="font-medium text-gray-700 mb-2">Interpretation</h4>
          <div className="text-sm text-gray-600 space-y-2">
            {probability < 0.3 ? (
              <>
                <p>
                  ✅ <span className="font-medium">Low Risk:</span> Your
                  assessment indicates a low probability of heart disease.
                </p>
                <p>
                  Continue maintaining healthy lifestyle habits and regular
                  check-ups.
                </p>
              </>
            ) : probability < 0.7 ? (
              <>
                <p>
                  ⚠️ <span className="font-medium">Medium Risk:</span> Your
                  assessment suggests moderate risk factors.
                </p>
                <p>
                  Consider consulting a healthcare professional for further
                  evaluation.
                </p>
              </>
            ) : (
              <>
                <p>
                  🚨 <span className="font-medium">High Risk:</span> Your
                  assessment indicates significant risk factors.
                </p>
                <p>
                  We recommend consulting a healthcare professional for proper
                  evaluation and guidance.
                </p>
              </>
            )}
          </div>
          <div className="mt-3 pt-3 border-t text-xs text-gray-500">
            <p>
              <strong>Note:</strong> This is a predictive model assessment only
              and not a medical diagnosis.
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="border-t bg-gray-50 p-4">
        <div className="text-xs text-gray-500 text-center">
          <p>Results generated: {new Date().toLocaleDateString()}</p>
          <p className="mt-1">
            Consult a healthcare professional for medical advice
          </p>
        </div>
      </div>
    </div>
  );
};

export default TestResult;
