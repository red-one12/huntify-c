import { motion } from "framer-motion";
import { FaRocket, FaUsers, FaShieldAlt, FaCoins } from "react-icons/fa";

const benefits = [
  {
    id: 1,
    icon: <FaRocket className="text-4xl text-blue-500" />,
    title: "Innovative Platform",
    description: "Discover and share the latest tech products in one place.",
  },
  {
    id: 2,
    icon: <FaUsers className="text-4xl text-green-500" />,
    title: "Engaging Community",
    description: "Join discussions, upvote products, and connect with tech enthusiasts.",
  },
  {
    id: 3,
    icon: <FaShieldAlt className="text-4xl text-red-500" />,
    title: "Secure & Trusted",
    description: "We ensure data security and a trusted user environment.",
  },
  {
    id: 4,
    icon: <FaCoins className="text-4xl text-yellow-500" />,
    title: "Premium Features",
    description: "Unlock exclusive benefits with our affordable subscription plans.",
  },
];

const WhyChooseUs = () => {
  return (
    <div className="my-12 px-5">
      <h2 className="why-choose-title text-4xl font-bold text-center mb-8">Why Choose Us?</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {benefits.map((benefit, index) => (
          <motion.div
            key={benefit.id}
            className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg transition-all"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.1 }}
            whileHover={{ scale: 1.05 }}
          >
            <div className="mb-4">{benefit.icon}</div>
            <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
            <p className="text-gray-600">{benefit.description}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default WhyChooseUs;
