import React from "react";
import TopNav from "../components/TopNav.jsx";
import Herosection from "../components/Herosection.jsx";
import Howitworks from "../components/Howitworks.jsx";
import Footer from "../components/Footer.jsx";
import PopularItems from "../components/PopularItems.jsx";
import FeaturedRestaurants from "../components/FeaturedRestaurants.jsx";
import DealCard from "../components/DealCard.jsx";
const LandingPage = () => {
  return (
    <>
      <TopNav />
      <Herosection />
      <FeaturedRestaurants />
      <Howitworks />
      <PopularItems />
      
      <>
        <DealCard
          title="Best deals Crispy Sandwiches"
          description="Enjoy the large size of sandwiches. Complete perfect slice of sandwiches."
          buttonText="PROCEED TO ORDER"
          image="https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGZvb2R8ZW58MHx8MHx8fDA%3D"
        />

        <DealCard
          title="Celebrate parties with Fried Chicken"
          description="Get the best fried chicken smeared with a lip smacking lemon chili flavor. Check out best deals for fried chicken."
          buttonText="Proceed to order"
          image="https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGZvb2R8ZW58MHx8MHx8fDA%3D"
          reverse
        />

        <DealCard
          title="Wanna eat hot & spicy Pizza?"
          description="Pair up with a friend and enjoy the hot and crispy pizza pops. Try it with the best deals."
          buttonText="PROCEED TO ORDER"
          image="https://media.istockphoto.com/id/617781022/photo/baskets-of-onion-rings-curly-fries-and-cheese-sticks.webp?a=1&b=1&s=612x612&w=0&k=20&c=k_eTPGLThcifq-ltM0T-Nv-BkaniaA_9ZE4ONqZauqA="
        />
      </>
      <Footer />
    </>
  );
};

export default LandingPage;
