import React from "react";

const getRiskColor = (prob) => {
  if (prob < 0.3) return "green";
  if (prob < 0.7) return "orange";
  return "red";
};

const TestResult = ({ result }) => {
  if (!result) return <div className="p-4">Prediction will appear here</div>;

  if (result.error)
    return <div className="text-red-600 p-4">{result.error}</div>;

  return (
    <div className="p-4 border rounded">
      <h3 className="text-xl font-bold mb-2">Prediction Result</h3>
      <p>
        <strong>Predicted Class:</strong> {result.predicted_class} (
        {result.risk_band})
      </p>
      <p>
        <strong>Probability:</strong> {result.predicted_probability}
      </p>
      <div className="w-full bg-gray-200 rounded h-4 mt-2">
        <div
          className="h-4 rounded"
          style={{
            width: `${(result.predicted_probability || 0) * 100}%`,
            backgroundColor: getRiskColor(result.predicted_probability),
          }}
        ></div>
      </div>
    </div>
  );
};

export default TestResult;
