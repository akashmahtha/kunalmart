import { useEffect, useState } from "react";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import WishlistItem from "../components/WishlistItem";
import EmptyWishlist from "../components/EmptyWishlist";

import api from "../services/api";

const Wishlist = () => {

    const [wishlist, setWishlist] = useState([]);

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        fetchWishlist();

    }, []);

    const fetchWishlist = async () => {

        try {

            const res = await api.get("/wishlist");

            setWishlist(res.data.wishlist?.products || []);

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

    if (wishlist.length === 0) {

        return (
            <>
                <Navbar />
                <EmptyWishlist />
                <Footer />
            </>
        );

    }

    return (

        <>
            <Navbar />

            <div className="container py-5">

                <h2 className="fw-bold mb-4">
                    My Wishlist
                </h2>

                <div className="row">

                    {wishlist.map((item) => (

                        <div
                            key={item._id}
                            className="col-lg-3 col-md-4 col-sm-6 mb-4"
                        >

                            <WishlistItem
                                item={item}
                                fetchWishlist={fetchWishlist}
                            />

                        </div>

                    ))}

                </div>

            </div>

            <Footer />
        </>

    );

};

export default Wishlist;