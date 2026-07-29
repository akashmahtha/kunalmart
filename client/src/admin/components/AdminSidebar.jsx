import { NavLink, useNavigate } from "react-router-dom";
import {
    FaBars,
    FaTachometerAlt,
    FaUsers,
    FaBoxes,
    FaTags,
    FaShoppingCart,
    FaStar,
    FaTicketAlt,
    FaSignOutAlt,
} from "react-icons/fa";

const AdminSidebar = ({
    collapsed,
    mobileOpen,
    toggleSidebar,
}) => {

    const navigate = useNavigate();

    const logoutHandler = () => {

        localStorage.removeItem("token");
        localStorage.removeItem("user");

        navigate("/");

    };

    return (

        <aside
            className={`
                admin-sidebar
                ${collapsed ? "collapsed" : ""}
                ${mobileOpen ? "mobile-open" : ""}
            `}
        >

            {/* Sidebar Header */}

            <div className="sidebar-header">

                {!collapsed && (
                    <h4 className="sidebar-logo">
                        Kunal Mart
                    </h4>
                )}

                <button
                    className="sidebar-toggle"
                    onClick={toggleSidebar}
                >
                    <FaBars />
                </button>

            </div>

            {/* Sidebar Menu */}

            <div className="sidebar-menu">

                <NavLink
                    to="/admin/dashboard"
                    className="sidebar-link"
                >
                    <FaTachometerAlt />
                    {!collapsed && <span>Dashboard</span>}
                </NavLink>

                <NavLink
                    to="/admin/users"
                    className="sidebar-link"
                >
                    <FaUsers />
                    {!collapsed && <span>Users</span>}
                </NavLink>

                <NavLink
                    to="/admin/categories"
                    className="sidebar-link"
                >
                    <FaTags />
                    {!collapsed && <span>Categories</span>}
                </NavLink>

                <NavLink
                    to="/admin/products"
                    className="sidebar-link"
                >
                    <FaBoxes />
                    {!collapsed && <span>Products</span>}
                </NavLink>

                <NavLink
                    to="/admin/orders"
                    className="sidebar-link"
                >
                    <FaShoppingCart />
                    {!collapsed && <span>Orders</span>}
                </NavLink>

                <NavLink
                    to="/admin/reviews"
                    className="sidebar-link"
                >
                    <FaStar />
                    {!collapsed && <span>Reviews</span>}
                </NavLink>

                <NavLink
                    to="/admin/coupons"
                    className="sidebar-link"
                >
                    <FaTicketAlt />
                    {!collapsed && <span>Coupons</span>}
                </NavLink>

            </div>

            {/* Sidebar Footer */}

            <div className="sidebar-footer">

                <button
                    className="sidebar-logout"
                    onClick={logoutHandler}
                >
                    <FaSignOutAlt />
                    {!collapsed && <span>Logout</span>}
                </button>

            </div>

        </aside>

    );

};

export default AdminSidebar;