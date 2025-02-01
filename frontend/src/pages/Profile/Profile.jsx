import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "./profile.css";
import Loading from "../../components/Loading";
import api from "../../config/axios";
import BlogCard from "../../components/BlogCard";

const Profile = () => {
    document.title = "User"
    const { user, token, logout } = useContext(AuthContext);
    const [blogs, setBlogs] = useState(null);
    const navigate = useNavigate();
    useEffect(() => {
        if (!token) {
            navigate("/login");
        }

        if (user) {
            const getUserBlogs = async () => {
                try {
                    console.log(user.id);
                    const response = await api.get(`/user/${user.id}/blogs`);
                    setBlogs(response.data);
                    console.log(response.data);
                } catch (error) {
                    console.error(error);
                }
            };
            getUserBlogs();
        }
    }, [user, token]);

    const handleLogout = () => {
        logout();
        navigate("/");
    };
    return user ? (
        <div className="profile-wrapper">
            <div className="profile-container">
                <div>
                    <div className="profile-img-container">
                        <img className="profile-img" src="/user.png" alt="" />
                    </div>
                    <p className="username">Welcome, {user.username}!</p>
                    <button onClick={handleLogout} className="logout-btn">
                        Logout
                    </button>{" "}
                </div>
            </div>
            <div className="my-blog-list">
                <h2>My Blogs</h2>
                {blogs && <BlogCard blogs={blogs} />}
            </div>
        </div>
    ) : (
        <Loading />
    );
};

export default Profile;
