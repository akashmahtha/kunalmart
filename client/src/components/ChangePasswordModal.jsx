import { useState } from "react";
import { toast } from "react-toastify";
import api from "../services/api";

const ChangePasswordModal = () => {

    const [formData, setFormData] = useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
    });

    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        if (formData.newPassword !== formData.confirmPassword) {

            toast.error("Passwords do not match");

            return;

        }

        try {

            const res = await api.put(
                "/auth/change-password",
                {
                    currentPassword: formData.currentPassword,
                    newPassword: formData.newPassword,
                }
            );

            toast.success(res.data.message);

            setFormData({
                currentPassword: "",
                newPassword: "",
                confirmPassword: "",
            });

            document
                .getElementById("closePasswordModal")
                .click();

        } catch (error) {

            toast.error(
                error.response?.data?.message ||
                "Unable to change password"
            );

        }

    };

    return (

        <div
            className="modal fade"
            id="changePasswordModal"
            tabIndex="-1"
        >

            <div className="modal-dialog modal-dialog-centered">

                <div className="modal-content rounded-4 border-0 shadow">

                    <div className="modal-header">

                        <h5 className="modal-title fw-bold">

                            Change Password

                        </h5>

                        <button
                            className="btn-close"
                            data-bs-dismiss="modal"
                        ></button>

                    </div>

                    <form onSubmit={handleSubmit}>

                        <div className="modal-body">

                            <div className="mb-3">

                                <label className="form-label">

                                    Current Password

                                </label>

                                <input
                                    type="password"
                                    name="currentPassword"
                                    className="form-control"
                                    value={formData.currentPassword}
                                    onChange={handleChange}
                                    required
                                />

                            </div>

                            <div className="mb-3">

                                <label className="form-label">

                                    New Password

                                </label>

                                <input
                                    type="password"
                                    name="newPassword"
                                    className="form-control"
                                    value={formData.newPassword}
                                    onChange={handleChange}
                                    required
                                />

                            </div>

                            <div>

                                <label className="form-label">

                                    Confirm Password

                                </label>

                                <input
                                    type="password"
                                    name="confirmPassword"
                                    className="form-control"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    required
                                />

                            </div>

                        </div>

                        <div className="modal-footer">

                            <button
                                type="button"
                                className="btn btn-secondary"
                                id="closePasswordModal"
                                data-bs-dismiss="modal"
                            >

                                Cancel

                            </button>

                            <button
                                type="submit"
                                className="btn btn-success"
                            >

                                Update Password

                            </button>

                        </div>

                    </form>

                </div>

            </div>

        </div>

    );

};

export default ChangePasswordModal;