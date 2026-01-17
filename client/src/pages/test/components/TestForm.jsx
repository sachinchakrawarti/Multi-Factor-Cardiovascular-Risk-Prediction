import React, { useState } from "react";
import api from "../../../libs/Api";

const TestForm = ({ onSubmit, onSampleLoad }) => {
  const [formData, setFormData] = useState({
    Chest_Pain: 0.0,
    Shortness_of_Breath: 0.0,
    Fatigue: 0.0,
    Palpitations: 0.0,
    Dizziness: 0.0,
    Swelling: 0.0,
    Pain_Arms_Jaw_Back: 0.0,
    Cold_Sweats_Nausea: 0.0,
    High_BP: 0.0,
    High_Cholesterol: 0.0,
    Diabetes: 0.0,
    Smoking: 0.0,
    Obesity: 0.0,
    Sedentary_Lifestyle: 0.0,
    Family_History: 0.0,
    Chronic_Stress: 0.0,
    Gender: 0.0,
    Age: 30.0,
  });

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const featureDescriptions = api.getFeatureDescriptions();

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;

    let newValue;
    if (type === "checkbox") {
      newValue = checked ? 1.0 : 0.0;
    } else if (type === "range") {
      newValue = parseFloat(value);
    } else {
      newValue = type === "number" ? parseFloat(value) : value;
    }

    setFormData((prev) => ({
      ...prev,
      [name]: newValue,
    }));

    // Clear error for this field
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const validation = api.validatePatientData(formData);
    if (!validation.isValid) {
      const newErrors = {};
      validation.errors.forEach((error) => {
        const field = error.split(":")[0]?.trim();
        if (field) newErrors[field] = error;
      });
      setErrors(newErrors);
      return;
    }

    setLoading(true);
    onSubmit(formData).finally(() => setLoading(false));
  };

  const loadSampleData = (type) => {
    const sample = api.getSamplePatientData(type);
    setFormData(sample);
    if (onSampleLoad) {
      onSampleLoad(sample);
    }
  };

  const renderBooleanField = (key, desc) => (
    <div className="mb-4" key={key}>
      <div className="flex items-center">
        <input
          type="checkbox"
          id={key}
          name={key}
          checked={formData[key] === 1.0}
          onChange={handleInputChange}
          className={`h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500 ${
            errors[key] ? "border-red-500" : ""
          }`}
        />
        <label htmlFor={key} className="ml-3">
          <span className="block text-sm font-medium text-gray-900">
            {desc.label}
          </span>
          <span className="block text-sm text-gray-500">
            {desc.description}
          </span>
        </label>
      </div>
      {errors[key] && (
        <p className="mt-1 text-sm text-red-600">{errors[key]}</p>
      )}
    </div>
  );

  const renderNumberField = (key, desc) => (
    <div className="mb-6" key={key}>
      <label htmlFor={key} className="block">
        <span className="text-sm font-medium text-gray-900">{desc.label}</span>
        <span className="block text-sm text-gray-500">{desc.description}</span>
      </label>

      {desc.min !== undefined && desc.max !== undefined ? (
        <div className="mt-3">
          <input
            type="range"
            id={key}
            name={key}
            min={desc.min}
            max={desc.max}
            step={desc.step || 1}
            value={formData[key]}
            onChange={handleInputChange}
            className={`w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer ${
              errors[key] ? "border-red-500" : ""
            }`}
          />
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>{desc.min}</span>
            <span className="font-bold text-gray-900">{formData[key]}</span>
            <span>{desc.max}</span>
          </div>
        </div>
      ) : (
        <input
          type="number"
          id={key}
          name={key}
          value={formData[key]}
          onChange={handleInputChange}
          min={desc.min}
          max={desc.max}
          step={desc.step || 1}
          className={`mt-2 block w-full rounded-md border ${
            errors[key] ? "border-red-500" : "border-gray-300"
          } px-3 py-2 text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500`}
        />
      )}
      {errors[key] && (
        <p className="mt-1 text-sm text-red-600">{errors[key]}</p>
      )}
    </div>
  );

  return (
    <div className="bg-white shadow-lg rounded-xl overflow-hidden">
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 px-6 py-4">
        <h2 className="text-2xl font-bold text-white">Patient Information</h2>
        <p className="text-blue-100">
          Fill in all fields for accurate prediction
        </p>
      </div>

      <div className="p-6">
        {/* Sample Data Buttons */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">
            Quick Start with Sample Data:
          </h3>
          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => loadSampleData("low_risk")}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              Low Risk Sample
            </button>
            <button
              type="button"
              onClick={() => loadSampleData("medium_risk")}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-yellow-600 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
            >
              Medium Risk Sample
            </button>
            <button
              type="button"
              onClick={() => loadSampleData("high_risk")}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              High Risk Sample
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Symptoms Section */}
            <div className="space-y-6">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-5">
                <h3 className="text-lg font-semibold text-blue-900 mb-4 flex items-center">
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Symptoms
                </h3>
                <div className="space-y-4">
                  {renderNumberField(
                    "Chest_Pain",
                    featureDescriptions.Chest_Pain
                  )}
                  {renderBooleanField(
                    "Shortness_of_Breath",
                    featureDescriptions.Shortness_of_Breath
                  )}
                  {renderBooleanField("Fatigue", featureDescriptions.Fatigue)}
                  {renderBooleanField(
                    "Palpitations",
                    featureDescriptions.Palpitations
                  )}
                  {renderBooleanField(
                    "Dizziness",
                    featureDescriptions.Dizziness
                  )}
                  {renderBooleanField("Swelling", featureDescriptions.Swelling)}
                  {renderBooleanField(
                    "Pain_Arms_Jaw_Back",
                    featureDescriptions.Pain_Arms_Jaw_Back
                  )}
                  {renderBooleanField(
                    "Cold_Sweats_Nausea",
                    featureDescriptions.Cold_Sweats_Nausea
                  )}
                </div>
              </div>
            </div>

            {/* Risk Factors & Demographics */}
            <div className="space-y-6">
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-5">
                <h3 className="text-lg font-semibold text-yellow-900 mb-4 flex items-center">
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Risk Factors
                </h3>
                <div className="space-y-4">
                  {renderBooleanField("High_BP", featureDescriptions.High_BP)}
                  {renderBooleanField(
                    "High_Cholesterol",
                    featureDescriptions.High_Cholesterol
                  )}
                  {renderBooleanField("Diabetes", featureDescriptions.Diabetes)}
                  {renderBooleanField("Smoking", featureDescriptions.Smoking)}
                  {renderBooleanField("Obesity", featureDescriptions.Obesity)}
                  {renderBooleanField(
                    "Sedentary_Lifestyle",
                    featureDescriptions.Sedentary_Lifestyle
                  )}
                  {renderBooleanField(
                    "Family_History",
                    featureDescriptions.Family_History
                  )}
                  {renderBooleanField(
                    "Chronic_Stress",
                    featureDescriptions.Chronic_Stress
                  )}
                </div>
              </div>

              <div className="bg-gray-50 border border-gray-200 rounded-lg p-5">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
                  </svg>
                  Demographics
                </h3>
                <div className="space-y-4">
                  {renderBooleanField("Gender", featureDescriptions.Gender)}
                  {renderNumberField("Age", featureDescriptions.Age)}
                </div>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="mt-10 pt-6 border-t border-gray-200">
            <div className="flex justify-center">
              <button
                type="submit"
                disabled={loading}
                className="inline-flex items-center px-8 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-105"
              >
                {loading ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
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
                    Processing Prediction...
                  </>
                ) : (
                  <>
                    <svg
                      className="w-5 h-5 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      ></path>
                    </svg>
                    Predict Heart Disease Risk
                  </>
                )}
              </button>
            </div>
            <p className="text-center text-sm text-gray-500 mt-4">
              Click to analyze patient data using machine learning models
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TestForm;
