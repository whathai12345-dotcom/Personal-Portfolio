import { useEffect, useState } from "react";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import ProjectDashboard from "./components/ProjectDashboard";
import AdminLogin from "./components/AdminLogin";

function App() {
  const [currentView, setCurrentView] = useState("portfolio"); // "portfolio" | "login" | "dashboard"
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem("admin_authenticated") === "true";
  });

  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  function toggleDarkMode() {
    setDarkMode((prev) => !prev);
  }

  function handleOpenAdmin() {
    if (isAuthenticated) {
      setCurrentView("dashboard");
    } else {
      setCurrentView("login");
    }
  }

  function handleLoginSuccess() {
    setIsAuthenticated(true);
    setCurrentView("dashboard");
  }

  function handleLogout() {
    localStorage.removeItem("admin_authenticated");
    setIsAuthenticated(false);
    setCurrentView("portfolio");
  }

  return (
    <div className="min-h-screen bg-white text-gray-900 transition-colors dark:bg-gray-950 dark:text-white">
      <Navbar
        darkMode={darkMode}
        toggleDarkMode={toggleDarkMode}
      />

      {/* Floating Admin Trigger / Logout Button */}
      <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2">
        {currentView === "portfolio" && (
          <button
            onClick={handleOpenAdmin}
            className="flex items-center gap-2 rounded-full bg-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-indigo-700 hover:shadow-xl"
          >
            🔒 Admin Access
          </button>
        )}

        {currentView === "dashboard" && (
          <>
            <button
              onClick={() => setCurrentView("portfolio")}
              className="rounded-full bg-gray-200 px-4 py-2.5 text-sm font-semibold text-gray-800 shadow transition hover:bg-gray-300 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
            >
              View Portfolio
            </button>
            <button
              onClick={handleLogout}
              className="rounded-full bg-red-600 px-4 py-2.5 text-sm font-semibold text-white shadow transition hover:bg-red-700"
            >
              Log Out
            </button>
          </>
        )}
      </div>

      <main>
        {/* 1. Public Portfolio View */}
        {currentView === "portfolio" && (
          <>
            <Hero />
            <About />
            <Skills />
            <Projects />
            <Contact />
          </>
        )}

        {/* 2. Admin Login Gate */}
        {currentView === "login" && (
          <section className="py-20">
            <AdminLogin
              onLoginSuccess={handleLoginSuccess}
              onCancel={() => setCurrentView("portfolio")}
            />
          </section>
        )}

        {/* 3. Protected Dashboard (Locked behind authentication) */}
        {currentView === "dashboard" && (
          <section className="px-6 py-20">
            {isAuthenticated ? (
              <ProjectDashboard />
            ) : (
              <div className="text-center">
                <p className="text-red-500">Access denied. Please log in first.</p>
                <button
                  onClick={() => setCurrentView("login")}
                  className="mt-4 rounded-lg bg-indigo-600 px-4 py-2 text-white"
                >
                  Go to Login
                </button>
              </div>
            )}
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
}

export default App;