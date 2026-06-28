import {
  LayoutDashboard,
  IndianRupee,
  Receipt,
  Wallet,
  ChartPie,
  User,
} from "lucide-react";

import { NavLink } from "react-router-dom";

const links = [
  {
    name: "Dashboard",
    path: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "Income",
    path: "/dashboard/income",
    icon: IndianRupee,
  },
  {
    name: "Expenses",
    path: "/dashboard/expenses",
    icon: Receipt,
  },
  {
    name: "Budget",
    path: "/dashboard/budget",
    icon: Wallet,
  },
  {
    name: "Analytics",
    path: "/dashboard/analytics",
    icon: ChartPie,
  },
  {
    name: "Profile",
    path: "/dashboard/profile",
    icon: User,
  },
];

const Sidebar = () => {
  return (
    <aside className="w-72 bg-white border-r border-slate-200">
      <div className="p-8">
        <h1 className="text-3xl font-bold text-emerald-600">
          Smart Expense
        </h1>
      </div>

      <nav className="px-4">
        {links.map((link) => {
          const Icon = link.icon;

          return (
            <NavLink
              key={link.name}
              to={link.path}
              className={({ isActive }) =>
                `flex items-center gap-4 p-4 rounded-2xl mb-3 transition ${
                  isActive
                    ? "bg-emerald-50 text-emerald-600"
                    : "text-slate-600 hover:bg-slate-100"
                }`
              }
            >
              <Icon size={20} />
              {link.name}
            </NavLink>
          );
        })}
      </nav>
    </aside>
  );
};

export default Sidebar;