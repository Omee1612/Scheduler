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
        <div className="grid grid-cols-4 gap-6 p-6 w-screen "> {/* Container of cards */}
        {items.map( item => (
            <div key={item._id} className="rounded-lg bg-pink-200 overflow-hidden shadow-sm flex flex-col">
            <img src={item.imgURL} className="w-full h-96 object-cover shrink-0"/>
                <div className="p-4 flex flex-1 flex-col gap-2">
                    <div>
                    <h2 className="font-medium">{item.name}</h2>
                    <p className="text-xs text-gray-400">Added: {format(item.date,'dd MMM,yyyy')}</p>
                    <p className="font-semibold text-amber-600">{item.price} BDT</p>
                    </div>
                    <div className="mt-auto">
                    {!item.purchased && <button className="bg-green-400 font-bold text-white p-2 w-full" onClick={() => {
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
        }
        {
            item.purchased && <button className="bg-red-400 font-bold text-white p-2 w-full" onClick={() => {
                alert("This product is not in stock");
            }}>
        Out of Stock</button>
        }
        </div>
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