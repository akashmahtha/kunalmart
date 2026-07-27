import { useState } from "react";
import { FaPaperPlane } from "react-icons/fa";
import "./Newsletter.css";

const Newsletter = () => {

    const [email, setEmail] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        alert(`Subscribed Successfully!\n${email}`);

        setEmail("");
    };

    return (

        <section className="newsletter">

            <div className="container">

                <div className="newsletter-box">

                    <h2>Subscribe To Our Newsletter</h2>

                    <p>
                        Get the latest offers, discounts and new arrivals
                        directly in your inbox.
                    </p>

                    <form onSubmit={handleSubmit}>

                        <input
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />

                        <button type="submit">

                            <FaPaperPlane />

                            Subscribe

                        </button>

                    </form>

                </div>

            </div>

        </section>

    );

};

export default Newsletter;