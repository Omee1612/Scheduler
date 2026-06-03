import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import axios from "axios";

const Profile = () => {
    const {user,setUser} = useAuth();
    const [editing,setEditing] = useState("");
    const [value,setValue] = useState("");
    const fields = [ {
        label: "Name" , key: "name" , value: user.name
    },  
    {
        label: "Email", key: "email", value: user.email
    },
    {
        label:"Password", key:"password", value:"*******"
    }
]
    const handleSubmit =async (e) => {
        e.preventDefault();
        try
        {  
        const res = await axios.post("/api/users/edit",{
            toChange: {
                [editing]: value
            }
        },{
            headers: {
                Authorization: `Bearer ${user.token}`
            }
        });
        const updatedUser = res.data.updatedUser;
        const newUser = {
            ...user,...updatedUser
        };
        setUser(newUser);
        localStorage.setItem("user",JSON.stringify(newUser));
        setEditing("");
        console.log(res.data);
        } catch(err) {
            console.error(err);
        }
    }

    return (
        <div className = "flex items-center justify-center  w-full p-10">
            <div className="bg-white rounded-xl shadow-md gap-6 flex flex-col p-8 w-full max-w-md">
           {
            fields.map(field => (
                <div key={field.key} className="flex flex-col gap-1">
                <span className="text-xs text-gray-400 uppercase tracking-wide">{field.label}</span>
                {
                    editing === field.key ? (
                        <div className="flex gap-2">
                        <input value={value} onChange={(e) => setValue(e.target.value)} className="flex-1 border rounded px-3 py-2
                        text-sm focus:outline-none focus:ring-2 focus:ring-red-400" />
                        <button onClick={handleSubmit} className="text-green-500 px-2 hover:text-green-700">✔</button>
                        <button onClick={() => setEditing("")} className="text-red-500 px-2 hover:text-red-700">✘</button>
                        </div> 
                    ) : (
                        <div className="border-b border-pink-400 justify-between items-center flex pb-2">
                        <span>{field.value}</span>
                        <button onClick={() => { setEditing(field.key); setValue(field.value); } }>Edit</button>
                        </div>
                    )
                }
                </div>
                
            ))
           }
           </div>
        </div>
    )
}

export default Profile;