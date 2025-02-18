import Marquee from "react-marquee-slider";
import { motion } from "framer-motion";

const reviews = [
  {
    id: 1,
    name: "John Doe",
    image: "https://randomuser.me/api/portraits/men/1.jpg",
    review: "Amazing platform! Found great tools easily.",
  },
  {
    id: 2,
    name: "Emily Smith",
    image: "https://randomuser.me/api/portraits/women/2.jpg",
    review: "Love the UI! Very user-friendly.",
  },
  {
    id: 3,
    name: "Michael Johnson",
    image: "https://randomuser.me/api/portraits/men/3.jpg",
    review: "A great place to discover new tech!",
  },
  {
    id: 4,
    name: "Sarah Brown",
    image: "https://randomuser.me/api/portraits/women/4.jpg",
    review: "Highly recommend for tech lovers!",
  },
  {
    id: 5,
    name: "David Wilson",
    image: "https://randomuser.me/api/portraits/men/5.jpg",
    review: "Fantastic experience using this platform!",
  },
  {
    id: 6,
    name: "Sophia Martinez",
    image: "https://randomuser.me/api/portraits/women/6.jpg",
    review: "A game-changer in the tech world!",
  },
  {
    id: 7,
    name: "James Anderson",
    image: "https://randomuser.me/api/portraits/men/7.jpg",
    review: "Loved the upvote system. Very engaging!",
  },
  {
    id: 8,
    name: "Olivia Taylor",
    image: "https://randomuser.me/api/portraits/women/8.jpg",
    review: "Best platform to find AI tools.",
  },
  {
    id: 9,
    name: "William Harris",
    image: "https://randomuser.me/api/portraits/men/9.jpg",
    review: "Smooth and interactive experience.",
  },
  {
    id: 10,
    name: "Ava Clark",
    image: "https://randomuser.me/api/portraits/women/10.jpg",
    review: "Helped me find great software for my work!",
  },
];

const Reviews = () => {
  return (
    <div className="py-10">
      <h2 className="text-center text-3xl font-bold text-gray-800 mb-6">
        User Reviews
      </h2>

      <Marquee velocity={15} direction="ltr">
        {reviews.map((review) => (
          <motion.div
            key={review.id}
            whileHover={{ scale: 1.05 }}
            className="bg-white shadow-lg rounded-lg p-4 mx-4 w-76 flex flex-col items-center"
          >
            <img
              src={review.image}
              alt={review.name}
              className="w-16 h-16 rounded-full mb-3"
            />
            <p className="text-gray-700 text-sm text-center">"{review.review}"</p>
            <h4 className="mt-2 font-semibold text-gray-900">{review.name}</h4>
          </motion.div>
        ))}
      </Marquee>
    </div>
  );
};

export default Reviews;
