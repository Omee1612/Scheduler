import axios from "axios"
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { format } from "date-fns";
import { Navigate } from "react-router-dom";

const OrderCat = () => {
    const [orders,setOrders] = useState([]);
    const {user} = useAuth();
    useEffect(() => {
        const getOrders = async () => {
            try
            { 
            const res = await axios.get("/api/orders/orderget", {
                headers: {
                    Authorization: `Bearer ${user.token}`
                }
            })
            setOrders(res.data.orders);
        } catch(e) 
        {
            console.error(e);
        }
        };
        getOrders();
    }, []);
    if (!user)
    {
        return(<Navigate to="/" replace/>)
    }
    return (
        <div className="min-w-screen min-h-screen flex flex-col p-8">
            <div className="flex flex-col w-full gap-1">
            {
            orders.map((order,orderIndex) => {
                const fields = [
                    order.name,
                    order.address,
                    order.phone,
                    order.itemName,
                    `${order.itemPrice} BDT`,
                    order.paymentmthd,
                    format(new Date(order.currDate),"dd MMM,yyyy")
                ];  return (
                  <div key={order._id} className="flex flex-col gap-1">
            <span className="font-bold text-gray-800">Order {orderIndex + 1}</span>   
                <div key={order._id} className="flex gap-1">
                    {fields.map((field, index) => (
                        <div key={index} className="border px-4 py-2 text-sm w-full font-medium text-gray-700 rounded">
                            {field}
                        </div>
                    ))}
                </div>
                </div>
            )
        })}
        </div>
    </div>
)
}

export default OrderCat;