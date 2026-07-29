import { FaBell, FaUserCircle, FaSignOutAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const AdminNavbar = () => {

    const navigate = useNavigate();

    const user = JSON.parse(localStorage.getItem("user"));

    const logoutHandler = () => {

        localStorage.removeItem("token");
        localStorage.removeItem("user");

        navigate("/");

    };

    return (

        <nav className="admin-navbar">

            <div className="navbar-left">

                <h5 className="navbar-title">
                    Admin Dashboard
                </h5>

            </div>

            <div className="navbar-right">

                <button className="navbar-icon">

                    <FaBell />

                    <span className="notification-dot"></span>

                </button>

                <div className="navbar-user">

                    <FaUserCircle className="user-icon" />

                    <div className="user-info">

                        <h6>
                            {user?.name || "Admin"}
                        </h6>

                        <small>
                            Administrator
                        </small>

                    </div>

                </div>

                <button
                    className="logout-btn"
                    onClick={logoutHandler}
                >

                    <FaSignOutAlt />

                    <span>Logout</span>

                </button>

            </div>

        </nav>

    );

};

export default AdminNavbar;