import { createBrowserRouter } from "react-router-dom"
import App from "../App"
import Home from "../Pages/Home/Home"
import Details from "../Pages/Details/Details"

const routes = createBrowserRouter([
  {
    path: "/",
    element: <div>Welcome to the KRY Test App</div>,
    
  },
  {
    path: "/login",
    element: <div>Login Page</div>,
    },
    {
        path: "/signup",
        element: <div>Signup Page</div>,
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