import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-white border-b">
      <div className="max-w-7xl mx-auto px-8 h-16 flex items-center justify-between">
        <Link
          to="/"
          className="text-2xl font-bold text-emerald-600"
        >
          Smart Expense
        </Link>

        <div className="flex gap-4">
          <Link
            to="/login"
            className="px-5 py-2 rounded-xl border"
          >
            Login
          </Link>

          <Link
            to="/signup"
            className="px-5 py-2 rounded-xl bg-emerald-500 text-white"
          >
            Get Started
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;