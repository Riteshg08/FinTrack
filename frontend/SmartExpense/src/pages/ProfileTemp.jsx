import { useSelector } from "react-redux";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { User, Mail, Calendar, LogOut } from "lucide-react";

function Profile() {
  const { user } = useSelector((store) => store.user);
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  // show loading if user data is not ready yet
  if (!user) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-slate-500">Loading profile...</p>
      </div>
    );
  }

  // get initials for the avatar circle
  let firstInitial = "";
  let lastInitial = "";
  if (user.firstName && user.firstName[0]) {
    firstInitial = user.firstName[0];
  }
  if (user.lastName && user.lastName[0]) {
    lastInitial = user.lastName[0];
  }

  return (
    <div className="space-y-6 sm:space-y-8 max-w-2xl">
      <div>
        <h1 className="page-title">Profile</h1>
        <p className="page-subtitle">Manage your account information</p>
      </div>

      <div className="card-padded">
        <div className="flex items-center gap-5">
          <div className="w-16 h-16 sm:w-20 sm:h-20 bg-primary rounded-2xl flex items-center justify-center text-white text-2xl sm:text-3xl font-bold shadow-lg shadow-primary/25">
            {firstInitial}
            {lastInitial}
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
              {user.firstName} {user.lastName}
            </h2>
            <p className="text-slate-500 text-sm mt-1">Account Member</p>
          </div>
        </div>

        <div className="mt-8 space-y-4">
          <div className="flex items-center gap-4 p-4 rounded-xl bg-slate-50">
            <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center border border-slate-100">
              <User size={18} className="text-primary" />
            </div>
            <div>
              <p className="text-xs text-slate-400 font-medium">Full Name</p>
              <p className="text-sm font-semibold text-slate-800">
                {user.firstName} {user.lastName}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-4 rounded-xl bg-slate-50">
            <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center border border-slate-100">
              <Mail size={18} className="text-primary" />
            </div>
            <div>
              <p className="text-xs text-slate-400 font-medium">Email</p>
              <p className="text-sm font-semibold text-slate-800">{user.email}</p>
            </div>
          </div>

          {user.createdAt && (
            <div className="flex items-center gap-4 p-4 rounded-xl bg-slate-50">
              <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center border border-slate-100">
                <Calendar size={18} className="text-primary" />
              </div>
              <div>
                <p className="text-xs text-slate-400 font-medium">Member Since</p>
                <p className="text-sm font-semibold text-slate-800">
                  {new Date(user.createdAt).toLocaleDateString("en-IN", {
                    month: "long",
                    year: "numeric",
                  })}
                </p>
              </div>
            </div>
          )}
        </div>

        <button
          onClick={handleLogout}
          className="mt-8 flex items-center justify-center gap-2 w-full py-3 rounded-xl border border-red-200 text-red-600 font-medium hover:bg-red-50 transition-colors"
        >
          <LogOut size={18} />
          Sign Out
        </button>
      </div>
    </div>
  );
}

export default Profile;
