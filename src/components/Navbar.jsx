import { NavLink } from "react-router-dom";


const Navbar = () => {
  return (
    <div className="navbar border-b-2">
  <div className="navbar-start">
    <div className="dropdown">
      <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h8m-8 6h16" />
        </svg>
      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
        <NavLink>Home</NavLink>
        <NavLink>Products</NavLink>
      </ul>
    </div>
    <a className="font-bold text-3xl">Huntify</a>
  </div>
  <div className="navbar-center hidden lg:flex">
    <ul className="menu menu-horizontal gap-10 px-1 font-bold">
    <NavLink to='/'>Home</NavLink>
    <NavLink to='/products'>Products</NavLink>
    </ul>
  </div>
  <div className="navbar-end gap-2">
    <button className="btn btn-primary">SignIn</button>
    <button className="btn btn-ghost text-black">SignUp</button>
  </div>
</div>
  );
};

export default Navbar;