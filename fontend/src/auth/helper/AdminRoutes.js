import React from "react";
import { Navigate,Outlet } from "react-router-dom";
import { isAuthenticated } from "./index";

/**
 * The AdminRoute component is a higher-order component that renders the specified component only if
 * the user is authenticated and has a role of 1, otherwise it redirects to the login page.
 * @returns The AdminRoute component is being returned.
 */
// const AdminRoute = ({ component: Component, ...rest }) => {
//   return (
//     <Route
//       {...rest}
//       render={(props) =>
//         isAuthenticated() && isAuthenticated().user.role === 1 ? (
//           <Component {...props} />
//         ) : (
//           //redirect to login page
//           redirect("/login")
//         )
//       }
//     />
//   );
// };

const AdminRoute = () => {
  const auth  = isAuthenticated() && isAuthenticated().user.role === 1;
  return auth ? <Outlet/> : <Navigate to={'/signin'}/>;
}

export default AdminRoute;
