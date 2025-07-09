// import Profile from './Profile.jsx'
// import Cart from './Cart.jsx'
import LandingPage from  './pages/LandingPage.jsx';
import Profile from './Profile.jsx';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './pages/LoginPage.jsx';
import Signup from './pages/SignupPage.jsx';
import DashBoard from './pages/DashBoard.jsx';
import ChefApp from './pages/Chef/ChefApp.jsx';
import Cart from './pages/Cart.jsx';
import Allchef from './pages/Allchef.jsx';
// import LandingPage from './pages/LandingPage.jsx';

function App(){
  return (
    <div>
      <BrowserRouter>
        <Routes>
         
          <Route path="/dashboard" element={<DashBoard />} />
          <Route path='/chef/*' element={<ChefApp />} />
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
           <Route path="/signup" element={<Signup />} />
           <Route path="/cart" element={<Cart />} />
          <Route path="/allchef" element={<Allchef />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App;
