import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import CartItem from "../components/CartItem";
import CartSummary from "../components/CartSummary";
import EmptyCart from "../components/EmptyCart";
import api from "../services/api";

const Cart = () => {

    const [cart, setCart] = useState(null);

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        fetchCart();

    }, []);

    const fetchCart = async () => {

        try {

            const res = await api.get("/cart");

            setCart(res.data.cart);

        } catch (error) {

            console.log(error);

        } finally {

            setLoading(false);

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

    if (!cart || cart.items.length === 0) {

        return (

            <>

                <Navbar />

                <EmptyCart />

                <Footer />

            </>

        );

    }

    return (

        <>

            <Navbar />

            <div className="container py-5">

                <h2 className="fw-bold mb-4">

                    Shopping Cart

                </h2>

                <div className="row">

                    <div className="col-lg-8">
                        {

                            cart.items.map((item) => (

                                <CartItem
                                    key={item.product._id}
                                    item={item}
                                    fetchCart={fetchCart}
                                />

                            ))

                        }

                    </div>

                    {/* Right Side */}

                    <div className="col-lg-4">

                        <CartSummary
                            cart={cart}
                        />

                    </div>

                </div>

            </div>




            <Footer />

        </>

    );

};

export default Cart;