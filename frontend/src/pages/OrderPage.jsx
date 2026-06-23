import axios from 'axios';
import { useState } from 'react';
import { useLocation,Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const OrderPage = () => {
    const [payment,setPayment] = useState("");
    const location = useLocation();
    const {user} = useAuth();
    const [message,setMessage] = useState("");
    const navigate = useNavigate();
    const [formData,setFormData] = useState({
        name:"",
        address:"",
        phone:""
    })
    const handleChange = (e) => {
        const {name,value} = e.target;
        setFormData(prev => ({
            ...prev,[name]:value
    }));
    }
    const handlePayment = async (e) => {
        e.preventDefault();
         if(!formData.name || !formData.phone || !formData.address)
        {
            setMessage("Fill out every detail");
        }
        else {
        try {
            const res = await axios.post("/api/orders/payment", { ...formData,
                itemId: location.state.itemId,
                paymentmthd:payment
            }, {
                headers: {
                    Authorization: `Bearer ${user.token}`
                }
            })
            if(res?.data?.success) {
                window.location.replace(res.data.url);
            }
        } catch(e) {
            console.log(e);
            setMessage(e.response?.data?.error || "Error handling payment.");
        }
    }
}
    const handleSubmit = async (e) => {
         e.preventDefault();
        console.log("payment at submit time:", payment) 
        if(!formData.name || !formData.phone || !formData.address)
        {
            setMessage("Fill out every detail");
        }
        else {
        try {
            const res = await axios.post("/api/orders/orderlist",{
                ...formData, itemId: location.state.itemId, paymentmthd: payment
            }, {
                headers: {
                    Authorization: `Bearer ${user.token}`
                }
            })
            console.log(res.data);
            navigate("/cat");
        } catch(e) {
            console.error(e);
            setMessage(e.response?.data?.error || "Error sending order of requested item");
        }
    }
    }
    if(!location.state) return <Navigate to="/cat" replace /> 
    return (
        <div className="flex flex-col items-center justify-center w-screen min-h-screen p-9 overflow-y-auto bg-gray-50">
            <form onSubmit={(e) => {
                if(payment === 'Bkash') handlePayment(e);
                else handleSubmit(e);
            }} className="bg-white rounded-2xl shadow-md p-8 w-full max-w-md flex flex-col gap-5">
                <img className="w-fit h-fit object-cover rounded-xl" src={location.state.imgurl} />
                <div className="flex gap-3">
                    <span className="font-bold text-2xl">{location.state.name}</span>
                    <span className="font-semibold text-2xl"> | {location.state.price} BDT</span>
                </div>
                <h1 className="text-2xl font-bold text-gray-500">CHECKOUT</h1>
                <div className="h-1 bg-black w-full rounded-full"></div>
                {
                    [{label:"Name", name:"name", placeholder:"Abul Hossain"},
                        {label:"Address", name:"address", placeholder:"Street, Area, City"},
                        {label:"Phone No", name:"phone",placeholder:"+880.."}
                    ].map(
                        elem => (
                            <div key={elem.name} className="flex flex-col gap-2">
                            <label className="text-xs text-gray-500 font-semibold uppercase tracking-wide">{elem.label}</label>
                            <input placeholder={elem.placeholder} 
                            onChange={handleChange} 
                            name={elem.name}
                            value={formData[elem.name]}
                            className="border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-pink-400" />
                            </div>
                        )
                    )
                }
            <div className="flex flex-col gap-2">
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Payment</label>
                <div className ="flex gap-3 justify-around">
                    {
                        [
                            'Bkash','Cash on Delivery'
                        ].map(elem => (
                            <button key={elem} onClick={() => setPayment(elem)} type="button" className={`flex px-4 py-2 rounded-lg border-2 text-sm font-semibold transition-all 
                                ${elem === payment? "bg-orange-300 text-white border-white" : "bg-white text-black border-orange-200"} `}>
                                    {elem}
                                    </button>
                        ))
                    }
                </div>
            </div>
             <button type="submit" 
             className="mt-4 p-3 text-white font-bold text-lg md:text-2xl 
             bg-green-500 rounded-lg hover:bg-green-400 transition-all duration-200 ease-in-out">Submit</button>
             {
                message && <span className="text-red-500 font-semibold text-xl">{message}</span>
             }
            </form>
        </div>
    )
}

export default OrderPage;