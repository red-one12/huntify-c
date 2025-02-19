import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const RecentBlogs = () => {
  const blogPosts = [
    {
      id: 1,
      title: "The Future of AI in Everyday Life",
      date: "February 10, 2025",
      description: "AI is transforming daily activities, from smart assistants to automation. Here's what the future holds.",
      image: "https://media.licdn.com/dms/image/v2/D5612AQFh6TXOA4VWjQ/article-cover_image-shrink_720_1280/article-cover_image-shrink_720_1280/0/1690096174732?e=2147483647&v=beta&t=VXHcVAf7knimfthgBEcu-VpFWBjkMmZi23AIyT0moJ8",
      link: "https://builtin.com/artificial-intelligence/artificial-intelligence-future"
    },
    {
      id: 2,
      title: "Top Web Development Trends in 2025",
      date: "February 5, 2025",
      description: "Discover the latest trends in web development, including AI-powered interfaces, Web3, and more.",
      image: "https://media.licdn.com/dms/image/v2/D4D12AQEW1TGrHeZ7lQ/article-cover_image-shrink_600_2000/article-cover_image-shrink_600_2000/0/1727789609287?e=2147483647&v=beta&t=HI5QNnKnbSqV-nrwT4yZ9zqLlaKacbJzWSlMCP-GlWU",
      link: "https://www.digitalsilk.com/digital-trends/web-development-trends/"
    },
    {
      id: 3,
      title: "How Blockchain is Changing Security",
      date: "January 28, 2025",
      description: "Blockchain technology is enhancing security across industries. Learn how it works and its potential impact.",
      image: "https://media.licdn.com/dms/image/v2/D5612AQFi9981Im_Dqw/article-cover_image-shrink_600_2000/article-cover_image-shrink_600_2000/0/1734415805081?e=2147483647&v=beta&t=q0-x5JPVU7jiPncs2zz4raUlw1k26vW_5F6yg7hGPlc",
      link: "https://bit.telkomuniversity.ac.id/blockchain-transforming-the-way-we-view-data-security-and-transparency/#:~:text=Blockchain%20technology%20is%20an%20innovation,efficient%20solution%20than%20traditional%20systems."
    },
  ];

  return (
    <div className="max-w-6xl mx-auto my-10 p-6">
      <h2 className="recent-blog-title text-4xl font-bold text-center mb-8">Recent Trending Blogs</h2>
      
      <div className="grid md:grid-cols-3 gap-6">
        {blogPosts.map((post, index) => (
          <motion.div 
            key={post.id}
            className="bg-white shadow-md rounded-lg overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
          >
            <img src={post.image} alt={post.title} className="w-full h-48 object-cover" />
            <div className="p-4">
              <h3 className="text-lg font-semibold">{post.title}</h3>
              <p className="text-sm text-gray-500">{post.date}</p>
              <p className="text-gray-700 mt-2">{post.description}</p>
              <button className="mt-4 inline-block text-blue-500 font-semibold hover:underline">
                <Link to={post.link}>
                Read More
                </Link>
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default RecentBlogs;
