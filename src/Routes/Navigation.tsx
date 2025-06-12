import { createBrowserRouter } from "react-router-dom"
import Home from "../Pages/Home/Home"
import Details from "../Pages/Details/Details"
import Landing from "../Pages/Landing/Landing"
import Auth from "../Pages/Login/Login"

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
        path: "/test",
        element: <div>test</div>,
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
        element: <div>MyjamsPage</div>,
    },
    
    {
        path: "/favorites",
        element: <div>Favorites</div>,
    },

])

export default routes

