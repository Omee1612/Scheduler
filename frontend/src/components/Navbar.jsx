import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { BiCog } from "react-icons/bi";
import { useState } from "react";

const Navbar = () => {
    const options = ['Profile','Orders','Contact Support','Logout'];
    const [isOpen,setIsOpen] = useState(false);
    const {user,logout} = useAuth();
    const navigate = useNavigate();
     console.log("user:", user)  
    return (
     <nav className="bg-red-500 text-white p-10 flex justify-between w-screen">
      <div className="flex gap-4"><NavLink to="/" className = "">Home</NavLink>
      {
        user?.isAdmin ? (
            <><NavLink to="/adm">Manage Store</NavLink><NavLink to="/ordercat">See Orders</NavLink></>
        ) : ``
      }
      <NavLink to ="/cat">Catalogue</NavLink>
      </div>
      <div className ="flex gap-4">
      {
        user ? (
            <>
            <span className="text-xl">{user.name}</span>
            <div className="relative">
            <button onClick={() => setIsOpen(!isOpen)}><BiCog className="text-2xl"/></button>
            {
                isOpen && <div className ="absolute mt-2 right-0 w-48 bg-white shadow-lg flex flex-col">
                    {
                        options.map(option => (
                            <button className="p-3 text-left hover:bg-gray-100 text-black" 
                            key={option} onClick={() => {
                                if(option === "Logout") {
                                    setIsOpen(false);
                                    logout();
                                }
                                else if(option === "Profile") {
                                    setIsOpen(false);
                                    navigate("/prof");
                                }
                            }}>{option}</button>
                        )
                        )
                    }
                </div>
            }
            </div>
            </>
        ) :(<><NavLink to="/log">Login</NavLink><NavLink to="/reg">Register</NavLink></>)
      }</div>
</nav>  
    );
}
export default Navbar;