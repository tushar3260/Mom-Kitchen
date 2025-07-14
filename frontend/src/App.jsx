import LandingPage from './pages/LandingPage.jsx';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './pages/LoginPage.jsx';
import Signup from './pages/SignupPage.jsx';
import DashBoard from './pages/DashBoard.jsx';
import ChefApp from './pages/Chef/ChefApp.jsx';
import Cart from './pages/Cart.jsx';
import Allchef from './pages/Allchef.jsx';
import AddLocation from './pages/Addlocation.jsx';
import { UserProvider } from './context/userContext.jsx';
import UserProtect from './ProtectWrapper/UserProtect.jsx';  // 👈 Import protect component
import AdminApp from './Admin/AdminApp.jsx';
import { AdminProvider } from './Admin/context/AdminContext.jsx';
import AdminProtect from './Admin/protect/adminprotect.jsx';


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
            <Route path="/admin/secure/tales/*" element={
              
              <AdminProvider>
                <AdminProtect>
                
                <AdminApp />
                </AdminProtect>
              </AdminProvider>
            } />
            
            



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
                <UserProtect>
                  <ChefApp />
                </UserProtect>
              } 
            />

          </Routes>
        </BrowserRouter>
      </UserProvider>
    </div>
  );
}

export default App;
