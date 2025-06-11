import { createBrowserRouter } from "react-router-dom"
import Index from "../Pages/Jams/Jams"
import Details from "../Pages/Details/Details"
import Landing from "../Pages/Landing/Landing"

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
        path: "/jams",
        element: <div>jams Page</div>,
    },
    {
        path: "/likedjams",
        element: <div>Liked Jams Page</div>,
    },
    {
        path: "/details",
        element: <Details />,
    },
    {
        path: "/from",
        element: <div>From Page</div>,
    },
    {
        path: "/test",
        element: <Index />,
    },

    {
        path: "/landing",
        element: <Landing />,
    }

])

export default routes