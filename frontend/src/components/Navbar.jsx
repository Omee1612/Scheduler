import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
    const {user,logout} = useAuth();
     console.log("user:", user)  
    return (
     <nav className="bg-red-500 text-white p-10 flex justify-between w-screen">
      <div className="flex gap-4"><NavLink to="/" className = "">Home</NavLink>
      {
        user?.isAdmin ? (
            <NavLink to="/adm">Manage Store</NavLink>
        ) : ``
      }
      <NavLink to ="/cat">Catalogue</NavLink>
      </div>
      <div className ="flex gap-4">
      {
        user ? (
            <>
            <span>Hello {user.name}</span>
            <button onClick={logout}>Logout</button>
            </>
        ) :(<><NavLink to="/log">Login</NavLink><NavLink to="/reg">Register</NavLink></>)
      }</div>
</nav>  
    );
}
export default Navbar;