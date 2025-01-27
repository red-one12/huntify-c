import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../provider/AuthProvider";

const DashboardNav = () => {
  const { user } = useContext(AuthContext);
  const [allUser, setAllUser] = useState([]);
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    axios
      .get("https://huntify-server.vercel.app/users")
      .then((res) => {
        setAllUser(res.data);

        const loggedInUser = res.data.find((u) => u.email === user?.email);
        if (loggedInUser) {
          setUserRole(loggedInUser.position);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }, [user]);

  return (
    <div className="flex flex-col gap-10">
      <Link to="/dashboard/dashboard">Dashboard</Link>
      <Link to="/dashboard/myProfile">My Profile</Link>
      <Link to="/dashboard/addProduct">Add Product</Link>
      <Link to="/dashboard/myProducts">My Products</Link>
      {userRole === "admin" && (
        <div className="mt-8 flex flex-col gap-10">
          <h4 className="font-bold text-xl">Admin Panel</h4>
          <Link to="/dashboard/showAllUser">Manage Users</Link>
          <Link to="/dashboard/siteSetting">Site Settings</Link>
          <Link to="/dashboard/manageCoupon">Coupons</Link>
        </div>
      )}
      {userRole === "moderator" && (
        <div className="mt-8 flex flex-col gap-10">
          <h4 className="font-bold text-xl">Moderator Tools</h4>
          <Link to="/dashboard/reviewQueue">Product Review Queue</Link>
          <Link to="/dashboard/reportedContents">Reported Contents</Link>
        </div>
      )}
      <div className="w-full h-[1px] bg-white"></div>
      <Link to="/">Home</Link>
      <Link to="/products">Products</Link>
    </div>
  );
};

export default DashboardNav;
