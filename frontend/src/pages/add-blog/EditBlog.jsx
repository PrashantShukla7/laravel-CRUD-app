import React, { useContext, useEffect, useState } from "react";
import "./AddBlog.css";
import { useLocation, useNavigate } from "react-router-dom";
import api from "../../config/axios";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../context/AuthContext";
import BlogForm from "./BlogForm";

const EditBlog = ({}) => {
    const [message, setMessage] = useState(null);
    const { token } = useContext(AuthContext);
    const navigate = useNavigate();
    const {pathname} = useLocation();
    const blogId = pathname.split("/")[3];
    const [blog, setBlog] = useState(null)
    useEffect(() => {
        if (!token) {
            navigate("/login");
        }
    }, []);

    useEffect(() => {
        const getBlog = async () => {
            try {
                const response = await api.get(`/blog/${blogId}`);
                setBlog(response.data.data);
            } catch (error) {
                console.error(error);
            }
        };
        getBlog();
    }, []);

    const goBack = () => {
        navigate(-1);
    };

    const onSubmit = async (data) => {
        data = { ...data, author: localStorage.getItem("user") };
        try {
            const response = await api.put(`/blog/${blog.id}`, data);
            setMessage(response.data.message);
        } catch (err) {}
    };

    return (
        <div className="create-blog">
            <div className="create-blog-header">
                <button className="back-button" onClick={goBack}>
                    ←
                </button>
                <h1>Create New Post</h1>
            </div>
            <div>
                {message && (
                    <div className="success-msg">
                        {" "}
                        <p>{message}</p>{" "}
                        <i
                            className="ri-close-large-fill"
                            onClick={() => setMessage(null)}
                        ></i>{" "}
                    </div>
                )}
            </div>
            <BlogForm message={message} setMessage={setMessage} onSubmit={onSubmit} data={blog} />
        </div>
    );
};

export default EditBlog;
