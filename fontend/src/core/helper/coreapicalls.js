import { API } from "../../backend";

export const getProducts = () => {
  return fetch(`${API}/1`, {
    method: "GET",
  })
    .then((response) => {
      return response.json();
    })
    .catch((error) => {
      console.log("Error in getting products", error);
    });
};


