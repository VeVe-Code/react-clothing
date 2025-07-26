import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './main.css';
import { RouterProvider } from 'react-router-dom';
import router from './routes/index.jsx';
import { AuthContextProvider } from './contexts/AuthContext.jsx';
import { CartcontextProvider } from './contexts/Cartcontext.jsx';


createRoot(document.getElementById('root')).render(

<AuthContextProvider>
    <CartcontextProvider>
      <RouterProvider router={router} />
    </CartcontextProvider>
  </AuthContextProvider>

);
