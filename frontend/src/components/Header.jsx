import { useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="mx-auto">
      <div className="bg-gradient-to-br from-blue-100 to-indigo-200 shadow-xl px-10 py-5 flex justify-between items-center">
        <div className="flex items-center gap-2 mb-3 sm:mb-0">
          <svg
            className="w-7 h-7 text-indigo-600"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 12h6m-3-3v6m9 0a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span className="text-2xl font-bold tracking-tight text-indigo-700">
            Task Manager
          </span>
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={logout}
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-4 py-2 rounded-lg shadow transition border-1 border-indigo-200"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
