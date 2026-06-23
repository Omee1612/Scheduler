import { useEffect, useState } from "react"
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import { format } from "date-fns";
const SelfOrder = () => {
    const [orders,setOrders] = useState([]);
    const {user} = useAuth();
    useEffect(() => {
        const fetchOrders = async () => {
            const resOrders = await axios.get("/api/orders/selforder",
                {
                    headers: {
                        Authorization: `Bearer ${user.token}`
                    },
                }
            )
            setOrders(resOrders.data.specificOrders);
        };
        fetchOrders();       
    },[]);
    return(
        <div className="flex flex-col w-screen min-h-screen p-8">
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
                                    ]; 
                    return(
                    <div key={order._id} className="flex flex-col gap-3 w-full"> 
                        <span className="font-bold text-2xl">Order {orderIndex+1}</span>
                        <div className="flex gap-1">
                            {
                                fields.map((field,index) => {
                                    return (
                                      <div key={index} className="px-3 w-full border py-2 text-sm font-semibold rounded">
                                        {field}
                                        </div>  
                                    )
                                })
                            }
                            <button className="px-4 py-1 border bg-red-500 text-white hover:bg-red-300 transition-all duration-150 ease-in-out">X</button>
                            </div>
                    </div>)
                })
            }
        </div>
    )
}
export default SelfOrder;