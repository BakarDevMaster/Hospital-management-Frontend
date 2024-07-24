import './App.css'

import { BrowserRouter as Router, Routes, Route   } from 'react-router-dom'
import Home from './pages/Home'
import Appointement from './pages/Appointement'
import Login from './pages/Login'
import About from './pages/About'
import Register from './pages/Register'
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useContext, useEffect, } from 'react'
import { context } from './main'

function App() { 
  const {setIsAuthenticated,} = useContext(context)

  
  useEffect(() => {
    const token = localStorage.getItem('patienttoken');
    if (token) {
      setIsAuthenticated(true);
    }
  }, [setIsAuthenticated]);
 
  return(
    <div>
     <Router>
       <Routes>
         <Route path="/" element={<Home/>} />
         <Route path="/appointement" element={<Appointement/>} />
         <Route path="/login" element={<Login/>} />
         <Route path="/about" element={<About/>} />
         <Route path="/signup" element={<Register/>} />
       </Routes>
       <ToastContainer position='top-center'/>
     </Router>
    </div>
  )


}

export default App
