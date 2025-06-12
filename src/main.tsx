
import { createRoot } from 'react-dom/client'
import {RouterProvider} from'react-router-dom'
import routes from './Routes/Navigation.tsx'
import './index.css'
import DataSync from './services/dataSync.tsx'
import { Provider } from 'react-redux'
import { store } from './store/store.ts'

createRoot(document.getElementById('root')!).render(
    <>
    <div  className="min-h-screen min-w-full">
    <Provider store={store}>
    <DataSync/>
    <RouterProvider router={routes} />
    </Provider>
    </div>
    </>
    
   
)
