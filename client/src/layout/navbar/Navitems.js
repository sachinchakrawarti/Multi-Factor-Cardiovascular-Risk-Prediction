const NavItems = [
  {
    name: "Models",
    path: "/models",
    children: [
      { name: "SVM", path: "/models/svm" },
      { name: "Random Forest", path: "/models/random-forest" },
      { name: "KNN", path: "/models/knn" },
      { name: "Naive Bayes", path: "/models/naive-bayes" },
      { name: "Neural Network", path: "/models/neural-network" },
    ],
  },
  { name: "Test", path: "/test" },
  { name: "Login", path: "/login" },
  { name: "Register", path: "/register" },
  { name: "Dashboard", path: "/dashboard" },
];

export default NavItems;