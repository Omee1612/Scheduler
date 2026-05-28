import { useState } from 'react'
import {BrowserRouter as Router,Routes,Route,Navigate} from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Register from './pages/Register'
import Login from "./pages/Login"
import { AuthProvider, useAuth } from './context/AuthContext'
import Catalogue from './pages/Catalogue'
import MStore from './pages/MStore'

const GuestRoute = ({children}) => {
  const {user} = useAuth();
  return user? <Navigate to = "/" replace /> : children;
}
function App() { 
  return ( 
    <AuthProvider>
     <Router>
      <div className ="min-h-screen flex flex-col">
      <Navbar user="user"/>
      <div className = "flex-1 flex">
      <Routes>
        <Route path="/" element= {<Home></Home>}></Route>
        <Route path="/reg" element= {<GuestRoute><Register></Register></GuestRoute>}></Route>
        <Route path = "/log" element = {<GuestRoute><Login/></GuestRoute>}></Route>
        <Route path = "/cat" element = {<Catalogue />}></Route>
        <Route path = "/adm" element = {<MStore />}></Route>
      </Routes>
      </div>
      </div>
     </Router>
     </AuthProvider>
  )
}

export default App
