import LandingPage from "./pages/LandingPage.jsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/LoginPage.jsx";
import Signup from "./pages/SignupPage.jsx";
import DashBoard from "./pages/DashBoard.jsx";
import ChefApp from "./pages/Chef/ChefApp.jsx";
import Cart from "./pages/Cart.jsx";
import Allchef from "./pages/Allchef.jsx";
import AddLocation from "./pages/Addlocation.jsx";
import { UserProvider } from "./context/userContext.jsx";
import UserProtect from "./ProtectWrapper/UserProtect.jsx"; // 👈 Import protect component
import { ChefProvider } from "./pages/Chef/context/ChefContext.jsx";
import OTPPage from "./pages/OTPPage.jsx"; // Assuming OTPPage is used in the flow
import AdminApp from "./Admin/AdminApp.jsx";
import AdminProtect from "./Admin/protect/adminprotect.jsx";
import { AdminProvider } from "./Admin/context/AdminContext.jsx";// 👈 Import AdminProvider
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
            {/* Protected Routes */}
            <Route
              path="/dashboard"
              element={
                <UserProtect>
                  <DashBoard />
                </UserProtect>
              }
            />
            <Route
              path="/chef/*"
              element={
                <ChefProvider>
                  
                    <ChefApp />
                  
                </ChefProvider>
              }
            />
            <Route path="/admin/secure/tales/*" element={
              
            
                
                <AdminApp />
             
            } />
          </Routes>
        </BrowserRouter>
      </UserProvider>
    </div>
  );
}

export default App;
