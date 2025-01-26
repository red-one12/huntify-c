import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { SlLike } from 'react-icons/sl';
import { AuthContext } from '../provider/AuthProvider';

const FeaturedProducts = () => {
  const [products, setProducts] = useState([]);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get('http://localhost:5000/products')
      .then((res) => {
        const sortedProducts = res.data
          .filter((product) => product.isFeatured) // Only featured products
          .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)) // Sort by timestamp
          .slice(0, 4); // Limit to 4 products
        setProducts(sortedProducts);
      })
      .catch((error) => {
        console.error('Error fetching featured products:', error);
      });
  }, []);

  const handleUpvote = (product) => {
    if (!user) {
      // Redirect to login if not logged in
      navigate('/login');
    } else if (user.email !== product.ownerMail) {
      // Prevent owner from voting
      axios
        .post(`http://localhost:5000/products/vote/${product.name}`, {
          userEmail: user.email, // Send user email to track votes
        })
        .then(() => {
          setProducts((prevProducts) =>
            prevProducts.map((p) =>
              p.name === product.name ? { ...p, votes: (p.votes || 0) + 1 } : p
            )
          );
        })
        .catch((error) => {
          console.error('Error upvoting product:', error);
        });
    }
  };

  return (
    <div className="featured-products my-10 px-5">
      <h2 className="text-3xl font-bold text-center mb-8">Featured Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product, index) => (
          <div
            key={index}
            className="card bg-base-100 shadow-lg rounded-lg overflow-hidden"
          >
            <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
              <img
                src={product.image}
                alt={product.name}
                className="object-cover h-full w-full"
              />
            </div>

            <div className="p-4">
              <Link
                to={`/productDetails/${product._id}`}
                className="text-lg font-semibold hover:underline"
              >
                {product.name}
              </Link>

              <div className="mt-2 text-sm text-gray-500 flex flex-wrap gap-1">
                {product.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-1 bg-gray-200 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="mt-4">
                <button
                  className={`btn ${
                    user && user.email === product.ownerMail ? 'btn-disabled' : 'btn-primary'
                  }`}
                  disabled={user && user.email === product.ownerMail} // Disable for product owner
                  onClick={() => handleUpvote(product)}
                >
                  <span className="mr-2">
                    <SlLike />
                  </span>
                  {product.votes || 0}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedProducts;
