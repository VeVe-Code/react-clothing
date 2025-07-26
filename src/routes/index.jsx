import { createBrowserRouter, Navigate } from "react-router-dom"; // Use react-router-dom
import App from '../pages/App.jsx';
import Login from '../pages/login.jsx';
import Layout from '../layout.jsx';
import Productdetail from '../pages/Productdetail.jsx';
import Register from '../pages/Register.jsx';
import Cart from '../pages/cart.jsx'; // Import Cart component
import Orders from '../pages/orders.jsx';
import AdminLayout from '../AdminLayout';
import AdminOrders from '../pages/admin/AdminOrders'; 
import AdminProducts from '../pages/admin/AdminProducts';
import AdminProductsForm from '../pages/admin/AdminProductsForm'; // Import AdminProducts component
import AdminCategories from "../pages/admin/AdminCategories.jsx";
import AdminOrdersdetail from '../pages/admin/AdminOrdersdetail.jsx';
let router = createBrowserRouter([
  {
    path: '/',
    Component: Layout, // Corrected to use `element` and wrapped in JSX
    children: [
      {
        path: '/',
        Component: App, // Wrapped in JSX
      },
      {
        path: '/login',
        Component: Login , // Wrapped in JSX
      },
      {
        path: '/products/:id',
        Component: Productdetail,
      },
     {
        path: '/Register',
        Component: Register,
      },
     {
      path: '/cart',
      Component: Cart, // Wrapped in JSX
     },
     { path: '/orders',
      Component: Orders, }
    // Wrapped in JSX
      

    ],
  }, {
    path: '/admin',
    Component: AdminLayout, // Corrected to use `element` and wrapped in JSX
    children: [
      {
        path: 'Orders',
        Component: () => {
          let isloggedin = localStorage.getItem('token');
          return isloggedin ? <AdminOrders /> : <Navigate to="/login" />;
        }, // Wrapped in JSX
      }, {
        path: 'AdminProducts',
        Component: () => {
          let isloggedin = localStorage.getItem('token');
          return isloggedin ? <AdminProducts  /> : <Navigate to="/login" />;
        }, // Wrapped in JSX
      },
      {
        path: 'AdminProducts/AdminProductscreate',
        Component: () => {                                               
          let isloggedin = localStorage.getItem('token');
          return isloggedin ? <AdminProductsForm  /> : <Navigate to="/login" />;
        }, // Wrapped in JSX
      }, {
        path: 'AdminProducts/:id/edit',
        Component: () => {
          let isloggedin = localStorage.getItem('token');
          return isloggedin ? <AdminProductsForm /> : <Navigate to="/login" />;
        }, // Wrapped in JSX
      }, 
      {
        path: 'AdminCategories',
        Component: () => {                                               
          let isloggedin = localStorage.getItem('token');
          return isloggedin ? <AdminCategories /> : <Navigate to="/login" />;
        }, // Wrapped in JSX
      },{
        path: 'AdminCategories/:id/edit',
        Component: () => {                                               
          let isloggedin = localStorage.getItem('token');
          return isloggedin ? <AdminCategories /> : <Navigate to="/login" />;
        }, // Wrapped in JSX
      },
      {
        path: 'orders/:id',
        Component: () => {                                               
          let isloggedin = localStorage.getItem('token');
          return isloggedin ? <AdminOrdersdetail /> : <Navigate to="/login" />;
        }, // Wrapped in JSX
      },
    ],
  }
]);

export default router;






