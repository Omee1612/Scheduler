import axios from "axios";
import { useAuth } from "../context/AuthContext"
import { useState } from "react";
import { Navigate } from "react-router-dom";
 const MStore = () => {
    const {user} = useAuth();
    const [isLoading,setIsLoading] = useState(false);
    const [errorMessage,setErrorMessage] = useState("");
    const [formData,setFormData] = useState({
        name: "",
        price: "",
    })
    const [image,setImage] = useState(null);
    const [isOpen,setIsOpen] = useState(false);

    const handleChange = (e) => {
        const {name,value} = e.target;
        setFormData((prev) => 
            ({...prev,[name] : value})
        )
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        if(!formData.name || !formData.price || !image)
        {
            setErrorMessage("One of the fields is empty!");
        }
        else {
        setIsLoading(true);
        try
        {
            const data = new FormData();
            data.append("name",formData.name);
            data.append("price",formData.price);
            data.append("image",image);
            const res = await axios.post("/api/items/addp", 
            data, {headers: {Authorization: `Bearer ${user.token}`}}
        );
        setIsOpen(false);
        console.log(res.data);
        setImage(null);
        } catch(err) {
            console.error(err);
        } finally {
            setIsLoading(false);
            setFormData({name : "", price: ""})
            setErrorMessage("");
        }
     }
    }
    if(!user?.isAdmin) return <Navigate to="/" replace />
    return(
        
        <div className="w-full h-screen flex justify-center items-center">
            <button onClick={() => setIsOpen(true)} className ="border border-t-black bg-green-600 px-24 py-6 rounded-2xl flex 
            justify-center items-center w-fit h-fit hover:bg-green-300 transition-colors duration-300 ease-in-out">
                Add Item
            </button>
            {/* backdrop + modal, only renders when isOpen is true */}
{isOpen && (
    <div className="fixed inset-0 bg-black/50 z-50 flex justify-center items-center">
        {/* the actual modal box */}
        <div className="bg-white rounded-lg p-6 flex flex-col gap-4 w-96">
            <h2>Add Item</h2>
            {/* your fields go here */}
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <input name="name" value={formData.name} onChange={handleChange} placeholder="Name" className="border p-2 rounded w-full"/>
            <input name="price" value={formData.price} onChange={handleChange} placeholder="Price" className="border p-2 rounded w-full"/>
           <input id="imgc" type="file" className="hidden" 
           onChange={(e) => {setImage(e.target.files[0])}}/>
           <label htmlFor="imgc" className="border p-2 rounded w-full bg-gray-500 hover:bg-gray-300 
           text-center block transition duration-200 delay-75 ease-in-out cursor-pointer">{image? image.name : "Choose Image"}</label>
            <div className="flex gap-2">
                <button className="border bg-gray-300 rounded-sm p-2 hover:bg-gray-500 
                transition duration-150 ease-in-out" onClick={() =>{ setIsOpen(false); setImage(null); setErrorMessage(""); 
                    setFormData({name : "", price: ""}) }}>Cancel</button>
                <button className="border bg-gray-300 rounded-sm p-2 hover:bg-gray-500 
                transition duration-150 ease-in-out" type="submit" disabled={isLoading}>
                {isLoading ? (
            <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin mx-auto"/>
            ) : "Submit"}
            </button>
            {errorMessage && <span className="text-red-500">{errorMessage}</span>}
            </div>
            </form>
        </div>
    </div>
)}
</div>
        
    )
 }
 export default MStore;