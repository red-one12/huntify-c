import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { AuthContext } from "../provider/AuthProvider";

const DashboardNav = () => {
  const { user } = useContext(AuthContext);
  const [userRole, setUserRole] = useState(null);
  const location = useLocation();

  useEffect(() => {
    axios
      .get("https://huntify-server.vercel.app/users")
      .then((res) => {
        const loggedInUser = res.data.find((u) => u.email === user?.email);
        if (loggedInUser) {
          setUserRole(loggedInUser.position);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }, [user]);

  const getActiveClass = (path) =>
    location.pathname === path ? "underline font-bold" : "";

  return (
    <div className="flex flex-col gap-10">
      <div className="flex justify-start items-center gap-2">
        <img src={user?.photoURL} className="w-10 h-10 rounded-full" alt="" />
        <div>
          <p className="font-bold">{user?.displayName}</p>
          <p className="text-sm text-gray-800">{userRole?.toUpperCase()}</p>
        </div>
      </div>
      <Link to="/dashboard/dashboard" className={getActiveClass("/dashboard/dashboard")}>Dashboard</Link>
      <Link to="/dashboard/myProfile" className={getActiveClass("/dashboard/myProfile")}>My Profile</Link>
      <Link to="/dashboard/addProduct" className={getActiveClass("/dashboard/addProduct")}>Add Product</Link>
      <Link to="/dashboard/myProducts" className={getActiveClass("/dashboard/myProducts")}>My Products</Link>
      
      {userRole === "admin" && (
        <div className="mt-8 flex flex-col gap-10">
          <h4 className="font-bold text-xl">For Admin</h4>
          <Link to="/dashboard/showAllUser" className={getActiveClass("/dashboard/showAllUser")}>Manage Users</Link>
          <Link to="/dashboard/siteSetting" className={getActiveClass("/dashboard/siteSetting")}>Site Settings</Link>
          <Link to="/dashboard/manageCoupon" className={getActiveClass("/dashboard/manageCoupon")}>Coupons</Link>
        </div>
      )}

      {userRole === "moderator" && (
        <div className="mt-8 flex flex-col gap-10">
          <h4 className="font-bold text-xl">For Moderator</h4>
          <Link to="/dashboard/reviewQueue" className={getActiveClass("/dashboard/reviewQueue")}>Product Review Queue</Link>
          <Link to="/dashboard/reportedContents" className={getActiveClass("/dashboard/reportedContents")}>Reported Contents</Link>
        </div>
      )}

      <div className="w-full h-[1px] bg-black"></div>
      <Link to="/" className={getActiveClass("/")}>Home</Link>
      <Link to="/products" className={getActiveClass("/products")}>Products</Link>
    </div>
  );
};

export default DashboardNav;
