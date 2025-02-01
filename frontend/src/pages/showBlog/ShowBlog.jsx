import React, { useContext, useEffect, useState } from "react";
import api from "../../config/axios";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import "./showBlog.css";

const ShowBlog = () => {
    const path = useLocation();
    const id = path.pathname.split("/")[2];
    const { user } = useContext(AuthContext);
    const [blog, setBlog] = useState(null);
    const navigate = useNavigate();
    useEffect(() => {
        if (!user) {
            navigate("/login");
        }
    }, [user]);
    useEffect(() => {
        const getBlog = async () => {
            try {
                const response = await api.get(`/blog/${id}`);
                setBlog(response.data.data);
            } catch (error) {
                console.error(error);
            }
        };
        getBlog();
    }, []);
    document.title= blog? "Blog | " + blog.title : "Blog"

    const handleDelete = async () => {
        try {
            await api.delete(`/blog/${id}`);
            navigate("/");
        } catch (error) {
            console.error(error);
        }
    }

    return blog && user ? (
        <div className="blog-container">
            {blog.user_id === user.id && (
                <div className="action-btn">
                    <Link to={`/edit/post/${blog.id}`} className="edit-btn btn" >Edit</Link>
                    <button className="delete-btn btn" onClick={handleDelete}>Delete</button>
                </div>
            )}
            <div className="content">
                <h1>{blog.title}</h1>
                <p className="sub-heading">Author: {blog.author}</p>
                <p className="sub-heading">
                    Date: {blog.created_at.slice(0, 10)}
                </p>
                <p className="description">{blog.description}</p>
            </div>
        </div>
    ) : (
        <h1>Loading</h1>
    );
};

export default ShowBlog;
