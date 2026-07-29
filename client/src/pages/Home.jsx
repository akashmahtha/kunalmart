import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import CategorySection from "../components/CategorySection";
import ProductSection from "../components/ProductSection";
import WhyChooseUs from "../components/WhyChooseUs";
// import Newsletter from "../components/Newsletter";
import Footer from "../components/Footer";

const Home = () => {
    return (
        <div className="home-page">

            <Navbar />

            <main>

                {/* Hero */}
                <Hero />

                {/* Shop by Category */}
                <CategorySection />

                {/* Best Sellers */}
                <ProductSection
                    title="Best Sellers"
                    endpoint="/products/bestseller"
                />

                {/* Popular Products */}
                <ProductSection
                    title="Popular Products"
                    endpoint="/products/featured"
                />

                {/* Trending Products */}
                <ProductSection
                    title="Trending Products"
                    endpoint="/products/trending"
                />

                {/* Fresh Arrivals */}
                <ProductSection
                    title="Fresh Arrivals"
                    endpoint="/products/latest"
                />

                {/* Why Choose Us */}
                <WhyChooseUs />

                {/* Newsletter */}
                {/* <Newsletter /> */}

            </main>

            <Footer />

        </div>
    );
};

export default Home;