import React from "react";
import { Route, Routes } from "react-router-dom";
import AddBlog from "./pages/add-blog/AddBlog";
import BlogList from "./pages/Blogs/BlogList";
import Register from "./pages/Register/Register";
import Login from "./pages/Login/Login";
import Navbar from "./pages/navbar/Navbar";
import ShowBlog from "./pages/showBlog/showBlog";
import Profile from "./pages/Profile/Profile";
import Loading from "./components/Loading";
import EditBlog from "./pages/add-blog/EditBlog";

const App = () => {
    return (
        <>
            <Navbar />
            <Routes>
                <Route path="/" element={<BlogList />} />
                <Route path="/create" element={<AddBlog />} />
                <Route path="/read/:id" element={<ShowBlog />} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/user" element={<Profile />} />
                <Route path="/edit/post/:id" element={<EditBlog />} />
                {/* <Route path="*" element={<NotFound />} /> */}
            </Routes>
        </>
    );
};

export default App;
