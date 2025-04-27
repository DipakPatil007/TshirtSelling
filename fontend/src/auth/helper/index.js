// backend url
import { API } from "../../backend";

/**
 * The `signup` function sends a POST request to the `/signup` endpoint with user data and returns a
 * Promise that resolves to the response JSON.
 * @returns The `signup` function is returning a promise.
 */
export const signup = (user) => {
  return fetch(`${API}/signup`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(user)
  })
    .then(response => {
      console.log(response)
      return response.json();
    })
    .catch(err => console.log(err));
};


/**
 * The `signin` function sends a POST request to the `/signin` endpoint with user data and returns the
 * response as JSON.
 * @returns The `signin` function is returning a promise that resolves to the JSON response from the
 * API call.
 */
export const signin = user => {
  return fetch(`${API}/signin`, {
    method: "POST",
    headers: {
      Accept: "Application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  })
    .then((response) => response.json())
    .catch(err => console.log(err));
};


/**
 * The `authenticate` function stores a JSON Web Token (JWT) in the browser's local storage and calls
 * the `next` function.
 * @param data - The `data` parameter is the data that you want to store in the local storage. In this
 * case, it is being converted to a JSON string using `JSON.stringify()` before being stored in the
 * local storage.
 * @param next - The `next` parameter is a callback function that will be executed after the
 * authentication process is completed. It is typically used to redirect the user to a different page
 * or perform some other action after authentication.
 */
export const authenticate = (data, next) =>{
    if (typeof window !== "undefined") {
        localStorage.setItem('jwt', JSON.stringify(data));
        next();
    }
}

/**
 * The `signout` function removes the JWT token from local storage, performs a GET request to a signout
 * endpoint, and then redirects to the login page or performs some other action.
 * @returns The fetch request is being returned.
 */
export const signout = next => {
    if (typeof window !== "undefined") {
        localStorage.removeItem('jwt');
        // Redirect to login page here or do something else with the jwt token before it expires...
        next();
        return fetch(`${API}/signout`,{
            method:"GET"
        })
        .then(response => {
            console.log("signout Successfully")
        })
        .catch(err => console.log(err))
    }
};


/**
 * The function checks if the user is authenticated by checking if a JWT token is stored in the
 * browser's local storage.
 * @returns The function `isAuthenticated` returns either the JSON-parsed value of the "jwt" item from
 * the localStorage if it exists, or `false` if it does not exist or if the code is running in an
 * environment where the `window` object is not defined.
 */
export const isAuthenticated = () => {
    if (typeof window == "undefined") {
        return false;
    }
    if(localStorage.getItem("jwt")){
        return JSON.parse(localStorage.getItem("jwt"));
    }
    else{
        return false;
    }
}


