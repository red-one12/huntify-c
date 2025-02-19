import { motion } from "framer-motion";
import { useState } from "react";
import newsletter from "../assets/images/newsletter.png";

const NewsLetter = () => {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e) => {
    e.preventDefault();
    console.log("Subscribed with:", email);
    setEmail(""); 
  };

  return (
    <div className="flex items-center justify-between gap-5 p-10">
      <motion.div
        initial={{ scale: 1 }}
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        className="mb-6 w-1/3"
      >
        <img src={newsletter} alt="Newsletter" className="w-60" />
      </motion.div>

      <div className="w-2/3">
      <h2 className="text-xl md:text-3xl font-bold text-gray-800 mb-4">
        Subscribe to our <br /><span className="text-blue-600 text-3xl md:text-5xl">Newsletter</span>
      </h2>
      <p className="text-gray-600 mb-6">
        Stay updated with the latest tech trends and exclusive insights!
      </p>

      <form
        onSubmit={handleSubscribe}
        className="flex flex-col sm:flex-row items-center gap-3 w-full"
      >
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          required
          className="px-4 py-2 w-full md:w-4/5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="px-5 py-2 w-full md:w-1/5 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600 transition duration-300"
        >
          Subscribe
        </button>
      </form>
      </div>
    </div>
  );
};

export default NewsLetter;
