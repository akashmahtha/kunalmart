import { Link, useNavigate } from "react-router-dom";
import { FaBars, FaSignOutAlt, FaUserCircle } from "react-icons/fa";

const AdminNavbar = ({ toggleSidebar }) => {

    const navigate = useNavigate();

    const user = JSON.parse(localStorage.getItem("user"));

    const logoutHandler = () => {

        localStorage.removeItem("token");
        localStorage.removeItem("user");

        navigate("/");

    };

    return (

        <nav className="navbar navbar-expand-lg navbar-dark bg-success shadow-sm px-3">

            <div className="container-fluid">

                {/* Sidebar Toggle */}

                <button
                    className="btn btn-success border me-3"
                    onClick={toggleSidebar}
                >
                    <FaBars />
                </button>

                {/* Logo */}

                <Link
                    to="/admin/dashboard"
                    className="navbar-brand fw-bold"
                >
                    Kunal Mart Admin
                </Link>

                <div className="ms-auto d-flex align-items-center">

                    <span className="text-white me-3">

                        <FaUserCircle className="me-2" />

                        {user?.name}

                    </span>

                    <button
                        className="btn btn-light btn-sm"
                        onClick={logoutHandler}
                    >

                        <FaSignOutAlt className="me-2" />

                        Logout

                    </button>

                </div>

            </div>

        </nav>

    );

};

export default AdminNavbar;