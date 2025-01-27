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
import CheckAuth from "./components/common/check-auth";
import UnauthPage from "./pages/unauth-page";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { authUser } from "./store/auth-slice";
import PaypalReturnPage from "./pages/shop-view/paypal-return";
import PaymentSuccessPage from "./pages/shop-view/payment-success";
import SearchProducts from "./pages/shop-view/search";

function App() {
  
  const {user, isAuthenticated, isLoading } = useSelector((state) => state.auth)
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(authUser())
  }, [dispatch])

  if(isLoading) {
    return (
      <div>Loading...</div>
    )
  }
  return (
    <div className="flex flex-col overflow-hidden">
      {/* <h4>Header</h4> */}
      <Routes>
        <Route path="/auth" element={
          <CheckAuth isAuthenticated={isAuthenticated} user={user} >
            <AppLayout />
          </CheckAuth>
        }>
          <Route path="login" element={<AuthLogin />} />
          <Route path="register" element={<AuthRegister />} />
          <Route />
        </Route>
        <Route path="/admin" element={
          <CheckAuth isAuthenticated={isAuthenticated} user={user}>
            <AdminLayout />
          </CheckAuth>
        }>
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="features" element={<AdminFeatures />} />
          <Route path="orders" element={<AdminOrders />} />
          <Route path="products" element={<AdminProducts />} />
        </Route>
        <Route path="/shop" element={
          <CheckAuth isAuthenticated={isAuthenticated} user={user}>
            <ShopLayout />
          </CheckAuth>
        }>
          <Route path="account" element={<ShopAccount />} />
          <Route path="checkout" element={<ShopCheckout />} />
          <Route path="home" element={<ShopHome />} />
          <Route path="listing" element={<ShopListing />} />
          <Route path="paypal-return" element={<PaypalReturnPage />}/>
          <Route path="payment-success" element={<PaymentSuccessPage />}/>
          <Route path="search" element={<SearchProducts />}/>
        </Route>
        <Route path='unauth-page' element={<UnauthPage />}/>
        <Route path="*" element={<NotFound />}/>
      </Routes>
    </div>
  );
}

export default App;
