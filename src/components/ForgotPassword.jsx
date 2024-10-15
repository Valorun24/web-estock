import React, { useState } from "react";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");

  const auth = getAuth();
  const navigate = useNavigate(); // Hook untuk navigasi

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setMsg(""); // Clear previous message
    setError(""); // Clear previous error

    try {
      // Send password reset email via Firebase
      await sendPasswordResetEmail(auth, email);
      setMsg("A password reset link has been sent to your email.");
    } catch (error) {
      if (error.code === "auth/user-not-found") {
        setError("No user found with this email.");
      } else if (error.code === "auth/invalid-email") {
        setError("Invalid email format.");
      } else {
        setError("Failed to send reset email. Please try again.");
      }
    }
  };

  // Fungsi untuk navigasi ke halaman login
  const goToLogin = () => {
    navigate("/"); // Arahkan pengguna ke halaman login
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-700">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
        <h2 className="text-2xl font-bold text-gray-900 text-center">Forgot Password</h2>

        {/* Message */}
        {msg && <p className="mt-4 text-green-500 text-center">{msg}</p>}
        {error && <p className="mt-4 text-red-500 text-center">{error}</p>}

        {/* Form */}
        <form onSubmit={handleResetPassword} className="space-y-6 mt-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email address
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                required
                placeholder="Enter your email"
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Send Reset Link
            </button>
          </div>
        </form>

        <div className="mt-6 text-center">
          <button
            onClick={goToLogin} // Gunakan handler goToLogin untuk navigasi ke login
            className="text-sm text-indigo-600 hover:text-indigo-500"
          >
            Back to Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
