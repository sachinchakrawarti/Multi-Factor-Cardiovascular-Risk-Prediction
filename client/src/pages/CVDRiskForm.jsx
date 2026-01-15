import { useState } from "react";

export default function CVDRiskForm() {
  const [formData, setFormData] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-2xl bg-gray-800 p-6 rounded-2xl shadow-lg space-y-4"
      >
        <h1 className="text-2xl font-bold text-center text-green-400">
          Multi-Factor Cardiovascular Risk Prediction
        </h1>

        {/* Dropdowns */}
        {[
          "General_Health",
          "Checkup",
          "Exercise",
          "Sex",
          "Age_Category",
          "Smoking_History",
          "Skin_Cancer",
          "Other_Cancer",
          "Depression",
          "Diabetes",
          "Arthritis",
        ].map((field) => (
          <select
            key={field}
            name={field}
            onChange={handleChange}
            className="w-full p-2 rounded bg-gray-700 border border-gray-600"
          >
            <option value="">{field.replaceAll("_", " ")}</option>
            <option>Yes</option>
            <option>No</option>
          </select>
        ))}

        {/* Numeric Inputs */}
        {[
          "Height_cm",
          "Weight_kg",
          "BMI",
          "Alcohol_Consumption",
          "Fruit_Consumption",
          "Green_Vegetables_Consumption",
          "FriedPotato_Consumption",
        ].map((field) => (
          <input
            key={field}
            type="number"
            name={field}
            placeholder={field.replaceAll("_", " ")}
            onChange={handleChange}
            className="w-full p-2 rounded bg-gray-700 border border-gray-600"
          />
        ))}

        <button
          type="submit"
          className="w-full bg-green-500 hover:bg-green-600 p-2 rounded font-semibold"
        >
          Predict Risk
        </button>
      </form>
    </div>
  );
}
