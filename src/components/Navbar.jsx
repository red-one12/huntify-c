import { useContext, useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../provider/AuthProvider";
import Swal from "sweetalert2";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai"; // Import icons
import { CiDark, CiLight } from "react-icons/ci";
import { ThemeContext } from "../provider/ThemeProvider";

const Navbar = () => {
  const { user, logOutUser } = useContext(AuthContext);
  const navigateToHome = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false); // State for dropdown
  const { theme, toggleTheme } = useContext(ThemeContext);
  const handleLogout = () => {
    logOutUser()
      .then(() => {
        Swal.fire({
          title: "Successfully Logged Out",
          icon: "success",
          draggable: true,
        });
        navigateToHome("/");
      })
      .catch((error) => console.error("Logout error:", error));
  };

  // Function to check if a link is active
  const getActiveClass = (path, isMobile = false) => {
    return location.pathname === path
      ? `${isMobile ? "text-black" : "text-white"} font-bold underline`
      : `${isMobile ? "text-black" : "text-white"}`;
  };

  return (
    <div className="navbar max-w-7xl mx-auto text-white">
      <div className="navbar-start">
        {/* Mobile Menu */}
        <div className="lg:hidden">
          <button onClick={() => setIsOpen(!isOpen)} className="btn btn-ghost">
            {isOpen ? <AiOutlineClose size={24} /> : <AiOutlineMenu size={24} />}
          </button>
          {isOpen && (
            <ul className="absolute top-16 left-0 w-full bg-white text-black shadow-lg p-8 space-y-4 z-50">
              <li>
                <NavLink
                  to="/"
                  className={getActiveClass("/", true)}
                  onClick={() => setIsOpen(false)}
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/products"
                  className={getActiveClass("/products", true)}
                  onClick={() => setIsOpen(false)}
                >
                  Products
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/helpDesk"
                  className={getActiveClass("/helpDesk", true)}
                  onClick={() => setIsOpen(false)}
                >
                  Help Desk
                </NavLink>
              </li>
            </ul>
          )}
        </div>

        {/* Logo */}
        <Link to="/" className="font-bold text-xl md:text-3xl">
          HUNTIFY
        </Link>
      </div>

      {/* Desktop Menu */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal gap-10 px-1">
          <NavLink to="/" className={getActiveClass("/")}>
            Home
          </NavLink>
          <NavLink to="/products" className={getActiveClass("/products")}>
            Products
          </NavLink>
          <NavLink to="/helpDesk" className={getActiveClass("/helpDesk")}>
            Help Desk
          </NavLink>
        </ul>
      </div>

      {/* User Authentication */}
      <div className="navbar-end gap-2">
      <button
          onClick={toggleTheme}
          className="text-2xl md:mr-5 border-none text-white"
        >
          {theme === "light" ? (
            <CiLight />
          ) : (
            <CiDark />
          )}
        </button>
        {!user ? (
          <>
            <button className="btn btn-primary">
              <Link to="/signIn" className="text-white">
                Sign In
              </Link>
            </button>
            <button className="btn bg-[#ffffff22] text-white">
              <Link to="/signUp">Sign Up</Link>
            </button>
          </>
        ) : (
          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="avatar online cursor-pointer">
              <div className="w-10 rounded-full">
                <img src={user.photoURL || "https://via.placeholder.com/150"} alt="User" />
              </div>
            </div>
            <ul tabIndex={0} className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
              <li>
                <span className="font-semibold text-black">{user.displayName}</span>
              </li>
              <li className="text-black">
                <NavLink to="/dashboard/dashboard" className={`menu-item text-black`}>
                  Dashboard
                </NavLink>
              </li>
              <li>
                <button onClick={handleLogout} className="menu-item text-red-600">
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
