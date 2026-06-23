import { useLocation,Navigate } from "react-router-dom";

const PayFail = () => {
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    
    if(params.get("from") !== "sslcommerz") return <Navigate to="/" replace/>
    return (
        <div className ="flex flex-col w-screen min-h-screen justify-center items-center gap-7">
            <span className ="font-extrabold text-5xl">Payment Failed</span>
            <span className = "text-gray-500 text-xl">Redirect to catalogue page to try again</span>
        </div>
    )
}

export default PayFail;