// import React from 'react'
// import { useSelector } from 'react-redux'
// import { Navigate } from 'react-router'
// import { selectIsAuthanticated } from '../features/authSlice'



// const ProtectedRoute = ({ element, redirectTo }) => {

//     const isAuthanticated = useSelector(selectIsAuthanticated)

//     return isAuthanticated ? element : <Navigate to={redirectTo} />


// }

// export default ProtectedRoute;

import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ element, redirectTo }) => {
  const { userInfo } = useSelector((state) => state.auth);
  
  // Simple conditional rendering instead of using state updates
  return userInfo ? element : <Navigate to={redirectTo} replace />;
};

export default ProtectedRoute;