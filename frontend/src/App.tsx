import {FC, ReactElement} from 'react'
import { BrowserRouter as Router, Routes, Route } from
  'react-router-dom'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import './App.css';
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Login from './pages/Login';
import Register from './pages/Register';
import UserProfile from './pages/userProfile'
import CreateUpdateSighting from './pages/createUpdateSighting'
import Home from './pages/Home';




const App:FC = ():ReactElement => {
  return (
    <>
      <Router>
        <div className='container'>
          <Navbar />
          <Routes>

            <Route path='/' element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/account' element={<UserProfile />} />
            <Route path='/report' element={<CreateUpdateSighting />} />

          </Routes>
          <Footer />
        </div>
      </Router>
      <ToastContainer/>
      </>
      );
}

      export default App;
