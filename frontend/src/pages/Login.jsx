import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
const Login = () => {
    const {login} = useAuth();
     const navigate = useNavigate();
    const [formData,setFormData] = useState({
       email:"",
       password:"" 
    });
    const [message,setMessage] = useState("");
    const handleChange = (e) => {
        const { name,value }= e.target;
        setFormData((prev) => ({
            ...prev,[name] : value
        }));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(!formData.email || !formData.password) setMessage("One of the fields is empty.");
        else {
       try {
        const res = await axios.post("/api/users/login",formData);
        console.log("login response : ", res.data);
        setMessage(res.data.message || "Logged in!");
       console.log("res.data:", res.data)
        login({ token: res.data.token, name: res.data.name, isAdmin: res.data.isAdmin })
        navigate("/");
       } catch(e) {
        console.error(e);
         setMessage(e?.response?.data?.error || "Error logging in, can you recheck credentials?");
       } 
    }
    }
    return (
        <div className ="flex flex-col h-screen w-screen justify-center items-center">
            <form onSubmit={handleSubmit} className = "flex flex-col gap-3 p-6 border rounded">
                <input
                name = "email"
                placeholder='Email'
                value={formData.email}
                onChange={handleChange}
                className="border p-2"
                />
                <input
                name = "password"
                placeholder='Password'
                value={formData.password}
                onChange={handleChange}
                className="border p-2"
                />
                <button className="bg-blue-500 text-white p-2">
                    Login
                </button>
                {message && <span className="text-red-500 font-semibold">{message}</span>}
            </form>
        </div>
    )
}

export default Login;