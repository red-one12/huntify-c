import { useState } from "react";
import { motion } from "framer-motion";
import { div } from "framer-motion/client";
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
    <div className="pt-28">
      <h2 className="text-center text-4xl font-bold text-gray-800">
        Help <span className="text-blue-600">Desk</span>
      </h2>

      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="w-1/3">
          <Lottie animationData={helpLottie} loop={true}></Lottie>
        </div>

        <div className="help-form w-2/3 pt-16">
          <motion.div
            className="flex items-center justify-center"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              className="w-full max-w-md rounded-lg bg-white p-8 shadow-lg"
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
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default HelpDesk;
