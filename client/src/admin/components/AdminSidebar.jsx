import { NavLink, useNavigate } from "react-router-dom";
import {
    FaTachometerAlt,
    FaUsers,
    FaBoxes,
    FaTags,
    FaShoppingCart,
    FaStar,
    FaTicketAlt,
    FaSignOutAlt,
} from "react-icons/fa";

const AdminSidebar = ({ sidebarOpen }) => {

    const navigate = useNavigate();

    const logoutHandler = () => {

        localStorage.removeItem("token");
        localStorage.removeItem("user");

        navigate("/");

    };

    return (

        <aside className={`admin-sidebar ${sidebarOpen ? "show" : ""}`}>

            <h4 className="sidebar-logo">

                Kunal Mart

            </h4>

            <NavLink
                to="/admin/dashboard"
                className="sidebar-link"
            >
                <FaTachometerAlt />
                <span>Dashboard</span>
            </NavLink>

            <NavLink
                to="/admin/users"
                className="sidebar-link"
            >
                <FaUsers />
                <span>Users</span>
            </NavLink>

            <NavLink
                to="/admin/categories"
                className="sidebar-link"
            >
                <FaTags />
                <span>Categories</span>
            </NavLink>

            <NavLink
                to="/admin/products"
                className="sidebar-link"
            >
                <FaBoxes />
                <span>Products</span>
            </NavLink>

            <NavLink
                to="/admin/orders"
                className="sidebar-link"
            >
                <FaShoppingCart />
                <span>Orders</span>
            </NavLink>

            <NavLink
                to="/admin/reviews"
                className="sidebar-link"
            >
                <FaStar />
                <span>Reviews</span>
            </NavLink>

            <NavLink
                to="/admin/coupons"
                className="sidebar-link"
            >
                <FaTicketAlt />
                <span>Coupons</span>
            </NavLink>

            <button
                className="sidebar-logout"
                onClick={logoutHandler}
            >
                <FaSignOutAlt />
                <span>Logout</span>
            </button>

        </aside>

    );

};

export default AdminSidebar;