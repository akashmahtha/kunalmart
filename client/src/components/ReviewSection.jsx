import { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import api from "../services/api";

const ReviewSection = ({ productId }) => {

    const [reviews, setReviews] = useState([]);
    const [rating, setRating] = useState(5);
    const [comment, setComment] = useState("");

    useEffect(() => {
        fetchReviews();
    }, [productId]);

    const fetchReviews = async () => {

        try {

            const res = await api.get(`/reviews/${productId}`);

            setReviews(res.data.reviews || []);

        } catch (error) {

            console.log(error);

        }

    };

    const submitReview = async (e) => {

        e.preventDefault();

        try {

            await api.post("/reviews", {
                product: productId,
                rating,
                comment,
            });

            setComment("");

            setRating(5);

            fetchReviews();

            alert("Review Added Successfully");

        } catch (error) {

            console.log(error);

            alert("Unable to submit review");

        }

    };

    return (

        <div className="card border-0 shadow-sm rounded-4 mt-5">

            <div className="card-body">

                <h4 className="fw-bold mb-4">

                    Customer Reviews

                </h4>

                {

                    reviews.length === 0 ? (

                        <p className="text-muted">

                            No Reviews Yet

                        </p>

                    ) : (

                        reviews.map((review) => (

                            <div
                                key={review._id}
                                className="border-bottom pb-3 mb-3"
                            >

                                <h6 className="fw-bold">

                                    {review.user?.name || "Customer"}

                                </h6>

                                <div className="text-warning mb-2">

                                    {

                                        [...Array(review.rating)].map((_, i) => (

                                            <FaStar key={i} />

                                        ))

                                    }

                                </div>

                                <p className="mb-0">

                                    {review.comment}

                                </p>

                            </div>

                        ))

                    )

                }

                <hr className="my-4" />

                <h5 className="mb-3">

                    Write a Review

                </h5>

                <form onSubmit={submitReview}>

                    <div className="mb-3">

                        <label className="form-label">

                            Rating

                        </label>

                        <select
                            className="form-select"
                            value={rating}
                            onChange={(e) =>
                                setRating(Number(e.target.value))
                            }
                        >

                            <option value={5}>★★★★★</option>
                            <option value={4}>★★★★☆</option>
                            <option value={3}>★★★☆☆</option>
                            <option value={2}>★★☆☆☆</option>
                            <option value={1}>★☆☆☆☆</option>

                        </select>

                    </div>

                    <div className="mb-3">

                        <textarea
                            rows="4"
                            className="form-control"
                            placeholder="Write your review..."
                            value={comment}
                            onChange={(e) =>
                                setComment(e.target.value)
                            }
                            required
                        />

                    </div>

                    <button
                        className="btn btn-success"
                        type="submit"
                    >

                        Submit Review

                    </button>

                </form>

            </div>

        </div>

    );

};

export default ReviewSection;