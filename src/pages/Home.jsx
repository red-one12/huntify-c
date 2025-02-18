import React from 'react';
import Banner from '../components/Banner';
import FeaturedProducts from '../components/FeaturedProducts';
import TrendingProducts from '../components/TrendingProducts';
import CouponsCarousel from '../components/CouponsCarousel';
import NewsLetter from '../components/NewsLetter';
import Reviews from '../components/Reviews';
import FAQs from '../components/FAQs';

const Home = () => {
  return (
    <div>
      <Banner></Banner>


      <div className='max-w-7xl mx-auto'>
      <FeaturedProducts></FeaturedProducts>
      </div>


      <div className='max-w-7xl mx-auto'>
      <TrendingProducts></TrendingProducts>
      </div>


      <div className='max-w-7xl mx-auto'>
        <CouponsCarousel></CouponsCarousel>
      </div>



      <div>
        <Reviews></Reviews>
      </div>

      <div className='max-w-7xl mx-auto'>
        <FAQs></FAQs>
      </div>



      <div className='max-w-7xl mx-auto'>
        <NewsLetter></NewsLetter>
      </div>
    </div>
  );
};

export default Home;