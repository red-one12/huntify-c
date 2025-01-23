import React from 'react';
import Banner from '../components/Banner';
import FeaturedProducts from '../components/FeaturedProducts';
import TrendingProducts from '../components/TrendingProducts';

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
    </div>
  );
};

export default Home;