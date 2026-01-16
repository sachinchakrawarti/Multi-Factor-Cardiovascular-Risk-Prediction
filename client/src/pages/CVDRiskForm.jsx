import React, { useState } from "react";
import axios from "axios";

const CVDRiskForm = () => {
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
    Gender: 1, // 1 = Male, 0 = Female
    Age: 50,
  });

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === "Age" ? parseFloat(value) : parseInt(value),
    });
  };

  // Submit form to API
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/logistic/predict/patient",
        formData
      );
      setResult(response.data);
    } catch (error) {
      console.error("API error:", error);
      setResult({ error: "Failed to get prediction. Check API server." });
    } finally {
      setLoading(false);
    }
  };

  // Risk color for progress bar
  const getRiskColor = (prob) => {
    if (prob < 0.3) return "green";
    if (prob < 0.7) return "orange";
    return "red";
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded shadow mt-6">
      <h2 className="text-2xl font-bold mb-4">
        Cardiovascular Risk Prediction
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Binary & Gender Inputs */}
        {Object.keys(formData)
          .filter((key) => key !== "Age")
          .map((key) => (
            <div key={key} className="flex justify-between items-center">
              <label className="capitalize">{key.replace(/_/g, " ")}</label>
              <select
                name={key}
                value={formData[key]}
                onChange={handleChange}
                className="border rounded p-1"
              >
                <option value={0}>No</option>
                <option value={1}>Yes</option>
              </select>
            </div>
          ))}

        {/* Age Input */}
        <div className="flex justify-between items-center">
          <label>Age</label>
          <input
            type="number"
            name="Age"
            value={formData.Age}
            onChange={handleChange}
            min={0}
            max={120}
            className="border rounded p-1 w-20"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          {loading ? "Predicting..." : "Predict Risk"}
        </button>
      </form>

      {/* Prediction Result */}
      {result && (
        <div className="mt-6 p-4 rounded border-l-4 border-orange-400 bg-orange-50">
          {result.error ? (
            <p className="text-red-600">{result.error}</p>
          ) : (
            <>
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
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default CVDRiskForm;
