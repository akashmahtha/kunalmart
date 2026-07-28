import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import CategorySection from "../components/CategorySection";
import FlashSale from "../components/FlashSale";
import ProductSection from "../components/ProductSection";
import OfferBanner from "../components/OfferBanner";
import WhyChooseUs from "../components/WhyChooseUs";
import Newsletter from "../components/Newsletter";
import Footer from "../components/Footer";

const Home = () => {
    return (
        <div className="home-page">

            <Navbar />

            <main>

                {/* Main Promotional Banner */}
                <Hero />

                {/* Shop By Category */}
                <CategorySection />

                {/* Flash Sale */}
                <FlashSale />

                {/* Featured Products */}
                <ProductSection
                    title="Popular Products"
                    endpoint="/products/featured"
                />

                {/* Offer Banner */}
                <OfferBanner />

                {/* Trending Products */}
                <ProductSection
                    title="Trending Products"
                    endpoint="/products/trending"
                />

                {/* Best Sellers */}
                <ProductSection
                    title="Best Sellers"
                    endpoint="/products/bestseller"
                />

                {/* Latest Products */}
                <ProductSection
                    title="Fresh Arrivals"
                    endpoint="/products/latest"
                />

                {/* Why Choose Us */}
                <WhyChooseUs />

                {/* Newsletter */}
                <Newsletter />

            </main>

            <Footer />

        </div>
    );
};

export default Home;