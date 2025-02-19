import React from 'react';
import Banner from '../components/Banner';
import FeaturedProducts from '../components/FeaturedProducts';
import TrendingProducts from '../components/TrendingProducts';
import CouponsCarousel from '../components/CouponsCarousel';
import NewsLetter from '../components/NewsLetter';
import Reviews from '../components/Reviews';
import FAQs from '../components/FAQs';
import RecentBlogs from '../components/RecentBlogs';
import WhyChooseUs from '../components/WhyChooseUs';

const Home = () => {
  return (
    <div>
      <Banner></Banner>


      <div className='max-w-7xl mx-auto pt-20'>
      <FeaturedProducts></FeaturedProducts>
      </div>


      <div className='max-w-7xl mx-auto pt-20'>
      <TrendingProducts></TrendingProducts>
      </div>


      <div className='max-w-7xl mx-auto pt-20'>
        <CouponsCarousel></CouponsCarousel>
      </div>



      <div className='pt-20'>
        <Reviews></Reviews>
      </div>

      <div className='max-w-7xl mx-auto pt-20'>
        <WhyChooseUs></WhyChooseUs>
      </div>


      <div className='max-w-7xl mx-auto pt-20'>
        <RecentBlogs></RecentBlogs>
      </div>

      <div className='max-w-7xl mx-auto pt-20'>
        <FAQs></FAQs>
      </div>





      <div className='max-w-7xl mx-auto pt-20'>
        <NewsLetter></NewsLetter>
      </div>



      
    </div>
  );
};

export default Home;