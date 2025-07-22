import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage.jsx";
import Login from "./pages/LoginPage.jsx";
import Signup from "./pages/SignupPage.jsx";
import Dashboard from "./pages/DashBoard.jsx";
import ChefApp from "./pages/Chef/ChefApp.jsx";
import Cart from "./pages/Cart.jsx";
import Allchef from "./pages/Allchef.jsx";
import AllMeals from "./pages/AllMeals";
import ChefDetail from "./pages/Chef/ChefDetail.jsx";
import AddLocation from "./pages/AddLocation.jsx";
import { UserProvider } from "./context/userContext.jsx";
import UserProtect from "./ProtectWrapper/UserProtect.jsx"; // 👈 Import protect component
import { ChefProvider } from "./pages/Chef/Context/ChefContext.jsx";
import OTPPage from "./pages/OTPPage.jsx"; // Assuming OTPPage is used in the flow
import AdminApp from "./Admin/AdminApp.jsx";
//import AdminProtect from "./Admin/protect/adminprotect.jsx";
import { AdminProvider } from "./Admin/context/AdminContext.jsx";// 👈 Import AdminProvider
import ResetPassword from "./pages/ResetPassword.jsx";
import ForgotPassword from "./pages/ForgotPassword.jsx";
import Checkout from "./pages/Checkout.jsx";
import OrderNowPage from "./components/OrderNowPage.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";
import MyOrderPage from '../src/pages/MyOrderPage.jsx'
import DashboardLayout from "./components/Dashcomponents/DashboardLayout.jsx";
import OrderSummary from "./components/Dashcomponents/OrderSummary.jsx";
import Charts from "./components/Dashcomponents/Charts.jsx";
import Tracker from "./components/Dashcomponents/Tracker.jsx";
import SubscriptionPage from "./components/Dashcomponents/SubscriptionPage.jsx";
import Wallet from "./components/Dashcomponents/Wallet.jsx";
import ReferAndEarn from "./components/Dashcomponents/ReferAndEarnPage.jsx";
import Support from "./components/Dashcomponents/Support.jsx";
import Settings from "./components/Dashcomponents/Setting.jsx";
import UpcomingMeals from "./components/Dashcomponents/UpcomingMeals.jsx";
import Aboutus from '../src/pages/Aboutus.jsx'
import Team from '../src/pages/Team.jsx'
import Helpandsupport from '../src/pages/Helpandsupport.jsx'
import Termcondition from '../src/pages/Termcondition.jsx'
import Refundcancellation from '../src/pages/Refundcancellation.jsx'
function App() {
  return (
    <div>
      <UserProvider>
        <BrowserRouter>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/allchef" element={<Allchef />} />
            <Route path="/addlocation" element={<AddLocation />} />
            <Route path="/otp" element={<OTPPage />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password/:token" element={<ResetPassword />} />
            <Route path="/order-now/:id" element={<OrderNowPage />} />
            <Route path="/meals" element={<AllMeals />} />
            <Route path="/chef-detail/:id" element={<ChefDetail />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/orders" element={<MyOrderPage />} />
            <Route path="/aboutus" element={<Aboutus/>} />
            <Route path="/team" element={<Team/>} />
             <Route path="/help" element={<Helpandsupport/>} />
              <Route path="/terms" element={<Termcondition/>} />
               <Route path="/refund" element={<Refundcancellation/>} />
            {/* Protected Routes */}
            <Route
              path="/dashboard/*"
              element={
                <UserProtect>
                  <DashboardLayout />
                </UserProtect>
              }
            >
              <Route index element={<Dashboard />} /> {/* Default page */}
              <Route path="orders" element={<OrderSummary />} />
              <Route path="tracker" element={<Tracker />} />
              <Route path="charts" element={<Charts />} />
              <Route path="subscription" element={<SubscriptionPage />} />
              <Route path="wallet" element={<Wallet />} />
              <Route path="refer" element={<ReferAndEarn />} />
              <Route path="support" element={<Support />} />
              <Route path="settings" element={<Settings />} />
              <Route path="upcoming" element={<UpcomingMeals />} />
              {/* aur bhi nested components yahan add kar */}
            </Route>

            <Route path="/profile" element={<ProfilePage />} />

            <Route
              path="/chef/*"
              element={
                <ChefProvider>
                  <ChefApp />
                </ChefProvider>
              }
            />
            <Route path="/admin/secure/tales/*" element={<AdminApp />} />
          </Routes>
        </BrowserRouter>
      </UserProvider>
    </div>
  );
}

export default App;
