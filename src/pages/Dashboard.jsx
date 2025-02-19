import React from "react";
import dashboardLottie from "../assets/Lottie/dashboardLottie.json";
import Lottie from "lottie-react";

const Dashboard = () => {
  return (
    <div className="flex flex-col-reverse md:flex-row items-center justify-center px-6 py-12 gap-8 md:gap-12">



      {/* Heading Section */}
      <h1 className="w-full md:w-1/2 text-center md:text-left text-3xl md:text-4xl font-bold">
        Hello From <span className="text-blue-600 text-4xl md:text-5xl">Dashboard</span>
      </h1>



      
      {/* Lottie Animation */}
      <div className="w-full md:w-1/2 flex justify-center">
        <Lottie className="w-3/4 md:w-full max-w-md" animationData={dashboardLottie} loop={true} />
      </div>

      
    </div>
  );
};

export default Dashboard;
