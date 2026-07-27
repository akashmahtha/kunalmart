import { Link } from "react-router-dom";

const CartSummary = ({ cart }) => {

    const subtotal = cart.totalPrice;

    const deliveryCharge = subtotal >= 499 ? 0 : 40;

    const platformFee = subtotal > 0 ? 5 : 0;

    const total = subtotal + deliveryCharge + platformFee;

    const savings = cart.items.reduce((sum, item) => {

        if (
            item.product.discountPrice &&
            item.product.discountPrice < item.product.price
        ) {

            return (
                sum +
                (item.product.price - item.product.discountPrice) *
                item.quantity
            );

        }

        return sum;

    }, 0);

    return (

        <div className="card shadow-sm border-0 rounded-4 sticky-top">

            <div className="card-body">

                <h4 className="fw-bold mb-4">

                    Order Summary

                </h4>

                <div className="d-flex justify-content-between mb-3">

                    <span>Subtotal</span>

                    <strong>₹{subtotal}</strong>

                </div>

                <div className="d-flex justify-content-between mb-3">

                    <span>Delivery Charge</span>

                    <strong>

                        {deliveryCharge === 0
                            ? "FREE"
                            : `₹${deliveryCharge}`}

                    </strong>

                </div>

                <div className="d-flex justify-content-between mb-3">

                    <span>Platform Fee</span>

                    <strong>₹{platformFee}</strong>

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

                        ₹{total}

                    </h4>

                </div>

                {

                    subtotal < 499 ? (

                        <div className="alert alert-warning mt-4">

                            Add products worth{" "}

                            <strong>

                                ₹{499 - subtotal}

                            </strong>{" "}

                            more to get{" "}

                            <strong>

                                FREE Delivery 🚚

                            </strong>

                        </div>

                    ) : (

                        <div className="alert alert-success mt-4">

                            🎉 Congratulations! You have unlocked{" "}

                            <strong>

                                FREE Delivery

                            </strong>

                        </div>

                    )

                }

                <Link
                    to="/checkout"
                    className="btn btn-success w-100 mt-3 py-3 fw-bold"
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