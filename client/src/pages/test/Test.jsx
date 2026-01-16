import React, { useState } from "react";
import TestForm from "./components/TestForm";
import TestResult from "./components/TestResult";

const Test = () => {
  const [result, setResult] = useState(null);

  return (
    <div className="max-w-6xl mx-auto mt-6">
      <div className="flex space-x-6 h-[calc(100vh-100px)]">
        {/* Left: Form - Fixed height container */}
        <div className="flex-1">
          <div className="h-full border rounded-lg overflow-hidden shadow-sm">
            <TestForm setResult={setResult} />
          </div>
        </div>

        {/* Right: Result - Fixed height container */}
        <div className="flex-1">
          <div className="h-full border rounded-lg overflow-hidden shadow-sm">
            <TestResult result={result} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Test;
