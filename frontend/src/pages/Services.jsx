import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import socket from "../socket";
import axios from "axios";

const Services = () => {
    const {user} = useAuth();
    const [complaint,setComplaint] = useState("");
    const [title,setTitle] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!complaint.trim() || !title.trim()) return;
        try
        { 
        const res = await axios.post("/api/cmps/complaints",  {
            complaint,title
        },
    {
        headers: {
            Authorization: `Bearer ${user?.token}`
        }
    })
        console.log(res.data);
        setComplaint("");
        alert("Complaint submitted");
        } catch (e) {
            console.error(e);
        }
    }

return (
    <div className="flex w-screen min-h-screen justify-center">
        <div className="flex p-36  w-fit h-fit justify-center items-center gap-5 flex-col">
            
            <span className="font-extrabold text-3xl">Write Your Complaint</span>
            
            <form onSubmit={handleSubmit} className="flex flex-col gap-10 min-w-md min-h-full">
                <input value={title} onChange ={(e) => {
                    setTitle(e.target.value);
                }} placeholder="Complaint Title" className ="px-3 py-2 h-full w-full bg-gray-100 outline-gray-300"></input>
            <textarea value={complaint} onChange={(e) => {
                setComplaint(e.target.value);
            }} className = "px-12 py-10 w-full h-full bg-gray-200 outline-gray-400"></textarea>
            <button type="submit" className="w-full bg-amber-300 cursor-pointer border">Submit</button>
            </form>
        </div>
    </div>
)
}

export default Services;