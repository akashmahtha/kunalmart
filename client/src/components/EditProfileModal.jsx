import { useState } from "react";
import { toast } from "react-toastify";
import api from "../services/api";

const EditProfileModal = ({ user, setUser }) => {

    const [formData, setFormData] = useState({
        name: user?.name || "",
        email: user?.email || "",
        phone: user?.phone || "",
    });

    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            const res = await api.put(
                "/auth/profile",
                formData
            );

            localStorage.setItem(
                "user",
                JSON.stringify(res.data.user)
            );

            setUser(res.data.user);

            toast.success(res.data.message);

            document
                .getElementById("closeEditProfileModal")
                .click();

        } catch (error) {

            toast.error(
                error.response?.data?.message ||
                "Unable to update profile"
            );

        }

    };

    return (

        <div
            className="modal fade"
            id="editProfileModal"
            tabIndex="-1"
            aria-hidden="true"
        >

            <div className="modal-dialog modal-dialog-centered">

                <div className="modal-content border-0 rounded-4 shadow">

                    <div className="modal-header">

                        <h5 className="modal-title fw-bold">

                            Edit Profile

                        </h5>

                        <button
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="modal"
                        ></button>

                    </div>

                    <form onSubmit={handleSubmit}>

                        <div className="modal-body">

                            <div className="mb-3">

                                <label className="form-label">

                                    Full Name

                                </label>

                                <input
                                    type="text"
                                    name="name"
                                    className="form-control"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                />

                            </div>

                            <div className="mb-3">

                                <label className="form-label">

                                    Email

                                </label>

                                <input
                                    type="email"
                                    name="email"
                                    className="form-control"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />

                            </div>

                            <div className="mb-3">

                                <label className="form-label">

                                    Phone Number

                                </label>

                                <input
                                    type="text"
                                    name="phone"
                                    className="form-control"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    required
                                />

                            </div>

                        </div>

                        <div className="modal-footer">

                            <button
                                type="button"
                                className="btn btn-secondary"
                                id="closeEditProfileModal"
                                data-bs-dismiss="modal"
                            >

                                Cancel

                            </button>

                            <button
                                type="submit"
                                className="btn btn-success"
                            >

                                Save Changes

                            </button>

                        </div>

                    </form>

                </div>

            </div>

        </div>

    );

};

export default EditProfileModal;