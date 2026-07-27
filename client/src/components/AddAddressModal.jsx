import { useState } from "react";
import { toast } from "react-toastify";
import api from "../services/api";

const AddAddressModal = ({ fetchAddresses }) => {

    const initialState = {
        fullName: "",
        phone: "",
        addressLine1: "",
        addressLine2: "",
        landmark: "",
        city: "",
        state: "",
        pincode: "",
        country: "India",
        addressType: "Home",
        isDefault: false,
    };

    const [formData, setFormData] = useState(initialState);

    const handleChange = (e) => {

        const { name, value, type, checked } = e.target;

        setFormData({

            ...formData,

            [name]: type === "checkbox" ? checked : value,

        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            const res = await api.post("/address", formData);

            toast.success(res.data.message);

            setFormData(initialState);

            fetchAddresses();

            const modal = document.getElementById("addressModal");

            const backdrop = document.querySelector(".modal-backdrop");

            modal.classList.remove("show");
            modal.style.display = "none";

            if (backdrop) backdrop.remove();

            document.body.classList.remove("modal-open");
            document.body.style = "";

        } catch (error) {

            toast.error(
                error.response?.data?.message ||
                "Unable to add address"
            );

        }

    };

    return (

        <div
            className="modal fade"
            id="addressModal"
            tabIndex="-1"
        >

            <div className="modal-dialog modal-lg">

                <div className="modal-content">

                    <div className="modal-header">

                        <h5 className="modal-title">

                            Add New Address

                        </h5>

                        <button
                            className="btn-close"
                            data-bs-dismiss="modal"
                        ></button>

                    </div>

                    <form onSubmit={handleSubmit}>

                        <div className="modal-body">

                            <div className="row">

                                <div className="col-md-6 mb-3">

                                    <label className="form-label">

                                        Full Name

                                    </label>

                                    <input
                                        type="text"
                                        className="form-control"
                                        name="fullName"
                                        value={formData.fullName}
                                        onChange={handleChange}
                                        required
                                    />

                                </div>

                                <div className="col-md-6 mb-3">

                                    <label className="form-label">

                                        Phone

                                    </label>

                                    <input
                                        type="text"
                                        className="form-control"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        required
                                    />

                                </div>

                                <div className="col-12 mb-3">

                                    <label className="form-label">

                                        Address Line 1

                                    </label>

                                    <input
                                        type="text"
                                        className="form-control"
                                        name="addressLine1"
                                        value={formData.addressLine1}
                                        onChange={handleChange}
                                        required
                                    />

                                </div>

                                <div className="col-12 mb-3">

                                    <label className="form-label">

                                        Address Line 2

                                    </label>

                                    <input
                                        type="text"
                                        className="form-control"
                                        name="addressLine2"
                                        value={formData.addressLine2}
                                        onChange={handleChange}
                                    />

                                </div>

                                <div className="col-md-6 mb-3">

                                    <label className="form-label">

                                        Landmark

                                    </label>

                                    <input
                                        type="text"
                                        className="form-control"
                                        name="landmark"
                                        value={formData.landmark}
                                        onChange={handleChange}
                                    />

                                </div>

                                <div className="col-md-6 mb-3">

                                    <label className="form-label">

                                        City

                                    </label>

                                    <input
                                        type="text"
                                        className="form-control"
                                        name="city"
                                        value={formData.city}
                                        onChange={handleChange}
                                        required
                                    />

                                </div>

                                <div className="col-md-4 mb-3">

                                    <label className="form-label">

                                        State

                                    </label>

                                    <input
                                        type="text"
                                        className="form-control"
                                        name="state"
                                        value={formData.state}
                                        onChange={handleChange}
                                        required
                                    />

                                </div>

                                <div className="col-md-4 mb-3">

                                    <label className="form-label">

                                        Pincode

                                    </label>

                                    <input
                                        type="text"
                                        className="form-control"
                                        name="pincode"
                                        value={formData.pincode}
                                        onChange={handleChange}
                                        required
                                    />

                                </div>

                                <div className="col-md-4 mb-3">

                                    <label className="form-label">

                                        Country

                                    </label>

                                    <input
                                        type="text"
                                        className="form-control"
                                        name="country"
                                        value={formData.country}
                                        onChange={handleChange}
                                    />

                                </div>

                                <div className="col-md-6 mb-3">

                                    <label className="form-label">

                                        Address Type

                                    </label>

                                    <select
                                        className="form-select"
                                        name="addressType"
                                        value={formData.addressType}
                                        onChange={handleChange}
                                    >

                                        <option value="Home">

                                            Home

                                        </option>

                                        <option value="Office">

                                            Office

                                        </option>

                                    </select>

                                </div>

                                <div className="col-md-6 d-flex align-items-center">

                                    <div className="form-check mt-4">

                                        <input
                                            type="checkbox"
                                            className="form-check-input"
                                            name="isDefault"
                                            checked={formData.isDefault}
                                            onChange={handleChange}
                                        />

                                        <label className="form-check-label">

                                            Set as Default Address

                                        </label>

                                    </div>

                                </div>

                            </div>

                        </div>

                        <div className="modal-footer">

                            <button
                                className="btn btn-secondary"
                                data-bs-dismiss="modal"
                                type="button"
                            >

                                Cancel

                            </button>

                            <button
                                className="btn btn-success"
                                type="submit"
                            >

                                Save Address

                            </button>

                        </div>

                    </form>

                </div>

            </div>

        </div>

    );

};

export default AddAddressModal;