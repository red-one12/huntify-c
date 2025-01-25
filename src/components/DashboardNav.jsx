import { Link } from "react-router-dom";

const DashboardNav = () => {
  return (
    <div className="flex flex-col gap-10">
      <Link to="/dashboard/dashboard">Dashboard</Link>
      <Link to="/dashboard/myProfile">My Profile</Link>
      <Link to="/dashboard/addProduct">Add Product</Link>
      <Link to="/dashboard/myProducts">My Products</Link>
      <div className="w-full h-[1px] bg-white"></div>
      <Link to="/">Home</Link>
      <Link to="/products">Products</Link>
    </div>
  );
};

export default DashboardNav;
