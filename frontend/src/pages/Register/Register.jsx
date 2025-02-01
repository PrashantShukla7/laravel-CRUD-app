import React, { useState } from "react";
import { useForm } from "react-hook-form";
import api from "../../config/axios";
import "./register.css";
import { useNavigate } from "react-router-dom";

const Register = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = async (data) => {
        try {
            setLoading(true);
            const response = await api.post("/register", data);
            navigate("/login");
            setLoading(false);
        } catch (err) {
            console.error(err.response.data.message);
            setError(err.response?.data?.message || "Something went wrong")
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="outer-container">
            <div className="container">
                <h1>Register</h1>
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="form-container"
                >
                    <div>
                        {error && (
                            <div className="error-msg">
                                {" "}
                                <p>{error}</p>{" "}
                                <i
                                    className="ri-close-large-fill"
                                    onClick={() => setError(null)}
                                ></i>{" "}
                            </div>
                        )}
                    </div>
                    <label>
                        Username:
                        <input
                            type="text"
                            name="username"
                            placeholder="Enter Username"
                            {...register("username")}
                            required
                        />
                        <small>
                            <span>*</span>Username must have more than 3
                            character
                        </small>
                    </label>
                    <label>
                        Email:
                        <input
                            type="email"
                            name="email"
                            placeholder="Enter Email"
                            {...register("email")}
                            required
                        />
                    </label>
                    <label>
                        Password:
                        <input
                            type="password"
                            name="password"
                            placeholder="Enter Password"
                            {...register("password")}
                            required
                        />
                    </label>
                    <input type="submit" value="Submit" />
                    <small className="login-msg">
                        Already have an account? <a href="/login">Login</a>
                    </small>
                </form>
            </div>
        </div>
    );
};

export default Register;
