import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';

import Home from './pages/Home/HomePage.js';
import Root from './pages/Root';
import Login from './pages/Login/Login';
import SignUp from './pages/Signup/SignUp.js';
import Orders from './pages/User/ManageOrders/Orders.js';
import RequireAuth from './components/RequireAuth';
import ProductListing from './pages/User/product/ProductListing';
import AdminProductListing from './pages/Admin/Products/AdminProductListing.js';
import AddProduct from './pages/Admin/Products/AddProduct.js';
import Cart from './pages/User/cart/Cart.js';
import UpdateProduct from './pages/Admin/Products/UpdateProduct.js';
import { UnauthorizedPage } from './pages/Error/UnauthorizedPage.js';
import { NotFound } from './pages/Error/NotFoundPage.js';
import AdminInfo from './pages/Admin/Accounts/AdminInfo.js';
import AdminOrderListing from './pages/Admin/Orders/AdminOrderListing.js';
import UserList from './pages/Admin/ManageUsers/UserList.js';
import UserProfile from './pages/User/Account/UserProfile/UserProfile.js';
import AdminReports from './pages/Admin/SalesReport/SalesFunctionality.js';

const roles = [
  'user',
  'admin'
]

let isAuthenticated = !!localStorage.getItem('token')

const router = createBrowserRouter([
  {
    path: '/',
    element:
      <RequireAuth redirectTo='/login' role={roles}>
        <Home />
      </RequireAuth>,
  },
  {
    path: '/not-found', element: <NotFound /> 
  },
  {
    path: '/unauthorized', element: <UnauthorizedPage /> 
  },
  {
    path: '/login', element: <Login />
  },
  {
      path: '/signup', element: <SignUp />
  },
  {
    path: '/shop', element:
      <RequireAuth redirectTo='/login' role='user'>
        <Root />
      </RequireAuth>,
    children: [
      {
        path: '/shop', element: <ProductListing />
      },
      {
        path: '/shop/orders', element: <Orders />
      },
      {
        path: '/shop/cart', element: <Cart />
      },
    ]
  },
  {
    path: '/account', element:
      <RequireAuth redirectTo='/login' role='user'>
        <Root />
      </RequireAuth>,
    children: [
      {
        path: '/account', element: <UserProfile />
      }
    ]
  },
  {
    path: '/admin',
    element:
      <RequireAuth redirectTo='/unauthorized' role='admin'>
        <Root />,
      </RequireAuth>,
    children: [
      {
        path: '/admin/users',
        element: <UserList />
      },
      {
        path: '/admin/products',
        element: <AdminProductListing/>
      },
      {
        path: '/admin/products/addproduct',
        element: <AddProduct/>
      },
      {
        path: '/admin/products/update/:product_id',
        element: <UpdateProduct/>
      },
      {
        path: '/admin/orders',
        element: <AdminOrderListing/>
      },
      {
        path: '/admin/reports',
        element: <AdminReports />
      },
      {
        path: '/admin/account',
        element: <AdminInfo />
      }
    ]
  },
  {
    path: '*',    // 404 Error for any other routes
    element: <NotFound />
  }
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
