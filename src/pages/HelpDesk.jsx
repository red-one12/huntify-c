import { useState } from "react";
import { motion } from "framer-motion";
import helpLottie from "../assets/Lottie/help lottie.json";
import Lottie from "lottie-react";

const HelpDesk = () => {
  const [formData, setFormData] = useState({ email: "", problem: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted Data:", formData);
    setFormData({ email: "", problem: "" });
  };

  return (
    <div className="py-28 px-4">
      <h2 className="text-light text-center text-4xl font-bold text-gray-800">
        Help <span className="text-blue-600">Desk</span>
      </h2>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row justify-center items-center gap-10 lg:gap-16 mt-10">
        
        {/* Animation Section */}
        <div className="w-full max-w-sm lg:max-w-md">
          <Lottie animationData={helpLottie} loop={true} />
        </div>

        {/* Form Section */}
        <div className="w-full max-w-md">
          <motion.div
            className="w-full rounded-lg bg-white p-8 shadow-lg"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            whileHover={{ scale: 1.02 }}
          >
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-600">
                  Email
                </label>
                <motion.input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  className="w-full rounded-lg border border-gray-300 p-3 text-gray-800 focus:border-blue-500 focus:outline-none"
                  whileFocus={{ scale: 1.02 }}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600">
                  Your Problem
                </label>
                <motion.textarea
                  name="problem"
                  value={formData.problem}
                  onChange={handleChange}
                  placeholder="Describe your issue"
                  rows="4"
                  className="w-full rounded-lg border border-gray-300 p-3 text-gray-800 focus:border-blue-500 focus:outline-none"
                  whileFocus={{ scale: 1.02 }}
                  required
                ></motion.textarea>
              </div>
              <motion.button
                type="submit"
                className="w-full rounded-lg bg-blue-500 py-2 text-white hover:bg-blue-600"
                whileHover={{ scale: 1.05 }}
              >
                Submit
              </motion.button>
            </form>
          </motion.div>
        </div>

      </div>
    </div>
  );
};

export default HelpDesk;
