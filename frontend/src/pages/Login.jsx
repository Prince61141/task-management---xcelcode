import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const res = await fetch("http://localhost:5000/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    if (res.ok) {
      localStorage.setItem("token", data.token);
      navigate("/");
    } else {
      alert(data.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-indigo-200">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md flex flex-col items-center">
        <div className="flex items-center mb-6">
          <svg className="w-8 h-8 text-indigo-600 mr-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-3-3v6m9 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          <span className="text-2xl font-bold text-indigo-700 tracking-tight">Task Manager</span>
        </div>
        <form onSubmit={handleLogin} className="w-full">
          <h2 className="text-xl font-semibold text-gray-800 mb-4 text-center">Sign in to your account</h2>
          <div className="mb-4">
            <label className="block text-gray-600 mb-1" htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-2">
            <label className="block text-gray-600 mb-1" htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 rounded-lg mt-4 shadow transition"
          >
            Login
          </button>
        </form>
        <p className="text-sm text-center mt-6 text-gray-600">
          Don't have an account?{' '}
          <a href="/register" className="text-indigo-600 hover:underline font-medium">Register</a>
        </p>
      </div>
    </div>
  );
}

export default Login;