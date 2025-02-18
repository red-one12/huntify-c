import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";


const MainLayout = () => {
  return (
    <div>
      <div className="bg-[#111827f2] text-white w-full fixed z-50 top-0">
      <Navbar></Navbar>
      </div>


      <div className="min-h-screen">
      <Outlet></Outlet>
      </div>



      <Footer></Footer>
      
    </div>
  );
};

export default MainLayout;