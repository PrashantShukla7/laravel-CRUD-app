import { createContext, useState, useEffect } from "react";
import api from "../config/axios";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [loading, setLoading] = useState(true)
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem("token") || "");

    // Function to handle login
    const login = async (data) => {
        const {email, password} = data;
        try {
            const response = await api.post("/login", {
                email,
                password,
            });
            setUser(response.data.user);
            setToken(response.data.token);
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("user", response.data.user.username);
            return true; 
        } catch (error) {
            console.error("Login failed:", error.response?.data?.message);
            return false;
        }
    };

    // Function to handle logout
    const logout = async () => {
        try {
            await api.post(
                "http://127.0.0.1:8000/logout",
                {},
                { headers: { Authorization: `Bearer ${token}` } }
            );
        } catch (error) {
            console.error("Logout failed:", error);
        }

        setUser(null);
        setToken("");
        localStorage.removeItem("token");
    };

    useEffect(() => {
        const fetchUser = async () => {
            try {
                if (token) {
                    // Fetch user data
                    const response = await api.get("/user");
                    setUser(response.data);
                    setLoading(false);
                } else {
                    setLoading(false);
                }
            } catch (error) {
                console.error("Failed to fetch user:", error.response?.data);
                logout();
                setLoading(false);
            }
        };

        fetchUser();
    }, [token]);

    return (
        <AuthContext.Provider value={{ user, token, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
