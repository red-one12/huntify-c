import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts.jsx/MainLayout";
import Home from "../pages/Home";
import Products from "../pages/Products";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";
import ProductDetails from "../pages/ProductDetails";
import DashboardLayout from "../layouts.jsx/DashboardLayout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/products",
        element: <Products></Products>,
      },
      {
        path: "/productDetails/:name",
        element: <ProductDetails></ProductDetails>,
      },
    ],
  },
  {
    path: "/signIn",
    element: <SignIn></SignIn>,
  },
  {
    path: "/signUp",
    element: <SignUp></SignUp>,
  },
  {
    path: '/dashboard',
    element: <DashboardLayout></DashboardLayout>,
    children: [
      {
        
      }
    ]
  }
]);

export default router;
