import React, { useState } from "react";
import axios from "axios";

const initialData = {
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
  Gender: 1,
  Age: 50,
};

export default function Test() {
  const [formData, setFormData] = useState(initialData);
  const [prediction, setPrediction] = useState(null);
  const [metrics, setMetrics] = useState(null);
  const [loading, setLoading] = useState(false);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: Number(value) });
  };

  // Call SVM predict API
  const handlePredict = async () => {
    setLoading(true);
    try {
      const res = await axios.post(
        "http://127.0.0.1:8000/svm/predict",
        formData,
      );
      setPrediction(res.data);
    } catch (err) {
      console.error(err);
      setPrediction({ error: "Failed to get prediction" });
    } finally {
      setLoading(false);
    }
  };

  // Call SVM metrics API
  const handleMetrics = async () => {
    try {
      const res = await axios.get("http://127.0.0.1:8000/svm/metrics");
      setMetrics(res.data);
    } catch (err) {
      console.error(err);
      setMetrics({ error: "Failed to fetch metrics" });
    }
  };

  return (
    <div style={styles.container}>
      {/* Left panel: Input form */}
      <div style={styles.left}>
        <h2 style={styles.heading}>SVM Test Form</h2>
        {Object.keys(formData).map((key) => (
          <div key={key} style={styles.inputGroup}>
            <label style={styles.label}>{key}</label>
            <input
              type="number"
              name={key}
              value={formData[key]}
              min={0}
              max={key === "Age" ? 120 : 1}
              onChange={handleChange}
              style={styles.input}
            />
          </div>
        ))}

        <div style={styles.buttonGroup}>
          <button
            onClick={handlePredict}
            disabled={loading}
            style={styles.button}
          >
            {loading ? "Predicting..." : "Predict SVM"}
          </button>
          <button
            onClick={handleMetrics}
            style={{
              ...styles.button,
              marginLeft: "10px",
              backgroundColor: "#4caf50",
            }}
          >
            Get Metrics
          </button>
        </div>
      </div>

      {/* Right panel: Results */}
      <div style={styles.right}>
        <h2 style={styles.heading}>Results</h2>

        {/* Prediction */}
        {prediction && (
          <div>
            <h3>Prediction:</h3>
            <pre style={styles.resultBox}>
              {JSON.stringify(prediction, null, 2)}
            </pre>
          </div>
        )}

        {/* Metrics */}
        {metrics && (
          <div style={{ marginTop: "20px" }}>
            <h3>Metrics:</h3>
            <pre style={styles.resultBox}>
              {JSON.stringify(metrics, null, 2)}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}

// ----------------------------
// Styles
// ----------------------------
const styles = {
  container: {
    display: "flex",
    gap: "50px",
    padding: "20px",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
  left: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0px 0px 10px rgba(0,0,0,0.1)",
  },
  right: {
    flex: 1,
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0px 0px 10px rgba(0,0,0,0.1)",
  },
  heading: {
    textAlign: "center",
    marginBottom: "20px",
    color: "#333",
  },
  inputGroup: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "12px",
  },
  label: {
    flex: 1,
    fontWeight: "bold",
    color: "#555",
  },
  input: {
    flex: 1,
    padding: "6px 10px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    textAlign: "center",
  },
  buttonGroup: {
    marginTop: "20px",
    textAlign: "center",
  },
  button: {
    padding: "10px 20px",
    borderRadius: "5px",
    border: "none",
    backgroundColor: "#2196f3",
    color: "#fff",
    cursor: "pointer",
    fontWeight: "bold",
  },
  resultBox: {
    backgroundColor: "#f0f0f0",
    padding: "15px",
    borderRadius: "5px",
    maxHeight: "400px",
    overflowY: "auto",
    whiteSpace: "pre-wrap",
  },
};
