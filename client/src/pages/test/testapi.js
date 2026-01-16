import axios from "axios";

export const predictRisk = async (data) => {
  const response = await axios.post(
    "http://127.0.0.1:8000/logistic/predict/patient", // your FastAPI logistic route
    data,
    { headers: { "Content-Type": "application/json" } }
  );
  return response.data;
};
