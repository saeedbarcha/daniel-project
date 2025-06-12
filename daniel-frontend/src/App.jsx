import React from 'react'
import "./App.css"
import 'bootstrap/dist/css/bootstrap.min.css';
import { createBrowserRouter } from 'react-router-dom';
import { RouterProvider } from 'react-router-dom';
import ProtectedRoute from './routes/ProtectedRoute';
import Affiliates from './pages/affiliates/affiliates';
import AdminLogin from './pages/admin/login';
import AffiliatesLogin from './pages/affiliates/login';
import Client from './pages/client/client';
import ClientLogin from './pages/client/login';
import AdminDashboard from './pages/admin/adminDashboard';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ProfilePage from './pages/profile/profile';
import PageNotFound from './pages/not_found/pagenotFound';

const App = () => {

  const router = createBrowserRouter([
 
    {
      path: "/client-login",
      element: <ClientLogin />

    },
    {
      path: "/client-dashboard",
      element: <ProtectedRoute element={<Client />} redirectTo="/client-login" />
    },
  
    {
      path: "/affiliates-page",
      element: <ProtectedRoute element={<Affiliates />} redirectTo="/affiliate-login" />
    },

    {
      path: "/affiliate-login",
      element: <AffiliatesLogin />,
    },
    {
      path: "/",
      element: <AdminLogin />,
    },
    {
      path: "/admin-dashboard",
      element: <ProtectedRoute element={<AdminDashboard />} redirectTo="/" />
    },
    {
      path: "/profile-page",
      element:<ProfilePage/>
    },
    { path: "*", element: <PageNotFound /> },

 

  ])

  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer 
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  )
}

export default App;
