import React, { useState } from "react";
import ModelBarChart from "./ModelBarChart";
import ModelPieChart from "./ModelPieChart";
import ConfusionMatrix from "./ConfusionMatrix";

export default function ModelCard({ model }) {
  const [showEDA, setShowEDA] = useState(false);

  const chartData = [
    { metric: "Accuracy", value: model.accuracy },
    { metric: "Precision", value: model.precision },
    { metric: "Recall", value: model.recall },
    { metric: "F1 Score", value: model.f1_score },
    { metric: "AUC", value: model.auc },
  ];

  const classDistribution = [
    { name: "Negative", value: model.class_distribution.negative },
    { name: "Positive", value: model.class_distribution.positive },
  ];

  return (
    <div className="bg-white shadow-md rounded-lg p-4 w-full md:w-1/2 lg:w-1/3 cursor-pointer hover:shadow-xl transition">
      <h2
        className="text-xl font-bold mb-4"
        onClick={() => setShowEDA(!showEDA)}
      >
        {model.name} {showEDA ? "▲" : "▼"}
      </h2>

      {/* Metrics */}
      <div className="mb-4">
        <p>Accuracy: {(model.accuracy * 100).toFixed(2)}%</p>
        <p>Precision: {(model.precision * 100).toFixed(2)}%</p>
        <p>Recall: {(model.recall * 100).toFixed(2)}%</p>
        <p>F1 Score: {(model.f1_score * 100).toFixed(2)}%</p>
        <p>AUC: {(model.auc * 100).toFixed(2)}%</p>
      </div>

      <ModelBarChart data={chartData} modelName={model.name} />

      <div className="mt-4">
        <ModelPieChart data={classDistribution} title="Class Distribution" />
      </div>

      {showEDA && (
        <div className="mt-4">
          <ConfusionMatrix matrix={model.confusion_matrix} />
        </div>
      )}
    </div>
  );
}
