import { createBrowserRouter } from "react-router-dom"
import Home from "../Pages/Home/Home"
import Details from "../Pages/Details/Details"
import Landing from "../Pages/Landing/Landing"
import Auth from "../Pages/Login/Login"
import Form from "../Pages/Form/Form"
import MyJams from "../Pages/MyJams/MyJams"
import Favorites from "../Pages/Favorites/Favorites"

const routes = createBrowserRouter([
  {
    path: "/",
    element: <Landing />,
    
  },
  {
    path: "/login",
    element: <Auth />,
    },
    {
        path: "/form",
        element: <Form />,
    },
    {
        path: "/home",
        element: <Home />,
    },
    {
        path: "/details",
        element: <Details />,
    },
     {
        path: "/Myjams",
        element: <MyJams />,
    },
    
    {
        path: "/favorites",
        element: <Favorites />,
    },

])

export default routes

