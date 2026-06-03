import { useAuth } from "../context/AuthContext"
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import {format} from "date-fns";
import { useNavigate } from "react-router-dom";
const Catalogue = () => {
    const {user} = useAuth();
    const navigate = useNavigate();
    const [items,setItems] = useState([]);
    useEffect(() => {
        const getItems = async () => {
            try {
                const res = await axios.get("/api/items/getp",{
                    headers: {Authorization: `Bearer ${user.token}`}
                });
                setItems(res.data.items);
            } catch(err) {
                console.error(err);
            }
        };
        getItems();
    },[]);
    if(user)
    {
        return (
        <div className="grid grid-cols-4 gap-6 p-6 w-full items-start"> {/* Container of cards */}
        {items.map( item => (
            <div key={item._id} className="border rounded-lg overflow-hidden shadow-sm flex flex-col">
            <img src={item.imgURL} className="w-fit h-fit object-cover"/>
                <div className="p-4 flex flex-col gap-2">
                    <h2 className="font-medium">{item.name}</h2>
                    <p className="text-xs text-gray-400">Added: {format(item.date,'dd MMM,yyyy')}</p>
                    <p className="font-semibold text-amber-600">{item.price} BDT</p>
                    <button className="bg-green-400 font-bold text-white p-2" onClick={() => {
        navigate("/order",{
            state: {
                name: item.name,
                price: item.price,
                imgurl: item.imgURL,
                itemId: item._id
            }
        })
    }}>
        Add Order</button>
                </div>
            </div>
        ))
        }
        </div>
    )}
    else {
        return (
            <div className="w-screen h-screen flex justify-center items-center">
                <h6>You must log in first!</h6>
            </div>
        )
    }
}

export default Catalogue;