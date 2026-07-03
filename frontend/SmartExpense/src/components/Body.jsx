import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

// Main page wrapper: shows navbar and child routes below it
function Body() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-primary-50/25 to-indigo-50/40">
      <Navbar />
      <Outlet />
    </div>
  );
}

export default Body;
