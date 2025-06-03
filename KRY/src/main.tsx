
import { createRoot } from 'react-dom/client'
import {RouterProvider} from'react-router-dom'
import routes from './Routes/Navigation.tsx'
import './index.css'

createRoot(document.getElementById('root')!).render(
    <>
    <div  className="min-h-screen min-w-full">
        
    <RouterProvider router={routes} />
    </div>
    </>
    
   
)
