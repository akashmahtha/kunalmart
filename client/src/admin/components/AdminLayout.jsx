import { useEffect, useState } from "react";
import AdminNavbar from "./AdminNavbar";
import AdminSidebar from "./AdminSidebar";

const AdminLayout = ({ children }) => {

    // Desktop Collapse
    const [collapsed, setCollapsed] = useState(false);

    // Mobile Sidebar
    const [mobileOpen, setMobileOpen] = useState(false);

    const isMobile = () => window.innerWidth <= 992;

    // Toggle Sidebar
    const toggleSidebar = () => {

        if (isMobile()) {

            setMobileOpen(!mobileOpen);

        } else {

            setCollapsed(!collapsed);

        }

    };

    // Auto Close on Resize
    useEffect(() => {

        const handleResize = () => {

            if (!isMobile()) {

                setMobileOpen(false);

            }

        };

        window.addEventListener("resize", handleResize);

        return () =>
            window.removeEventListener("resize", handleResize);

    }, []);

    return (

        <div className="admin-wrapper">

            {/* Overlay */}

            {

                mobileOpen && (

                    <div
                        className="sidebar-overlay"
                        onClick={() => setMobileOpen(false)}
                    />

                )

            }

            {/* Sidebar */}

            <AdminSidebar
                collapsed={collapsed}
                mobileOpen={mobileOpen}
                toggleSidebar={toggleSidebar}
            />

            {/* Main */}

            <div
                className={`admin-main ${collapsed ? "collapsed" : ""}`}
            >

                <AdminNavbar />

                <div className="admin-content">

                    {children}

                </div>

            </div>

        </div>

    );

};

export default AdminLayout;