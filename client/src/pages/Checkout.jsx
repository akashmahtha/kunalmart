import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import api from "../services/api";
import { toast } from "react-toastify";
import AddAddressModal from "../components/AddAddressModal";

const Checkout = () => {

    const navigate = useNavigate();

    const [cart, setCart] = useState(null);

    const [addresses, setAddresses] = useState([]);

    const [selectedAddress, setSelectedAddress] = useState("");

    const [paymentMethod, setPaymentMethod] = useState("COD");

    const [loading, setLoading] = useState(true);

    // const [loading, setLoading] = useState(true);
    const [placingOrder, setPlacingOrder] = useState(false);

    useEffect(() => {

        fetchData();

    }, []);

    const fetchData = async () => {

        try {

            const [cartRes, addressRes] = await Promise.all([
                api.get("/cart"),
                api.get("/address"),
            ]);

            setCart(cartRes.data.cart);

            setAddresses(addressRes.data.addresses);

            const defaultAddress = addressRes.data.addresses.find(
                (item) => item.isDefault
            );

            if (defaultAddress) {

                setSelectedAddress(defaultAddress._id);

            }

        } catch (error) {

            console.log(error);

            toast.error("Unable to load checkout");

        } finally {

            setLoading(false);

        }

    };

    const placeOrder = async () => {

        if (!cart || cart.items.length === 0) {

            toast.error("Your cart is empty");

            return;

        }

        if (!selectedAddress) {

            toast.error("Please select delivery address");

            return;

        }

        try {

            setPlacingOrder(true);

            await api.post("/orders", {
                addressId: selectedAddress,
                paymentMethod,
            });

            toast.success("Order placed successfully");

            navigate("/orders");

        } catch (error) {

            toast.error(

                error.response?.data?.message ||

                "Unable to place order"

            );

        } finally {

            setPlacingOrder(false);

        }

    };

    if (loading) {

        return (

            <>
                <Navbar />

                <div className="container py-5 text-center">

                    <div className="spinner-border text-success"></div>

                </div>

                <Footer />
            </>

        );

    }

    const subtotal = cart?.totalPrice || 0;

    const deliveryCharge = subtotal >= 499 ? 0 : 40;

    const platformFee = subtotal > 0 ? 5 : 0;

    const total = subtotal + deliveryCharge + platformFee;

    return (

        <>
            <Navbar />

            <div className="container py-5">

                <div className="row">

                    <div className="col-lg-8">

                        <div className="card shadow-sm border-0 rounded-4 mb-4">

                            <div className="card-body">

                                <div className="d-flex justify-content-between align-items-center mb-4">

                                    <h4 className="fw-bold mb-0">

                                        Delivery Address

                                    </h4>

                                    <button
                                        className="btn btn-success"
                                        data-bs-toggle="modal"
                                        data-bs-target="#addressModal"
                                    >

                                        + Add Address

                                    </button>

                                </div>
                                {

                                    addresses.length === 0 ? (

                                        <div className="alert alert-warning">

                                            No address found.

                                        </div>

                                    ) : (

                                        addresses.map((address) => (

                                            <div
                                                key={address._id}
                                                className="form-check border rounded p-3 mb-3"
                                            >

                                                <input
                                                    type="radio"
                                                    className="form-check-input"
                                                    checked={
                                                        selectedAddress ===
                                                        address._id
                                                    }
                                                    onChange={() =>
                                                        setSelectedAddress(
                                                            address._id
                                                        )
                                                    }
                                                />

                                                <label className="form-check-label ms-2">

                                                    <strong>

                                                        {address.fullName}

                                                    </strong>

                                                    <br />

                                                    {address.addressLine1}

                                                    <br />

                                                    {address.addressLine2}

                                                    <br />

                                                    {address.city},{" "}

                                                    {address.state}

                                                    {" - "}

                                                    {address.pincode}

                                                    <br />

                                                    {address.phone}

                                                </label>

                                            </div>

                                        ))

                                    )

                                }

                            </div>

                        </div>

                        <div className="card shadow-sm border-0 rounded-4">

                            <div className="card-body">

                                <h4 className="fw-bold mb-4">

                                    Payment Method

                                </h4>

                                <div className="form-check">

                                    <input
                                        className="form-check-input"
                                        type="radio"
                                        checked={paymentMethod === "COD"}
                                        onChange={() =>
                                            setPaymentMethod("COD")
                                        }
                                    />

                                    <label className="form-check-label">

                                        Cash On Delivery

                                    </label>

                                </div>

                                <div className="form-check mt-3">

                                    <input
                                        className="form-check-input"
                                        type="radio"
                                        disabled
                                    />

                                    <label className="form-check-label text-muted">

                                        Online Payment (Coming Soon)

                                    </label>

                                </div>

                            </div>

                        </div>

                    </div>

                    <div className="col-lg-4">

                        <div className="card shadow-sm border-0 rounded-4">

                            <div className="card-body">

                                <h4 className="fw-bold mb-4">

                                    Order Summary

                                </h4>

                                <div className="d-flex justify-content-between">

                                    <span>Subtotal</span>

                                    <strong>₹{subtotal}</strong>

                                </div>

                                <div className="d-flex justify-content-between mt-3">

                                    <span>Delivery</span>

                                    <strong>

                                        {deliveryCharge === 0
                                            ? "FREE"
                                            : `₹${deliveryCharge}`}

                                    </strong>

                                </div>

                                <div className="d-flex justify-content-between mt-3">

                                    <span>Platform Fee</span>

                                    <strong>₹{platformFee}</strong>

                                </div>

                                <hr />

                                <div className="d-flex justify-content-between">

                                    <h5>Total</h5>

                                    <h4 className="text-success">

                                        ₹{total}

                                    </h4>

                                </div>

                                <button
                                    className="btn btn-success w-100 mt-4"
                                    onClick={placeOrder}
                                    disabled={placingOrder}
                                >

                                    {

                                        placingOrder

                                            ? "Placing Order..."

                                            : "Place Order"

                                    }

                                </button>

                            </div>

                        </div>

                    </div>

                </div>

            </div>
            <AddAddressModal fetchAddresses={fetchData} />

            <Footer />
        </>

    );

};

export default Checkout;