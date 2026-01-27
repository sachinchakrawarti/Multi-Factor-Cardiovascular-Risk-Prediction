import { Link } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import NavItems from "./Navitems";

export default function Navbar() {
  const [openDropdown, setOpenDropdown] = useState(null);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpenDropdown(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="w-full bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-3 text-xl font-bold text-blue-600 hover:text-blue-700 transition-colors"
        >
          <div className="relative">
            <span className="text-3xl animate-pulse">🫀</span>
            <div className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full animate-ping"></div>
          </div>
          <div className="flex flex-col">
            <span className="text-2xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              CVD Risk Predictor
            </span>
            <span className="text-xs text-gray-500 font-normal">
              Advanced AI Diagnostics
            </span>
          </div>
        </Link>

        {/* Navigation */}
        <ul className="flex gap-8 text-gray-700 font-medium" ref={dropdownRef}>
          {NavItems.map((item) => (
            <li key={item.name} className="relative">
              {/* If item has dropdown */}
              {item.children ? (
                <div className="relative">
                  <button
                    onClick={() =>
                      setOpenDropdown(
                        openDropdown === item.name ? null : item.name,
                      )
                    }
                    className="flex items-center gap-1.5 hover:text-blue-600 transition-colors group"
                  >
                    <span className="font-semibold">{item.name}</span>
                    <svg
                      className={`w-4 h-4 transition-transform duration-200 ${
                        openDropdown === item.name ? "rotate-180" : ""
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>

                  {/* Dropdown menu */}
                  <div
                    className={`absolute left-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-2xl shadow-blue-100/50
                      transition-all duration-200 origin-top z-50 ${
                        openDropdown === item.name
                          ? "opacity-100 visible scale-100 translate-y-0"
                          : "opacity-0 invisible scale-95 -translate-y-2"
                      }`}
                  >
                    {/* Arrow pointer */}
                    <div className="absolute -top-2 left-4 w-4 h-4 bg-white border-t border-l border-gray-200 transform rotate-45"></div>

                    <div className="relative bg-white rounded-xl p-2 min-w-[200px]">
                      {item.children.map((child, index) => (
                        <div
                          key={child.name}
                          className="relative overflow-hidden rounded-lg hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50"
                        >
                          <Link
                            to={child.path}
                            className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:text-blue-600 transition-colors group/child"
                            onClick={() => setOpenDropdown(null)}
                          >
                            <div className="w-2 h-2 bg-blue-400 rounded-full group-hover/child:scale-125 transition-transform"></div>
                            <span className="font-medium">{child.name}</span>
                            <svg
                              className="w-4 h-4 ml-auto opacity-0 -translate-x-2 group-hover/child:opacity-100 group-hover/child:translate-x-0 transition-all"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M9 5l7 7-7 7"
                              />
                            </svg>
                          </Link>
                          {index < item.children.length - 1 && (
                            <div className="mx-4 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent"></div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <Link
                  to={item.path}
                  className="relative hover:text-blue-600 transition-colors group"
                >
                  <span className="font-semibold">{item.name}</span>
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 group-hover:w-full transition-all duration-300"></span>
                </Link>
              )}
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
