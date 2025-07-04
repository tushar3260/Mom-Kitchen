// import Profile from './Profile.jsx'
// import Cart from './Cart.jsx'
import LandingPage from  './pages/LandingPage.jsx';
import Profile from './Profile.jsx';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './pages/LoginPage.jsx';
import Signup from './pages/SignupPage.jsx';
import DashBoard from './pages/DashBoard.jsx';
function App(){
  return (
    <div>
      <BrowserRouter>
        <Routes>
<<<<<<< HEAD
=======
          <Route path="/dashboard" element={<DashBoard />} />
>>>>>>> 293fcb6c35a06a782ea42562aa0d7c3e874e4361
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
           <Route path="/signup" element={<Signup />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App;
