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
import ReviewQueue from "../pages/ReviewQueue";
import ReportedContents from "../pages/ReportedContents";
import ShowAllUser from "../pages/ShowAllUser";
import SiteSetting from "../pages/SiteSetting";
import ErrorPage from "../pages/ErrorPage";
import ManageCoupon from "../pages/ManageCoupon";
import PrivateRoute from "./PrivateRoute";
import HelpDesk from "../pages/HelpDesk";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    errorElement: <ErrorPage></ErrorPage>,
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
        path: "/helpDesk",
        element: <HelpDesk></HelpDesk>
      },
      {
        path: "/productDetails/:id",
        element: <PrivateRoute><ProductDetails></ProductDetails></PrivateRoute>,
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
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: '/dashboard/dashboard',
        element: <PrivateRoute><Dashboard></Dashboard></PrivateRoute>
      },
      {
        path: '/dashboard/myProfile',
        element: <PrivateRoute><UserMyProfile></UserMyProfile></PrivateRoute>
      },
      {
        path: '/dashboard/addProduct',
        element: <PrivateRoute><UserAddProduct></UserAddProduct></PrivateRoute>
      },
      {
        path: '/dashboard/myProducts',
        element: <PrivateRoute><UserMyProducts></UserMyProducts></PrivateRoute>
      },
      {
        path: '/dashboard/reviewQueue',
        element: <PrivateRoute><ReviewQueue></ReviewQueue></PrivateRoute>
      },
      {
        path: '/dashboard/reportedContents',
        element: <PrivateRoute><ReportedContents></ReportedContents></PrivateRoute>
      },
      {
        path: '/dashboard/showAllUser',
        element: <PrivateRoute><ShowAllUser></ShowAllUser></PrivateRoute>
      },
      {
        path: '/dashboard/siteSetting',
        element: <PrivateRoute><SiteSetting></SiteSetting></PrivateRoute>
      },
      {
        path: '/dashboard/manageCoupon',
        element: <PrivateRoute><ManageCoupon></ManageCoupon></PrivateRoute>
      }

    ]
  },
  {
    path: '/updateProduct/:id',
    element: <UserUpdateProduct></UserUpdateProduct>
  }
]);

export default router;
