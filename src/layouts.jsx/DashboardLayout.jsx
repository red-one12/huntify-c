import { Link, Outlet } from "react-router-dom";
import DashboardNav from "../components/DashboardNav";
import DashboardUpperNavbar from "../components/DashboardUpperNavbar";

const DashboardLayout = () => {
  return (
    <div className="flex text-white">
      <div className="left-side bg-[#5271ff] w-1/5 min-h-screen px-8 py-16 text-black">
        <DashboardNav></DashboardNav>
      </div>

      <div className="right-side w-4/5 p-8 min-h-screen text-black px-8">
      <DashboardUpperNavbar></DashboardUpperNavbar>
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default DashboardLayout;
