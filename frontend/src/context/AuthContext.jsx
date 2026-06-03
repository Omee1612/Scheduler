import axios from "axios";
import { useEffect } from "react";
import { createContext,useContext } from "react";
import { useState } from "react";
const AuthContext = createContext(null);

export const AuthProvider = ({children}) => {
    const isTokExpired = (token) => {
        try{
        const payload = JSON.parse(atob(token.split(".")[1]))
        return payload.exp* 1000 < Date.now();
        } catch {
            return true;
        }
    }
    const [user,setUser] = useState( () => {
        const stored = localStorage.getItem("user");
        if(!stored) return null
        const parsed = JSON.parse(stored);
        if(isTokExpired(parsed.token))
        {
            localStorage.removeItem("user");
            return null;
        }
        return parsed;
    });
   
    const login = (userData) => {
        setUser(userData);
        localStorage.setItem("user",JSON.stringify(userData));
    };
    const logout = () => {
        setUser(null);
        localStorage.removeItem("user");
    };
 useEffect(() => {
        const interceptor = axios.interceptors.response.use(response => response,
            error => {
                if(error?.response?.status === 401) {
                    logout();
                }
                return Promise.reject(error);
            }
        )
        return () => axios.interceptors.response.eject(interceptor);
    }, [])
    return (
        <AuthContext.Provider value={{user,setUser,login,logout}}>
            {children}
        </AuthContext.Provider>
    )
};
export const useAuth = () => useContext(AuthContext);