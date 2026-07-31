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


    // ================= FETCH CART =================

    useEffect(() => {

        fetchCart();

    }, []);


    const fetchCart = async () => {

        try {

            const res = await api.get("/cart");

            console.log("Cart API Response:", res.data);


            setCart(

                res.data?.cart || {

                    items: [],

                }

            );

        } catch (error) {

            console.log("Cart Error:", error);


            setCart({

                items: [],

            });

        } finally {

            setLoading(false);

        }

    };


    // ================= LOADING =================

    if (loading) {

        return (

            <>

                <Navbar />


                <div className="container py-5 text-center">

                    <div className="spinner-border text-success"></div>

                    <p className="mt-3">

                        Loading Cart...

                    </p>

                </div>


                <Footer />

            </>

        );

    }


    // ================= SAFE CART ITEMS =================

    const cartItems = cart?.items || [];


    // ================= EMPTY CART =================

    if (cartItems.length === 0) {

        return (

            <>

                <Navbar />

                <EmptyCart />

                <Footer />

            </>

        );

    }


    // ================= CART =================

    return (

        <>

            <Navbar />


            <div className="container py-5">

                <h2 className="fw-bold mb-4">

                    Shopping Cart

                </h2>


                <div className="row">


                    {/* LEFT SIDE */}

                    <div className="col-lg-8">

                        {

                            cartItems
                                .filter((item) => item.product)
                                .map((item) => (

                                    <CartItem
                                        key={item._id || item.product._id}
                                        item={item}
                                        fetchCart={fetchCart}
                                    />

                                ))

                        }

                    </div>


                    {/* RIGHT SIDE */}

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