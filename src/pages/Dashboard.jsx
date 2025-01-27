import React from 'react';
import dashboardLottie from '../assets/Lottie/dashboardLottie.json'
import Lottie from 'lottie-react';

const Dashboard = () => {
  return (
    <div>
      <h1 className='text-center text-5xl font-bold'>Welcome to Dashboard</h1>
      <div className='flex justify-center'>
      <Lottie className='w-2/3' animationData={dashboardLottie} loop={true} />
      </div>
    </div>
  );
};

export default Dashboard;