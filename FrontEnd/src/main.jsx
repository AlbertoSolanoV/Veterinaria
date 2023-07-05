import React from 'react'
import { createRoot } from 'react-dom/client'
import { App } from './App';
import { Login } from './Login';
import {AdminCita} from './AdminCita';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Error } from './error';
import { SignUp } from './SignUp';
import { PetManagement } from './PetManagement';
import { CitasDispo } from './CitasDispo';

import EditPet  from './EditPet';


const root = createRoot(document.getElementById('root'));
const router = createBrowserRouter([
    {
    path: "/login",
    element: <Login />,
    errorElement: <Error />
    },
    {
        path: "/",
        element: <App />,
        errorElement: <Error />
    },
    {
        path: "/SignUp",
        element: <SignUp />,
        errorElement: <Error/>
    },
    {   path: "/agregarCita",
        element: <AdminCita />,
        errorElement: <Error />
    },
    {   path: "/citasDispo",
        element: <CitasDispo />,
        errorElement: <Error />
    },
    {
        path: "/Pets",
        element: <PetManagement />,
        errorElement: <Error />
    },
    {
        path: "/edit-pet",
        element: <EditPet />,
        errorElement: <Error />
    }
])

root.render(<RouterProvider router={router} />);
