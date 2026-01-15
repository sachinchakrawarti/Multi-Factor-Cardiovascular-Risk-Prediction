import React from "react";

export default function ConfusionMatrix({ matrix }) {
  // matrix = [[TN, FP], [FN, TP]]
  return (
    <div className="overflow-x-auto">
      <h4 className="font-semibold mb-2">Confusion Matrix</h4>
      <table className="table-auto border border-gray-300">
        <thead className="bg-gray-200">
          <tr>
            <th></th>
            <th className="px-4 py-2">Predicted 0</th>
            <th className="px-4 py-2">Predicted 1</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="px-4 py-2">Actual 0</td>
            <td className="px-4 py-2">{matrix[0][0]}</td>
            <td className="px-4 py-2">{matrix[0][1]}</td>
          </tr>
          <tr>
            <td className="px-4 py-2">Actual 1</td>
            <td className="px-4 py-2">{matrix[1][0]}</td>
            <td className="px-4 py-2">{matrix[1][1]}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
