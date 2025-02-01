import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../context/AuthContext";
import "./login.css";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const { login } = useContext(AuthContext);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = async (data) => {
        try {
            const response = await login(data);
            if (response) 
                navigate("/");
            else setError(response.data?.message || "Incorrect username or password");
        } catch (err) {
            console.error(err.response.data.message);
            setError(err.response?.data?.message || "Something went wrong");
        }
    };

    return (
        <div className="outer-container">
            <div className="container">
                <h1>Login</h1>
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="form-container"
                >
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
                        Don't have an account? <a href="/register">Register</a>
                    </small>
                </form>
            </div>
        </div>
    );
};

export default Login;
