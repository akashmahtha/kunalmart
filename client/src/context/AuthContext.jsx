import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import api from "../services/api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const navigate = useNavigate();

    const [user, setUser] = useState(null);

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        checkUser();

    }, []);

    const checkUser = async () => {

        try {

            const token = localStorage.getItem("token");

            if (!token) {

                setLoading(false);

                return;

            }

            const res = await api.get("/auth/profile");

            setUser(res.data.user);

        } catch (error) {

            localStorage.removeItem("token");

            setUser(null);

        } finally {

            setLoading(false);

        }

    };

    // ===========================
    // Login
    // ===========================

    const login = async (data) => {

        try {

            const res = await api.post("/auth/login", data);

            localStorage.setItem(
                "token",
                res.data.token
            );

            setUser(res.data.user);

            toast.success("Login Successful");

            navigate("/");

        } catch (error) {

            toast.error(

                error.response?.data?.message ||

                "Login Failed"

            );

        }

    };

    // ===========================
    // Register
    // ===========================

    const register = async (data) => {

        try {

            const res = await api.post(
                "/auth/register",
                data
            );

            localStorage.setItem(
                "token",
                res.data.token
            );

            setUser(res.data.user);

            toast.success("Registration Successful");

            navigate("/");

        } catch (error) {

            toast.error(

                error.response?.data?.message ||

                "Registration Failed"

            );

        }

    };

    // ===========================
    // Logout
    // ===========================

    const logout = () => {

        localStorage.removeItem("token");

        setUser(null);

        toast.success("Logged Out");

        navigate("/login");

    };

    return (

        <AuthContext.Provider

            value={{

                user,

                loading,

                login,

                register,

                logout,

                checkUser,

            }}

        >

            {children}

        </AuthContext.Provider>

    );

};

export const useAuth = () => {

    return useContext(AuthContext);

};