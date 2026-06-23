import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { format } from 'date-fns';

const AdminComplaints = () => {
    const [complaints,setComplaints] = useState([]);
    const navigate = useNavigate();
    const {user} = useAuth();
    useEffect( () =>
        {   
          const getComplaints = async ()=> {  try
            {
            const res = await axios.get("/api/cmps/complaints", {
            headers: {
                Authorization: `Bearer ${user.token}`
            }
           })
           setComplaints(res.data.complaints);
        } catch(e) {
            console.error(e);
        }
        };
        getComplaints();
    },[]
    )
    return (
        <div className="flex flex-col w-screen min-h-screen justify-center items-center">
            <span className="text-3xl font-extrabold">Complaint Logs</span>
            <div className="flex flex-col gap-1 w-lg p-7">
              {
                complaints.map(complaint => (
                    <div onClick={() => navigate(`/complaints/${complaint._id}`)}

                     key={complaint._id} className="p-4 flex w-full flex-col bg-white-200 border gap-2 cursor-pointer hover:bg-gray-200 transition-all duration-150 ease-in-out">
                        <span className="text-2xl font-bold tracking-wide">{complaint.title}</span>
                        <span className="text-xl font-light">By: {complaint.user.name}</span>
                        <span className="font-extralight text-gray-300">{format(complaint.time,"do MMM, y")}</span>
                        </div>   
                ))
              }  
            </div>
        </div>
    )
} 
export default AdminComplaints;