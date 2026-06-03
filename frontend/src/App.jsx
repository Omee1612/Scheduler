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
import Profile from './components/Profile'
import OrderPage from './pages/OrderPage'
import OrderCat from './components/OrderCat'

const GuestRoute = ({children}) => {
  const {user} = useAuth();
  return user? <Navigate to = "/" replace /> : children;
}
const ProtectedRoute = ({children}) => {
  const {user} = useAuth();
  return user ? children : <Navigate to ="/" replace/>;
}
function App() { 
  return ( 
    <AuthProvider>
     <Router>
      <div className ="min-h-screen flex flex-col">
      <Navbar user="user"/>
      <div className = "flex">
      <Routes>
        <Route path="/" element= {<Home></Home>}></Route>
        <Route path="/reg" element= {<GuestRoute><Register></Register></GuestRoute>}></Route>
        <Route path = "/log" element = {<GuestRoute><Login/></GuestRoute>}></Route>
        <Route path = "/cat" element = {<Catalogue />}></Route>
        <Route path = "/adm" element = {<MStore />}></Route>
        <Route path = "/prof" element = {<ProtectedRoute><Profile/></ProtectedRoute>}></Route>
        <Route path = "/order" element = {<ProtectedRoute><OrderPage></OrderPage></ProtectedRoute>}></Route>
        <Route path = "/ordercat" element = {<OrderCat/>}></Route>
      </Routes>
      </div>
      </div>
     </Router>
     </AuthProvider>
  )
}

export default App
