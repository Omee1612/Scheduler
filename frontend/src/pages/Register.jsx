import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
const Register = () => {

    const {login} = useAuth();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: ""
    });
    const [message,setMessage] = useState("");


   const onSubmit = async (e) => {
    if(!formData.email || !formData.name || !formData.password) {
        setMessage("One of the fields is empty.");  
    }
    else {
    e.preventDefault();

    try {
        const res = await axios.post(
            "/api/users/register",
            formData
        );
         console.log("response:", res.data)  // add this
        login({ token: res.data.token, name: res.data.name , isAdmin: res.data.isAdmin })
        setMessage(res.data.message || "User created");
    
        navigate("/");

    } catch (err) {
        console.log("error:", err)  // add thi
        setMessage(
            err.response?.data?.error || "Something went wrong"
        );
    }
    }
}
    const handleChange = (e) => {
        const {name,value} = e.target;
        setFormData((prev) => ({
            ...prev,[name]: value
        }));
    }
    return(
        <div className ="flex flex-col h-screen w-screen justify-center items-center">
            <form onSubmit={onSubmit} className = "flex flex-col gap-3 p-6 border rounded">
                <input
                name = "name"
                placeholder='name'
                value={formData.name}
                onChange={handleChange}
                className="border p-2"
                />
                <input
                name = "email"
                placeholder='Email'
                type='email'
                value={formData.email}
                onChange={handleChange}
                className="border p-2"
                />
                <input
                name = "password"
                placeholder='Password'
                type='password'
                value={formData.password}
                onChange={handleChange}
                className="border p-2"
                />
                <button className="bg-blue-500 text-white p-2">
                    Register
                </button>
                {message && <span className="text-red-500 font-semibold">{message}</span>}
            </form>
        </div>
    );
}

export default Register;