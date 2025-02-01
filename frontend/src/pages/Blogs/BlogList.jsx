import React, { useContext, useEffect, useState } from "react";
import "./BlogList.css";
import api from "../../config/axios";
import { Link } from "react-router-dom";
import BlogCard from "../../components/BlogCard";
import Loading from "../../components/Loading";

const BlogList = () => {
    document.title = "Blogs";
    const [blogs, setBlogs] = useState([]);
    const [keyword, setKeyword] = useState('');

    const getBlogs = async () => {
        const response = await api.get("/blog");
        setBlogs(response.data.data);
    };
    useEffect(() => {
        getBlogs();
    }, []);

    const searchBlogs = async (e) => {
        e.preventDefault();
        try {
            const response = await api.get(`/blog?keyword=${keyword}`);
            setBlogs(response.data.data);
        } catch (error) {
            
        }
    }

    return (
        <div className="blog-list">
            <div className="blog-list-header">
                <h1>All Posts</h1>
                <div className="search-container">
                    <form className="search-bar" onSubmit={searchBlogs}>
                        <input
                            type="text"
                            placeholder="Search..."
                            value={keyword}
                            onChange={(e) => setKeyword(e.target.value)}
                        />
                        <button type="submit">Search</button>
                    </form>
                    <Link to="/create" className="create-button">
                        + New Post
                    </Link>
                </div>
            </div>
            {blogs.length !== 0 ? <BlogCard blogs={blogs} /> : <Loading />}
        </div>
    );
};

export default BlogList;
