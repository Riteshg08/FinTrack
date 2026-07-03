import { Wallet, TrendingUp, PieChart, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

// Hero section on the home page with headline and sample dashboard card
function HeroSection() {
  return (
    <section className="relative min-h-[85vh] overflow-hidden bg-gradient-to-br from-white via-primary-50/50 to-indigo-100/30">
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary-50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 opacity-60" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-primary-50 rounded-full blur-3xl translate-y-1/2 -translate-x-1/3 opacity-40" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 relative">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div>
            <div className="inline-flex items-center gap-2 bg-primary-50 text-primary px-4 py-2 rounded-full text-sm font-medium border border-primary-100">
              <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
              Smart Finance Management
            </div>

            <h1 className="mt-6 sm:mt-8 text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight text-slate-900 tracking-tight">
              Master Your
              <span className="text-primary"> Money</span>
              <br />
              Beautifully.
            </h1>

            <p className="mt-6 text-lg sm:text-xl text-slate-500 leading-relaxed max-w-xl">
              Track expenses, create budgets, monitor your income, and gain
              valuable insights into your finances with one beautiful dashboard.
            </p>

            <div className="mt-8 sm:mt-10 flex gap-4 flex-wrap">
              <Link to="/signup" className="btn-primary inline-flex items-center gap-2 text-base px-7 py-3">
                Get Started Free
                <ArrowRight size={18} />
              </Link>
            </div>

          </div>

          <div className="relative mt-8 lg:mt-0">
            <div className="bg-gradient-to-br from-primary to-primary-600 rounded-[32px] sm:rounded-[40px] p-6 sm:p-10 shadow-2xl shadow-primary/30">
              <div className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-6 shadow-lg">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-slate-500 text-sm">Total Balance</p>
                    <h2 className="text-3xl sm:text-4xl font-bold mt-1 text-slate-900">
                      ₹1,28,400
                    </h2>
                  </div>
                  <div className="w-12 h-12 bg-primary-50 rounded-2xl flex items-center justify-center">
                    <Wallet size={24} className="text-primary" />
                  </div>
                </div>

                <div className="mt-6 sm:mt-8 space-y-4">
                  <div className="flex justify-between items-center">
                    <div className="flex gap-3 items-center">
                      <div className="bg-primary-50 p-2.5 rounded-xl">
                        <TrendingUp size={18} className="text-primary" />
                      </div>
                      <div>
                        <p className="font-semibold text-sm">Income</p>
                        <p className="text-slate-400 text-xs">This Month</p>
                      </div>
                    </div>
                    <h3 className="font-bold text-green-600">₹85,000</h3>
                  </div>

                  <div className="flex justify-between items-center">
                    <div className="flex gap-3 items-center">
                      <div className="bg-red-50 p-2.5 rounded-xl">
                        <PieChart size={18} className="text-red-500" />
                      </div>
                      <div>
                        <p className="font-semibold text-sm">Expenses</p>
                        <p className="text-slate-400 text-xs">This Month</p>
                      </div>
                    </div>
                    <h3 className="font-bold text-red-500">₹32,500</h3>
                  </div>
                </div>
              </div>
            </div>

            <div className="absolute -bottom-4 sm:-bottom-6 -left-2 sm:-left-6 bg-white p-4 sm:p-5 rounded-2xl shadow-xl border border-slate-100">
              <p className="text-slate-500 text-xs sm:text-sm">Savings Rate</p>
              <h3 className="text-2xl sm:text-3xl font-bold text-primary mt-1">62%</h3>
            </div>

            <div className="absolute -top-4 sm:-top-6 right-0 bg-white p-4 sm:p-5 rounded-2xl shadow-xl border border-slate-100">
              <p className="text-slate-500 text-xs sm:text-sm">Budget Status</p>
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mt-1">
                On Track ✓
              </h3>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
