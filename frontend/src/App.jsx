// import Profile from './Profile.jsx'
// import Cart from './Cart.jsx'
import LandingPage from  './pages/LandingPage.jsx';
import Profile from './Profile.jsx';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './pages/LoginPage.jsx';
import Signup from './pages/SignupPage.jsx';
import DashBoard from './pages/DashBoard.jsx';
import ChefApp from './pages/Chef/ChefApp.jsx';
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
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App;
