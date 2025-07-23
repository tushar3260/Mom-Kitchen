import React from "react";
import { motion } from "framer-motion";

import TopNav from "../components/TopNav.jsx";
import Herosection from "../components/Herosection.jsx";
import Howitworks from "../components/Howitworks.jsx";
import Footer from "../components/Footer.jsx";
import PopularItems from "../components/PopularItems.jsx";
import FeaturedRestaurants from "../components/FeaturedRestaurants.jsx";
import DealCard from "../components/DealCard.jsx";
import SmoothScrollProvider from "../utils/SmoothScrollProvider.jsx";
import DiscountSection from "../components/Discountsection.jsx";
import GalleryPage from "./GalleryPage.jsx";
const fadeUp = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
};

const LandingPage = ({onLoginClick}) => {
  return (
    <>
      <SmoothScrollProvider>
        {/* Top Navigation */}
        <motion.div initial="hidden" animate="visible" variants={fadeUp}>
          <TopNav onLoginClick={onLoginClick} />
        </motion.div>

        {/* Hero Section */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <Herosection />
        </motion.div>
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <GalleryPage />
        </motion.div>
        
        {/* Featured Restaurants */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <FeaturedRestaurants />
        </motion.div>

        {/* How it Works */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <Howitworks />
        </motion.div>

        {/* Popular Items */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <PopularItems />
        </motion.div>
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <DiscountSection />
        </motion.div>
        {/* Deal Cards */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <DealCard
            title="Best deals Crispy Sandwiches"
            description="Enjoy the large size of sandwiches. Complete perfect slice of sandwiches."
            buttonText="PROCEED TO ORDER"
            image="https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=600&auto=format&fit=crop&q=60"
          />
        </motion.div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <DealCard
            title="Celebrate parties with Fried Chicken"
            description="Get the best fried chicken smeared with a lip smacking lemon chili flavor. Check out best deals for fried chicken."
            buttonText="Proceed to order"
            image="https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=600&auto=format&fit=crop&q=60"
            reverse
          />
        </motion.div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <DealCard
            title="Wanna eat hot & spicy Pizza?"
            description="Pair up with a friend and enjoy the hot and crispy pizza pops. Try it with the best deals."
            buttonText="PROCEED TO ORDER"
            image="https://media.istockphoto.com/id/617781022/photo/baskets-of-onion-rings-curly-fries-and-cheese-sticks.webp?a=1&b=1&s=612x612"
          />
        </motion.div>

        {/* Footer */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <Footer />
        </motion.div>
      </SmoothScrollProvider>
    </>
  );
};

export default LandingPage;
