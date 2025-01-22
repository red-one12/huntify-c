import {
  createBrowserRouter,
} from "react-router-dom";
import MainLayout from "../layouts.jsx/MainLayout";
import Home from "../pages/Home";
import Products from "../pages/Products";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";



const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    children: [
      {
        path: '/',
        element: <Home></Home>
      },
      {
        path: '/products',
        element: <Products></Products>
      }
    ]
  },
  {
    path: '/signIn',
    element: <SignIn></SignIn>
  },
  {
    path: '/signUp',
    element: <SignUp></SignUp>
  },
]);


export default router;