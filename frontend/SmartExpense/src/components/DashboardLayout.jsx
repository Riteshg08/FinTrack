import { useState } from "react";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";
import { Menu } from "lucide-react";

// Layout wrapper for all dashboard pages (sidebar + main content)
function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Close the mobile sidebar
  function handleCloseSidebar() {
    setSidebarOpen(false);
  }

  // Open the mobile sidebar
  function handleOpenSidebar() {
    setSidebarOpen(true);
  }

  // Dark overlay behind sidebar on mobile — only when sidebar is open
  let mobileOverlay = null;
  if (sidebarOpen) {
    mobileOverlay = (
      <div
        className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-40 lg:hidden"
        onClick={handleCloseSidebar}
      />
    );
  }

  return (
    <div className="min-h-screen bg-slate-50/80 flex">
      {mobileOverlay}

      <Sidebar
        isOpen={sidebarOpen}
        onClose={handleCloseSidebar}
      />

      <div className="flex-1 flex flex-col min-w-0">
        <header className="lg:hidden sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b border-slate-100 px-4 h-14 flex items-center justify-between">
          <button
            onClick={handleOpenSidebar}
            className="p-2 rounded-xl hover:bg-slate-100 transition-colors"
            aria-label="Open menu"
          >
            <Menu size={22} className="text-slate-700" />
          </button>

          <span className="text-lg font-bold text-primary">
            FinTrack
          </span>

          <div className="w-10" />
        </header>

        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default DashboardLayout;
