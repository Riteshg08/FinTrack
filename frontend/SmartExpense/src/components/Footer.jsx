import { Link } from "react-router-dom";
import { Wallet } from "lucide-react";

// Footer shown at the bottom of the landing page
function Footer() {
  return (
    <footer className="bg-slate-900 text-white py-16 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 bg-primary rounded-xl flex items-center justify-center">
                <Wallet size={18} className="text-white" />
              </div>
              <span className="text-xl font-bold">
                Fin<span className="text-primary-200">Track</span>
              </span>
            </div>

            <p className="mt-4 text-slate-400 leading-relaxed text-sm">
              A modern personal finance platform to track expenses, manage
              budgets, and gain financial insights.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Product</h3>
            <div className="space-y-2.5 text-slate-400 text-sm">
              <p className="hover:text-white transition-colors cursor-pointer">Dashboard</p>
              <p className="hover:text-white transition-colors cursor-pointer">Expenses</p>
              <p className="hover:text-white transition-colors cursor-pointer">Budgets</p>
              <p className="hover:text-white transition-colors cursor-pointer">Analytics</p>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Company</h3>
            <div className="space-y-2.5 text-slate-400 text-sm">
              <p className="hover:text-white transition-colors cursor-pointer">About</p>
              <p className="hover:text-white transition-colors cursor-pointer">Privacy Policy</p>
              <p className="hover:text-white transition-colors cursor-pointer">Terms of Service</p>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Get Started</h3>
            <p className="text-slate-400 text-sm mb-4">
              Start managing your finances today.
            </p>
            <Link
              to="/signup"
              className="inline-block bg-primary hover:bg-primary-600 text-white text-sm font-medium px-5 py-2.5 rounded-xl transition-colors"
            >
              Create Account
            </Link>
          </div>
        </div>

        <div className="border-t border-slate-800 mt-12 pt-8 text-center text-slate-500 text-sm">
          © 2026 FinTrack. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

export default Footer;
