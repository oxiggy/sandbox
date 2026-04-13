import { useState } from "react";
import { Outlet } from "react-router";
import { useIsAuthenticated, usePasskeyAuth } from "jazz-tools/react";

export default function PrivateLayout() {
  const isAuthenticated = useIsAuthenticated();

  if (!isAuthenticated) {
    return <LoginForm />;
  }

  return <Outlet />;
}

function LoginForm() {
  const [username, setUsername] = useState("");
  const [isSignUp, setIsSignUp] = useState(true);

  const auth = usePasskeyAuth({
    appName: "Sandbox",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSignUp) {
      await auth.signUp(username);
    } else {
      await auth.logIn();
    }
  };

  return (
    <main className="flex items-center justify-center min-h-screen">
      <div className="w-full max-w-sm space-y-6 p-8 rounded-2xl border border-gray-200 dark:border-gray-700">
        <h1 className="text-2xl font-bold text-center text-gray-900 dark:text-gray-100">
          {isSignUp ? "Sign Up" : "Log In"}
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          {isSignUp && (
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          )}

          <button
            type="submit"
            className="w-full px-4 py-2 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors"
          >
            {isSignUp ? "Sign Up" : "Log In"}
          </button>
        </form>

        <button
          onClick={() => setIsSignUp(!isSignUp)}
          className="w-full text-sm text-blue-600 dark:text-blue-400 hover:underline"
        >
          {isSignUp
            ? "Already have an account? Log in"
            : "Don't have an account? Sign up"}
        </button>
      </div>
    </main>
  );
}
