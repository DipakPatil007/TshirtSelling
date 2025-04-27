import { API } from "../../backend";
import React from "react";

//Category Calls
//create category
export const createCategory = (userId, token, category) => {
  return fetch(`${API}/category/create/${userId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json;",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(category),
  })
    .then((res) => res)
    .catch(() => console.log("error"));
};

//get All Categories
export const getCategories = () => {
  return fetch(`${API}/categories`, {
    method: "GET",
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

//update category
export const updateCategory = (categoryId, userId, token, category) => {
  return fetch(`${API}/category/${categoryId}/${userId}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(category),
  })
    .then((res) => {
      return res.json();
    })
    .catch(() => {
      console.log("error");
    });
};

//get category by Id
export const getCategory = (categoryId) => {
  return fetch(`${API}/category/${categoryId}`, {
    method: "GET",
  })
    .then((resp) => resp.json())
    .catch(() => console.log("Error"));
};

//delete category
export const deleteCategory = (categoryId, userId, token) => {
  return fetch(`${API}/category/${categoryId}/${userId}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  });
};

//Products Calls
//create product
export const createProduct = (userId, token, product) => {
  return fetch(`${API}/product/create/${userId}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      Authorization: ` Bearer ${token}`,
    },
    body: product,
  })
    .then((response) => response.json())
    .catch((err) => console.log(err));
};

//get all products
export const getProducts = () => {
  return fetch(`${API}/products`, {
    method: "GET",
  })
    .then((response) => {
      return response.json();
    })
    .catch((e) => console.log("Error", e));
};

//get a product
export const getProduct = (productId) => {
  return fetch(`${API}/product/${productId}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .catch(() => console.error("Error"));
};

//delete product
export const deleteProduct = (productId, userId, token) => {
  return fetch(`${API}/product/${productId}/${userId}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => {
      return res.json();
    })
    .catch((err) => console.log("ERROR", err));
};

//update product
export const updateProduct = (productId, userId, token, product) => {
  return fetch(`${API}/product/${productId}/${userId}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: product,
  })
    .then((res) => {
      return res.json();
    })
    .catch((err) => console.log("ERROR", err));
};
