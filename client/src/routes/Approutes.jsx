import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Test from "../pages/test/Test";
import Models from "../pages/Models/Models";
import LoginForm from "../pages/Auth/LoginForm";

export default function AppRoutes() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/test" element={<Test />} />
        <Route path="/models" element={<Models />} />
        <Route path="/login" element={<LoginForm />} />
      </Routes>
    </>
  );
}
