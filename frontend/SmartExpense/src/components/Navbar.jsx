import { Link } from "react-router-dom";
import { Wallet } from "lucide-react";

// Top navigation bar for the public landing pages
function Navbar() {
  return (
    <nav className="sticky top-0 z-50 bg-white/60 backdrop-blur-md border-b border-primary-100/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 bg-primary rounded-xl flex items-center justify-center shadow-sm shadow-primary/30 group-hover:scale-105 transition-transform">
            <Wallet size={18} className="text-white" />
          </div>
          <span className="text-xl font-bold text-slate-900">
            Fin<span className="text-primary">Track</span>
          </span>
        </Link>

        <div className="flex items-center gap-3">
          <Link to="/login" className="btn-ghost text-sm hidden sm:inline-flex">
            Login
          </Link>
          <Link to="/signup" className="btn-primary text-sm">
            Get Started
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
