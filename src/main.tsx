
import { createRoot } from 'react-dom/client'
import {RouterProvider} from'react-router-dom'
import routes from './Routes/Navigation.tsx'
import './index.css'
import DataSync from './services/dataSync.tsx'

createRoot(document.getElementById('root')!).render(
    <>
    <div  className="min-h-screen min-w-full">
    <DataSync/>
    <RouterProvider router={routes} />
    </div>
    </>
    
   
)
