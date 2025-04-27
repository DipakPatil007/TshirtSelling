import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./core/Home";
import Signup from "./user/Signup";
import Signin from "./user/Signin";
import AdminRoute from "./auth/helper/AdminRoutes";
import PrivateRoute from "./auth/helper/PrivateRoutes";
import AdminDashboard from "./user/AdminDashBoard";
import UserDashboard from "./user/UserDashBoard";
import AddCategory from "./admin/AddCategory";
import ManageCategories from "./admin/ManageCategories";
import AddProduct from "./admin/AddProduct";
import ManageProducts from "./admin/ManageProducts";
import UpdateProduct from "./admin/UpdateProduct";
import UpdateCategory from "./admin/UpdateCategory";
import Cart from "./core/Cart";


export default function Routess() {
  return (
    <div>
      <Router>
        <Routes>
          {/* anyone can access this route  public route*/}
          <Route path="/" exact element={<Home />} />
          <Route path="/cart" exact element={<Cart />} />

          {/* you have to signin or signup using this route #public route */}
          <Route path="/signup" exact element={<Signup />} />
          <Route path="/signin" exact element={<Signin />} />


          {/* From here onwords every route is private and admin route */}
          <Route exact path="/user/dashboard" element={<PrivateRoute />}>
            <Route exact path="/user/dashboard" element={<UserDashboard />} />
          </Route>

          <Route exact path="/admin/dashboard" element={<AdminRoute />}>
            <Route exact path="/admin/dashboard" element={<AdminDashboard />} />
          </Route>

          <Route exact path="/admin/create/category" element={<AdminRoute />}>
            <Route
              exact
              path="/admin/create/category"
              element={<AddCategory />}
            />
          </Route>

          <Route exact path="/admin/categories" element={<AdminRoute />}>
            <Route
              exact
              path="/admin/categories"
              element={<ManageCategories />}
            />
          </Route>

          <Route exact path="/admin/create/product" element={<AdminRoute />}>
            <Route
              exact
              path="/admin/create/product"
              element={<AddProduct />}
            />
          </Route>

          <Route exact path="/admin/products" element={<AdminRoute />}>
            <Route
              exact
              path="/admin/products"
              element={<ManageProducts />}
            />
          </Route>

          <Route exact path="/admin/product/update/:productId" element={<AdminRoute />}>
            <Route
              exact
              path="/admin/product/update/:productId"
              element={<UpdateProduct />}
            />
          </Route>

          <Route exact path="/admin/category/update/:categoryId" element={<AdminRoute />}>
            <Route
              exact
              path="/admin/category/update/:categoryId"
              element={<UpdateCategory />}
            />
          </Route>


        </Routes>
      </Router>
    </div>
  );
}
