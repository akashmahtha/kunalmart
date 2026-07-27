import { useState } from "react";
import AdminNavbar from "./AdminNavbar";
import AdminSidebar from "./AdminSidebar";

const AdminLayout = ({ children }) => {

    const [sidebarOpen, setSidebarOpen] = useState(true);

    const toggleSidebar = () => {

        setSidebarOpen(!sidebarOpen);

    };

    return (

        <div className="admin-wrapper">

            <AdminSidebar
                sidebarOpen={sidebarOpen}
            />

            <div
                className={`admin-main ${sidebarOpen ? "sidebar-open" : ""}`}
            >

                <AdminNavbar
                    toggleSidebar={toggleSidebar}
                />

                <div className="admin-content">

                    {children}

                </div>

            </div>

        </div>

    );

};

export default AdminLayout;