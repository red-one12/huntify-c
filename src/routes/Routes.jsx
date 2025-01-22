import {
  createBrowserRouter,
} from "react-router-dom";
import MainLayout from "../layouts.jsx/MainLayout";
import Home from "../pages/Home";
import Products from "../pages/Products";



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
]);


export default router;