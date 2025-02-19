import { useContext } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../provider/AuthProvider";
import Swal from "sweetalert2";

const DashboardUpperNavbar = () => {
  const { user, logOutUser } = useContext(AuthContext);
  const navigateToHome = useNavigate();

  const handleLogout = () => {
    logOutUser()
      .then(() => {
        console.log("User logged out successfully");
        Swal.fire({
                                title: "Successfully Logged Out",
                                icon: "success",
                                draggable: true
                              });
                              navigateToHome('/')
      })
      .catch((error) => console.error("Logout error:", error));
  };

  return (
    <div className="flex justify-end items-center gap-5">
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal gap-10 px-1 font-bold">
          <NavLink to="/" className="hover:text-primary">
            Home
          </NavLink>
          <NavLink to="/products" className="hover:text-primary">
            Products
          </NavLink>
          <NavLink to="/helpDesk" className="menu-item">
              Help Desk
          </NavLink>
        </ul>
      </div>
      <div className="gap-2">
        {!user ? (
          <>
            <button className="btn btn-primary">
              <Link to="/signIn" className="text-white">
                Sign In
              </Link>
            </button>
            <button className="btn btn-ghost text-black">
              <Link to="/signUp">Sign Up</Link>
            </button>
          </>
        ) : (
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="avatar online cursor-pointer"
            >
              <div className="w-10 rounded-full">
                <img src={user.photoURL || "https://via.placeholder.com/150"} alt="User" />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              <li>
                <span className="font-semibold text-black">{user.displayName}</span>
              </li>
              <li>
                <NavLink to="/dashboard/dashboard" className="menu-item text-black">
                  Dashboard 
                </NavLink>
              </li>
              <li>
                <button
                  onClick={handleLogout}
                  className="menu-item text-red-600"
                >
                  Logout
                </button>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardUpperNavbar;
