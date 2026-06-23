import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { format } from "date-fns";

const ComplaintDetail = () => {
    const navigate = useNavigate();
    const { complaintId } = useParams();
    const [complaint, setComplaint] = useState(null);
    const { user } = useAuth();

    useEffect(() => {
        const fetchComplaint = async () => {
            try {
                const res = await axios.get(
                    `/api/cmps/complaints/${complaintId}`,
                    {
                        headers: {
                            Authorization: `Bearer ${user?.token}`,
                        },
                    }
                );

                setComplaint(res.data.findComplaint);
            } catch (err) {
                console.error(err);
            }
        };

        fetchComplaint();
    }, [complaintId]);

    if (!complaint) {
        return (
            <div className="w-screen min-h-screen flex items-center justify-center">
                <div className="text-gray-500 text-lg animate-pulse">
                    Loading complaint...
                </div>
            </div>
        );
    }

    return (
        <div className="w-screen min-h-screen bg-gray-100 flex items-center justify-center p-6">
            
            <div className="w-full max-w-2xl bg-white shadow-lg rounded-2xl p-8 flex flex-col gap-6">
                
                {/* Title */}
                <h1 className="text-3xl font-bold text-gray-800 border-b pb-4">
                    {complaint.title}
                </h1>

                {/* Meta info */}
                <div className="flex justify-between text-sm text-gray-500">
                    <span>
                        By: {complaint.user?.name || "Unknown User"}
                    </span>

                    <span>
                        🕒 {format(complaint.time,"do MMM, y")}
                    </span>
                </div>

                {/* Content */}
                <div className="p-5 rounded-xl text-gray-700 leading-relaxed whitespace-pre-wrap">
                    {complaint.complaint}
                </div>

                {/* Optional action area */}
                <div className="flex justify-end">
                    <button className="px-4 py-2 bg-amber-300 hover:bg-amber-400 transition rounded-lg font-medium" onClick={(e) => {
                        e.preventDefault();
                        navigate(`/chats/${complaintId}`)
                    }}>
                        {user.isAdmin? `Reply (Admin)` : `View Chat`}
                    </button>
                </div>

            </div>
        </div>
    );
};

export default ComplaintDetail;