import React, { useState } from "react";
import ModelCard from "./components/ModelCard";

// Example 4 models
const modelData = [
  {
    name: "Model_1 (Logistic Regression)",
    accuracy: 0.87,
    precision: 0.85,
    recall: 0.83,
    f1_score: 0.84,
    auc: 0.88,
    class_distribution: { positive: 120, negative: 380 },
    confusion_matrix: [
      [350, 30], // Actual 0: TN, FP
      [20, 100], // Actual 1: FN, TP
    ],
  },
  {
    name: "Model_2 (Random Forest)",
    accuracy: 0.92,
    precision: 0.91,
    recall: 0.9,
    f1_score: 0.905,
    auc: 0.94,
    class_distribution: { positive: 120, negative: 380 },
    confusion_matrix: [
      [360, 20],
      [15, 105],
    ],
  },
  {
    name: "Model_3 (XGBoost)",
    accuracy: 0.94,
    precision: 0.93,
    recall: 0.92,
    f1_score: 0.925,
    auc: 0.96,
    class_distribution: { positive: 120, negative: 380 },
    confusion_matrix: [
      [365, 15],
      [10, 110],
    ],
  },
  {
    name: "Model_4 (SVM)",
    accuracy: 0.88,
    precision: 0.86,
    recall: 0.85,
    f1_score: 0.855,
    auc: 0.89,
    class_distribution: { positive: 120, negative: 380 },
    confusion_matrix: [
      [355, 25],
      [18, 102],
    ],
  },
];

export default function Models() {
  const [filter, setFilter] = useState(""); // filter by name

  const filteredModels = modelData.filter((m) =>
    m.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-10">
      <h1 className="text-3xl font-bold mb-6">All Models Dashboard</h1>

      <input
        type="text"
        placeholder="Filter models..."
        className="mb-6 p-2 border rounded-md w-full md:w-1/2"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      />

      <div className="flex flex-wrap gap-6">
        {filteredModels.map((model) => (
          <ModelCard key={model.name} model={model} />
        ))}
      </div>
    </div>
  );
}
