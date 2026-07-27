import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";

// =========================
// Customer Pages
// =========================

import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import Wishlist from "./pages/Wishlist";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Checkout from "./pages/Checkout";
import Profile from "./pages/Profile";
import Orders from "./pages/Orders";
import OrderDetails from "./pages/OrderDetails";

// =========================
// Protected Route
// =========================

import ProtectedRoute from "./components/ProtectedRoute";

// =========================
// Admin
// =========================

import Dashboard from "./admin/pages/Dashboard";
import AdminRoute from "./admin/components/AdminRoute";

// ===== Uncomment after development =====

import Users from "./admin/pages/Users";
import Categories from "./admin/pages/Categories";
import AdminProducts from "./admin/pages/Products";
import AdminOrders from "./admin/pages/Orders";
// import Reviews from "./admin/pages/Reviews";
// import Coupons from "./admin/pages/Coupons";

function App() {

  return (

    <BrowserRouter>

      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
      />

      <Routes>

        {/* ========================= */}
        {/* Public Routes */}
        {/* ========================= */}

        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/products"
          element={<Products />}
        />

        <Route
          path="/product/:id"
          element={<ProductDetails />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        {/* ========================= */}
        {/* User Protected Routes */}
        {/* ========================= */}

        <Route
          path="/cart"
          element={
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>
          }
        />

        <Route
          path="/wishlist"
          element={
            <ProtectedRoute>
              <Wishlist />
            </ProtectedRoute>
          }
        />

        <Route
          path="/checkout"
          element={
            <ProtectedRoute>
              <Checkout />
            </ProtectedRoute>
          }
        />

        <Route
          path="/orders"
          element={
            <ProtectedRoute>
              <Orders />
            </ProtectedRoute>
          }
        />

        <Route
          path="/orders/:id"
          element={
            <ProtectedRoute>
              <OrderDetails />
            </ProtectedRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

        {/* ========================= */}
        {/* Admin Routes */}
        {/* ========================= */}

        <Route
          path="/admin/dashboard"
          element={
            <AdminRoute>
              <Dashboard />
            </AdminRoute>
          }
        />

        {/* ========================================= */}
        {/* Uncomment after each page is developed */}
        {/* ========================================= */}


        <Route
          path="/admin/users"
          element={
            <AdminRoute>
              <Users />
            </AdminRoute>
          }
        />

        <Route
          path="/admin/categories"
          element={
            <AdminRoute>
              <Categories />
            </AdminRoute>
          }
        />

        <Route
          path="/admin/products"
          element={
            <AdminRoute>
              <AdminProducts />
            </AdminRoute>
          }
        />

        <Route
          path="/admin/orders"
          element={
            <AdminRoute>
              <AdminOrders />
            </AdminRoute>
          }
        />
        {/*
                <Route
                    path="/admin/reviews"
                    element={
                        <AdminRoute>
                            <Reviews />
                        </AdminRoute>
                    }
                />

                <Route
                    path="/admin/coupons"
                    element={
                        <AdminRoute>
                            <Coupons />
                        </AdminRoute>
                    }
                />
                */}

        {/* ========================= */}
        {/* 404 */}
        {/* ========================= */}

        {/*
                <Route
                    path="*"
                    element={<NotFound />}
                />
                */}

      </Routes>

    </BrowserRouter>

  );

}

export default App;