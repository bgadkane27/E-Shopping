import { Route, Routes } from "react-router-dom";
import AppLayout from "./components/auth/layout";
import AuthLogin from "./pages/auth/login";
import AuthRegister from "./pages/auth/register";
import AdminLayout from "./components/admin-view/layout";
import AdminDashboard from "./pages/admin-view/dashboard";
import AdminOrders from "./pages/admin-view/orders";
import AdminFeatures from "./pages/admin-view/features";
import AdminProducts from "./pages/admin-view/products";
import ShopLayout from "./components/shop-view/layout";
import ShopAccount from "./pages/shop-view/account";
import ShopCheckout from "./pages/shop-view/checkout";
import ShopHome from "./pages/shop-view/home";
import ShopListing from "./pages/shop-view/listing";
import NotFound from "./pages/not-found/notfound";

function App() {
  return (
    <div className="flex flex-col overflow-hidden bg-green-400">
      <h4>Header</h4>
      <Routes>
        <Route path="/auth" element={<AppLayout />}>
          <Route path="login" element={<AuthLogin />} />
          <Route path="register" element={<AuthRegister />} />
          <Route />
        </Route>
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="features" element={<AdminFeatures />} />
          <Route path="orders" element={<AdminOrders />} />
          <Route path="products" element={<AdminProducts />} />
        </Route>
        <Route path="/shop" element={<ShopLayout />}>
          <Route path="account" element={<ShopAccount />} />
          <Route path="checkout" element={<ShopCheckout />} />
          <Route path="home" element={<ShopHome />} />
          <Route path="listing" element={<ShopListing />} />
        </Route>
        <Route path="*" element={<NotFound />}/>
      </Routes>
    </div>
  );
}

export default App;
