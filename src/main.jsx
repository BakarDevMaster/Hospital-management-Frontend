import React, { createContext, useState } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'


export const context = createContext({isAuthenticated: false})

export const Appwrapper = ()=>{

  const [isAuthenticated, setIsAuthenticated]= useState(false)
  const [User, setUser]= useState({})
 
  return (
    <context.Provider value={{isAuthenticated, setIsAuthenticated, User, setUser}}>
      <App />
      </context.Provider>
  
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
<Appwrapper/>
  </React.StrictMode>,
)
