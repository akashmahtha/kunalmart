import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import EditProfileModal from "../components/EditProfileModal";

const Profile = () => {

    const [user, setUser] = useState(
        JSON.parse(localStorage.getItem("user"))
    );

    return (

        <>
            <Navbar />

            <div className="container py-5">

                <div className="row justify-content-center">

                    <div className="col-lg-8">

                        <div className="card shadow border-0 rounded-4">

                            <div className="card-body p-5">

                                <div className="text-center mb-5">

                                    <h2 className="fw-bold">

                                        My Profile

                                    </h2>

                                    <p className="text-muted">

                                        Manage your account information

                                    </p>

                                </div>

                                <div className="mb-4">

                                    <label className="fw-bold">

                                        Full Name

                                    </label>

                                    <input
                                        type="text"
                                        className="form-control mt-2"
                                        value={user?.name || ""}
                                        disabled
                                    />

                                </div>

                                <div className="mb-4">

                                    <label className="fw-bold">

                                        Email

                                    </label>

                                    <input
                                        type="email"
                                        className="form-control mt-2"
                                        value={user?.email || ""}
                                        disabled
                                    />

                                </div>

                                <div className="mb-4">

                                    <label className="fw-bold">

                                        Phone

                                    </label>

                                    <input
                                        type="text"
                                        className="form-control mt-2"
                                        value={user?.phone || ""}
                                        disabled
                                    />

                                </div>

                                <div className="mb-4">

                                    <label className="fw-bold">

                                        Role

                                    </label>

                                    <input
                                        type="text"
                                        className="form-control mt-2"
                                        value={user?.role || ""}
                                        disabled
                                    />

                                </div>

                                <div className="d-flex gap-3 flex-wrap">

                                    <button
                                        className="btn btn-success"
                                        data-bs-toggle="modal"
                                        data-bs-target="#editProfileModal"
                                    >

                                        Edit Profile

                                    </button>

                                    <button
                                        className="btn btn-outline-dark"
                                    >

                                        Change Password

                                    </button>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

            <EditProfileModal
                user={user}
                setUser={setUser}
            />

            <Footer />

        </>

    );

};

export default Profile;