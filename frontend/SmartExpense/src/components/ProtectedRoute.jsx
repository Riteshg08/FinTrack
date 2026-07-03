import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

// Only renders children when the user is logged in
function ProtectedRoute({ children }) {
  const { user, loading } = useSelector((store) => store.user);

  // Still checking auth state — show a loading message
  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  // Not logged in — redirect to login page
  if (!user) {
    return (
      <Navigate to="/login" />
    );
  }

  // Logged in — show the protected page
  return children;
}

export default ProtectedRoute;
