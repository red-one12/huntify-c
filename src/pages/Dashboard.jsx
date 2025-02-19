import React from 'react';
import dashboardLottie from '../assets/Lottie/dashboardLottie.json'
import Lottie from 'lottie-react';

const Dashboard = () => {
  return (
    <div className='flex justify-center items-center'>
      <h1 className='w-1/5 text-4xl font-bold'>Hello From <span className='text-blue-600 text-5xl'>Dashboard</span></h1>
      <div className='w-4/5 flex justify-center'>
      <Lottie className='w-2/3' animationData={dashboardLottie} loop={true} />
      </div>
    </div>
  );
};

export default Dashboard;