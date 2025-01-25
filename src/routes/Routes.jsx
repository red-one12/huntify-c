import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts.jsx/MainLayout";
import Home from "../pages/Home";
import Products from "../pages/Products";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";
import ProductDetails from "../pages/ProductDetails";
import DashboardLayout from "../layouts.jsx/DashboardLayout";
import Dashboard from "../pages/Dashboard";
import UserMyProfile from "../pages/UserMyProfile";
import UserAddProduct from "../pages/UserAddProduct";
import UserMyProducts from "../pages/UserMyProducts";
import UserUpdateProduct from "../pages/UserUpdateProduct";

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
        path: '/dashboard/dashboard',
        element: <Dashboard></Dashboard>
      },
      {
        path: '/dashboard/myProfile',
        element: <UserMyProfile></UserMyProfile>
      },
      {
        path: '/dashboard/addProduct',
        element: <UserAddProduct></UserAddProduct>
      },
      {
        path: '/dashboard/myProducts',
        element: <UserMyProducts></UserMyProducts>
      },

    ]
  },
  {
    path: '/updateProduct/:id',
    element: <UserUpdateProduct></UserUpdateProduct>
  }
]);

export default router;
