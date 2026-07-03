import {
  LayoutDashboard,
  IndianRupee,
  Receipt,
  Wallet,
  ChartPie,
  User,
  LogOut,
  X,
} from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useAuth } from "../hooks/useAuth";

// Navigation links shown in the dashboard sidebar
const links = [
  { name: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
  { name: "Income", path: "/dashboard/income", icon: IndianRupee },
  { name: "Expenses", path: "/dashboard/expenses", icon: Receipt },
  { name: "Budget", path: "/dashboard/budget", icon: Wallet },
  { name: "Analytics", path: "/dashboard/analytics", icon: ChartPie },
  { name: "Profile", path: "/dashboard/profile", icon: User },
];

// Builds the CSS class for a sidebar nav link based on active state
function getNavLinkClassName(isActive) {
  let linkClass =
    "flex items-center gap-3 px-4 py-3 rounded-xl mb-1 text-sm font-medium transition-all duration-200 ";

  if (isActive) {
    linkClass = linkClass + "bg-primary text-white shadow-md shadow-primary/25";
  } else {
    linkClass = linkClass + "text-slate-600 hover:bg-primary-50 hover:text-primary";
  }

  return linkClass;
}

// Renders one navigation link in the sidebar
function SidebarLink({ link, onClose }) {
  const Icon = link.icon;

  let isExactMatch = false;
  if (link.path === "/dashboard") {
    isExactMatch = true;
  }

  return (
    <NavLink
      key={link.name}
      to={link.path}
      end={isExactMatch}
      onClick={onClose}
      className={({ isActive }) => getNavLinkClassName(isActive)}
    >
      <Icon size={18} />
      {link.name}
    </NavLink>
  );
}

// Left sidebar for the dashboard with nav links and logout
function Sidebar({ isOpen, onClose }) {
  const { user } = useSelector((store) => store.user);
  const { logout } = useAuth();
  const navigate = useNavigate();

  // Log the user out and send them to the login page
  async function handleLogout() {
    await logout();
    navigate("/login");
  }

  // Decide whether sidebar is visible on mobile (slide in/out)
  let sidebarPositionClass = "";
  if (isOpen) {
    sidebarPositionClass = "translate-x-0";
  } else {
    sidebarPositionClass = "-translate-x-full lg:translate-x-0";
  }

  const sidebarClassName =
    "fixed lg:static inset-y-0 left-0 z-50 w-72 bg-white border-r border-slate-100 flex flex-col transform transition-transform duration-300 ease-in-out " +
    sidebarPositionClass;

  // Build the list of nav links
  const navLinks = [];
  for (let i = 0; i < links.length; i = i + 1) {
    const link = links[i];
    navLinks.push(
      <SidebarLink key={link.name} link={link} onClose={onClose} />
    );
  }

  // Show user info box only when user data is available
  let userInfoBox = null;
  if (user) {
    userInfoBox = (
      <div className="mx-4 mb-4 p-3 rounded-xl bg-primary-50 border border-primary-100">
        <p className="text-sm font-semibold text-slate-800 truncate">
          {user.firstName} {user.lastName}
        </p>
        <p className="text-xs text-slate-500 truncate mt-0.5">
          {user.email}
        </p>
      </div>
    );
  }

  return (
    <aside className={sidebarClassName}>
      <div className="p-6 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-primary">
            FinTrack
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Finance Manager
          </p>
        </div>

        <button
          onClick={onClose}
          className="lg:hidden p-2 rounded-xl hover:bg-slate-100 transition-colors"
          aria-label="Close menu"
        >
          <X size={20} className="text-slate-500" />
        </button>
      </div>

      {userInfoBox}

      <nav className="px-3 flex-1">
        {navLinks}
      </nav>

      <div className="p-4 border-t border-slate-100">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-sm font-medium text-slate-600 hover:bg-red-50 hover:text-red-600 transition-all duration-200"
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;
