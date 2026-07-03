/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { loginUser, signupUser } from "../services/authService";
import { Wallet, Mail, Lock, User } from "lucide-react";

function Auth() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isLoginForm, setIsLoginForm] = useState(true);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // switch between login and signup based on URL
  useEffect(() => {
    if (location.pathname !== "/signup") {
      setIsLoginForm(true);
    } else {
      setIsLoginForm(false);
    }
  }, [location.pathname]);

  const { fetchUser } = useAuth();

  const handleLogin = async () => {
    try {
      setError("");
      setLoading(true);
      await loginUser({ email, password });
      await fetchUser();
      navigate("/dashboard");
    } catch (err) {
      let errorMessage = "Login failed";
      if (err && err.response && err.response.data && err.response.data.message) {
        errorMessage = err.response.data.message;
      } else if (err && err.message) {
        errorMessage = err.message;
      }
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = async () => {
    try {
      setError("");
      setLoading(true);
      await signupUser({ firstName, lastName, email, password });
      await loginUser({ email, password });
      await fetchUser();
      navigate("/dashboard");
    } catch (err) {
      let errorMessage = "Signup failed";
      if (err && err.response && err.response.data && err.response.data.message) {
        errorMessage = err.response.data.message;
      }
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isLoginForm) {
      handleLogin();
    } else {
      handleSignUp();
    }
  };

  // figure out heading and button text based on form type
  let formHeading = "Welcome Back";
  let formSubtext = "Login to continue to your dashboard";
  let submitButtonText = "Sign In";
  let switchPrompt = "Don't have an account?";
  let switchLinkText = "Sign Up";
  let switchLinkTo = "/signup";

  if (!isLoginForm) {
    formHeading = "Create Account";
    formSubtext = "Start tracking your expenses today";
    submitButtonText = "Create Account";
    switchPrompt = "Already have an account?";
    switchLinkText = "Sign In";
    switchLinkTo = "/login";
  }

  if (loading) {
    submitButtonText = "Please wait...";
  }

  return (
    <div className="min-h-screen flex">
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-primary to-primary-700 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIvPjwvZz48L2c+PC9zdmc+')] opacity-50" />
        <div className="relative z-10 flex flex-col justify-center px-16 text-white">
          <div className="w-14 h-14 bg-white/20 backdrop-blur rounded-2xl flex items-center justify-center mb-8">
            <Wallet size={28} />
          </div>
          <h1 className="text-4xl font-bold leading-tight">
            Take control of
            <br />
            your finances
          </h1>
          <p className="mt-4 text-white/80 text-lg leading-relaxed max-w-md">
            Join thousands of users who manage their money smarter with
            FinTrack.
          </p>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center px-4 sm:px-6 py-12 bg-slate-50">
        <div className="w-full max-w-md">
          <div className="lg:hidden flex items-center gap-2.5 mb-8 justify-center">
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
              <Wallet size={20} className="text-white" />
            </div>
            <span className="text-xl font-bold text-slate-900">
              Fin<span className="text-primary">Track</span>
            </span>
          </div>

          <div className="card p-6 sm:p-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 text-center">
              {formHeading}
            </h2>
            <p className="text-center text-slate-500 mt-2 text-sm">
              {formSubtext}
            </p>

            <form onSubmit={handleSubmit} className="mt-8 space-y-4">
              {!isLoginForm && (
                <div className="grid grid-cols-2 gap-3">
                  <div className="relative">
                    <User size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="text"
                      placeholder="First Name"
                      className="input-field pl-10"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      required
                    />
                  </div>
                  <div className="relative">
                    <User size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="text"
                      placeholder="Last Name"
                      className="input-field pl-10"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      required
                    />
                  </div>
                </div>
              )}

              <div className="relative">
                <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="email"
                  placeholder="Email address"
                  className="input-field pl-10"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="relative">
                <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="password"
                  placeholder="Password"
                  className="input-field pl-10"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              {error && (
                <div className="bg-red-50 text-red-600 text-sm px-4 py-3 rounded-xl border border-red-100">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="btn-primary w-full py-3 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {submitButtonText}
              </button>
            </form>

            <p className="text-center text-slate-500 text-sm mt-6">
              {switchPrompt}
              <Link
                to={switchLinkTo}
                className="ml-1.5 text-primary font-semibold hover:underline"
              >
                {switchLinkText}
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Auth;
