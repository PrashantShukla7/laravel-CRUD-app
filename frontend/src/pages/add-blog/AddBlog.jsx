import React, { useContext, useEffect, useState } from "react";
import "./AddBlog.css";
import { useNavigate } from "react-router-dom";
import api from "../../config/axios";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../context/AuthContext";
import BlogForm from "./BlogForm";

const AddBlog = ({}) => {
    document.title = "Create Blog";
    const [message, setMessage] = useState(null);
    const { token } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (!token) {
            navigate("/login");
        }
    }, []);

    const goBack = () => {
        navigate(-1);
    };

    const onSubmit = async (data) => {
        data = { ...data, author: localStorage.getItem("user") };
        try {
            const response = await api.post("/blog", data);
            console.log(response.data)
            if (response.data.status === true) {
                setMessage("Blog post created successfully!");
                navigate("/");
            }
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="create-blog">
            <div className="create-blog-header">
                <button className="back-button" onClick={goBack}>
                    ←
                </button>
                <h1>Create New Post</h1>
            </div>
            <BlogForm message={message} setMessage={setMessage} onSubmit={onSubmit} />
        </div>
    );
};

export default AddBlog;
