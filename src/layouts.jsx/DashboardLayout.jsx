import { Outlet } from "react-router-dom";

const DashboardLayout = () => {
  return (
    <div className="flex">
      <div className="left-side bg-blue-400 w-1/5 min-h-screen p-8">
        <p>hello</p>
      </div>

      <div className="right-side bg-blue-700 w-4/5 p-8 min-h-screen">
        <Outlet></Outlet>
        <p>hello</p>
      </div>
    </div>
  );
};

export default DashboardLayout;
