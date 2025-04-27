import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { isAuthenticated } from "./index";

// const PrivateRoute = ({element : Component,...rest}) =>{
//    /* The code is defining a functional component called `PrivateRoute`. This component is used to
//    create a protected route in a React application. */
//     return (
//         <Route
//             {...rest}
//             render ={/* The code `props => isAuthenticated() ? (<Component {...props}/>) :
//             (redirect("/login"))` is a conditional rendering statement inside the `render`
//             prop of the `Route` component. */
//             props => 
//             isAuthenticated() ? (
//                 <Component {...props}/>
//             ) : (
//                 //redirect to login page
//                  <Navigate to="/signin" />
//             )}
//         />
//     )
// }

/**
 * The PrivateRoute component checks if the user is authenticated and renders the Outlet component if
 * they are, otherwise it redirects to the signin page.
 * @returns The PrivateRoute component returns either the Outlet component or the Navigate component.
 * If the user is authenticated, the Outlet component is returned, which renders the child routes. If
 * the user is not authenticated, the Navigate component is returned, which redirects the user to the
 * "/signin" route.
 */
const PrivateRoute = () => {
    const auth = isAuthenticated();
    return auth ? <Outlet /> : <Navigate to="/signin" />;
}

export default PrivateRoute;