import { Link, Outlet } from "react-router-dom";
import DashboardNav from "../components/DashboardNav";

const DashboardLayout = () => {
  return (
    <div className="flex text-white">
      <div className="left-side bg-[#340070] w-1/5 min-h-screen px-8 py-16">
        <DashboardNav></DashboardNav>
      </div>

      <div className="right-side w-4/5 p-8 min-h-screen text-black">
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default DashboardLayout;
