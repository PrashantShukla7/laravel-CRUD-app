import React, { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import "./navbar.css";
import { Link } from "react-router-dom";
const Navbar = () => {
    const { token } = useContext(AuthContext);

    return (
        <nav>
            <div className="left-nav">
                <h3>
                    {" "}
                    <a href="/">Blog</a>
                </h3>
            </div>
            <div className="right-nav">
                <ul>
                    <li>
                        <a href="/">Home</a>
                    </li>
                    <li>
                        <a href="/">Blogs</a>
                    </li>
                </ul>
                {!token ? (
                    <div className="auth-buttons">
                        <Link to="/register" className="button">Register</Link>
                        <Link to="/login" className="button">Login</Link>
                    </div>
                ) : (
                    <a href="/user" className="profile-link">
                        <img src="/user.png" alt="Profile" />
                    </a>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
