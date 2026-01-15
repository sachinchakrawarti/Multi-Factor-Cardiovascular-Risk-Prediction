import { Link } from "react-router-dom";
import NavItems from "./Navitems";

export default function Navbar() {
  return (
    <nav className="w-full bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2 text-xl font-bold text-blue-600 hover:text-blue-700 transition"
        >
          <span className="text-2xl">🫀</span>
          <span>CVD Risk Predictor</span>
        </Link>

        {/* Navigation */}
        <ul className="flex gap-8 text-gray-700 font-medium">
          {NavItems.map((item) => (
            <li key={item.name}>
              <Link
                to={item.path}
                className="hover:text-blue-600 cursor-pointer transition"
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
