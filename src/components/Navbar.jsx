import { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../provider/AuthProvider";

const Navbar = () => {
  const { user, logOutUser } = useContext(AuthContext);

  const handleLogout = () => {
    logOutUser()
      .then(() => {
        console.log("User logged out successfully");
      })
      .catch((error) => console.error("Logout error:", error));
  };

  return (
    <div className="navbar border-b-2 bg-base-100 max-w-7xl mx-auto">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            <NavLink to="/" className="menu-item">
              Home
            </NavLink>
            <NavLink to="/products" className="menu-item">
              Products
            </NavLink>
          </ul>
        </div>
        <Link to="/" className="font-bold text-3xl">
          Huntify
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal gap-10 px-1 font-bold">
          <NavLink to="/" className="hover:text-primary">
            Home
          </NavLink>
          <NavLink to="/products" className="hover:text-primary">
            Products
          </NavLink>
        </ul>
      </div>
      <div className="navbar-end gap-2">
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
                <span className="font-semibold">{user.displayName}</span>
              </li>
              <li>
                <NavLink to="/dashboard" className="menu-item">
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

export default Navbar;
