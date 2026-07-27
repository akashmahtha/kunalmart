import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../services/api";

const Login = () => {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            setLoading(true);

            const res = await api.post(
                "/auth/login",
                formData
            );

            // Save Token
            localStorage.setItem(
                "token",
                res.data.token
            );

            // Save User
            localStorage.setItem(
                "user",
                JSON.stringify(res.data.user)
            );

            toast.success("Login Successful");

            // Redirect Based On Role
            if (res.data.user.role === "admin") {

                navigate("/admin/dashboard");

            } else {

                navigate("/");

            }

        } catch (error) {

            toast.error(
                error.response?.data?.message ||
                "Login Failed"
            );

        } finally {

            setLoading(false);

        }

    };

    return (

        <div className="container py-5">

            <div className="row justify-content-center">

                <div className="col-lg-5 col-md-7">

                    <div className="card shadow border-0 rounded-4">

                        <div className="card-body p-5">

                            <div className="text-center mb-4">

                                <h2 className="fw-bold text-success">
                                    Login
                                </h2>

                                <p className="text-muted">
                                    Welcome back to Kunal Mart
                                </p>

                            </div>

                            <form onSubmit={handleSubmit}>

                                <div className="mb-3">

                                    <label className="form-label">
                                        Email
                                    </label>

                                    <input
                                        type="email"
                                        name="email"
                                        className="form-control"
                                        placeholder="Enter email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                    />

                                </div>

                                <div className="mb-3">

                                    <label className="form-label">
                                        Password
                                    </label>

                                    <input
                                        type="password"
                                        name="password"
                                        className="form-control"
                                        placeholder="Enter password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        required
                                    />

                                </div>

                                <div className="text-end mb-3">

                                    <Link
                                        to="/forgot-password"
                                        className="text-success text-decoration-none"
                                    >
                                        Forgot Password?
                                    </Link>

                                </div>

                                <button
                                    type="submit"
                                    className="btn btn-success w-100"
                                    disabled={loading}
                                >

                                    {
                                        loading
                                            ? "Logging In..."
                                            : "Login"
                                    }

                                </button>

                            </form>

                            <div className="text-center mt-4">

                                <span>
                                    Don't have an account?
                                </span>

                                <Link
                                    to="/register"
                                    className="ms-2 text-success fw-bold text-decoration-none"
                                >
                                    Register
                                </Link>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </div>

    );

};

export default Login;