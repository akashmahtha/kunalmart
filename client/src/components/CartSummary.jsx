import { Link } from "react-router-dom";

const CartSummary = ({ cart }) => {

    // ==========================
    // Safe Cart Items
    // ==========================

    const items =
        cart?.items?.filter(
            (item) => item?.product
        ) || [];

    // ==========================
    // Subtotal
    // ==========================

    const subtotal = items.reduce((total, item) => {

        const product = item.product;

        const price =
            product.discountPrice > 0
                ? product.discountPrice
                : product.price;

        return total + price * item.quantity;

    }, 0);

    // ==========================
    // Delivery Charge
    // ==========================

    const deliveryCharge =
        subtotal >= 499 || subtotal === 0
            ? 0
            : 40;

    // ==========================
    // Platform Fee
    // ==========================

    const platformFee =
        subtotal > 0
            ? 5
            : 0;

    // ==========================
    // Savings
    // ==========================

    const savings = items.reduce((total, item) => {

        const product = item.product;

        if (
            product.discountPrice > 0 &&
            product.discountPrice < product.price
        ) {

            return (
                total +
                (product.price -
                    product.discountPrice) *
                item.quantity
            );

        }

        return total;

    }, 0);

    // ==========================
    // Grand Total
    // ==========================

    const grandTotal =
        subtotal +
        deliveryCharge +
        platformFee;

    return (

        <div className="card shadow-sm border-0 rounded-4 sticky-top">

            <div className="card-body">

                <h4 className="fw-bold mb-4">

                    Order Summary

                </h4>

                <div className="d-flex justify-content-between mb-3">

                    <span>

                        Subtotal

                    </span>

                    <strong>

                        ₹{subtotal}

                    </strong>

                </div>

                <div className="d-flex justify-content-between mb-3">

                    <span>

                        Delivery Charge

                    </span>

                    <strong>

                        {

                            deliveryCharge === 0

                                ? "FREE"

                                : `₹${deliveryCharge}`

                        }

                    </strong>

                </div>

                <div className="d-flex justify-content-between mb-3">

                    <span>

                        Platform Fee

                    </span>

                    <strong>

                        ₹{platformFee}

                    </strong>

                </div>

                <div className="d-flex justify-content-between mb-3">

                    <span className="text-success">

                        Your Savings

                    </span>

                    <strong className="text-success">

                        ₹{savings}

                    </strong>

                </div>

                <hr />

                <div className="d-flex justify-content-between align-items-center">

                    <h5 className="fw-bold mb-0">

                        Grand Total

                    </h5>

                    <h4 className="fw-bold text-success mb-0">

                        ₹{grandTotal}

                    </h4>

                </div>

                {

                    subtotal > 0 && subtotal < 499 ? (

                        <div className="alert alert-warning mt-4">

                            Add products worth

                            <strong>

                                {" "}₹{499 - subtotal}{" "}

                            </strong>

                            more to get

                            <strong>

                                {" "}FREE Delivery 🚚

                            </strong>

                        </div>

                    ) : subtotal >= 499 ? (

                        <div className="alert alert-success mt-4">

                            🎉 Congratulations!

                            <strong>

                                {" "}FREE Delivery Unlocked

                            </strong>

                        </div>

                    ) : (

                        <div className="alert alert-secondary mt-4">

                            Your cart is empty.

                        </div>

                    )

                }

                <Link
                    to="/checkout"
                    className={`btn btn-success w-100 mt-3 py-3 fw-bold ${subtotal === 0
                            ? "disabled"
                            : ""
                        }`}
                >

                    Proceed To Checkout

                </Link>

                <Link
                    to="/products"
                    className="btn btn-outline-secondary w-100 mt-3"
                >

                    Continue Shopping

                </Link>

            </div>

        </div>

    );

};

export default CartSummary;