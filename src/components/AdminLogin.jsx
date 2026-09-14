import { useState } from "react";

function AdminLogin({ onLoginSuccess, onCancel }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // Default credentials (change these to your preference)
  const ADMIN_USER = "Admin Dashboard";
  const ADMIN_PASS = "20262006";

  function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (username === ADMIN_USER && password === ADMIN_PASS) {
      localStorage.setItem("admin_authenticated", "true");
      onLoginSuccess();
    } else {
      setError("Invalid username or password.");
    }
  }

  return (
    <div className="flex min-h-[70vh] items-center justify-center px-4">
      <div className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-8 shadow-xl dark:border-gray-800 dark:bg-gray-900">
        <div className="mb-6 text-center">
          <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-indigo-100 text-2xl dark:bg-indigo-900/40">
            🔒
          </div>
          <h2 className="text-2xl font-bold">Admin Portal</h2>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Please log in to manage your portfolio projects
          </p>
        </div>

        {error && (
          <div className="mb-4 rounded-lg bg-red-50 p-3 text-center text-sm text-red-600 dark:bg-red-950/40 dark:text-red-400">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-semibold">Username</label>
            <input
              type="text"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="admin"
              className="w-full rounded-xl border border-gray-300 bg-transparent px-4 py-2.5 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 dark:border-gray-700"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-semibold">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full rounded-xl border border-gray-300 bg-transparent px-4 py-2.5 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 dark:border-gray-700"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-xl bg-indigo-600 py-3 font-semibold text-white transition hover:bg-indigo-700"
          >
            Log In
          </button>

          <button
            type="button"
            onClick={onCancel}
            className="w-full text-center text-sm text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
          >
            ← Return to Portfolio
          </button>
        </form>
      </div>
    </div>
  );
}

export default AdminLogin;