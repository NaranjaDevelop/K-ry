import { createBrowserRouter } from "react-router-dom"


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
        path: "/jams/:id",
        element: <div>Jam Details Page</div>,
    },
    {
        path: "/from",
        element: <div>From Page</div>,
    }

])

export default routes