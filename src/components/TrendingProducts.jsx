import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { SlLike } from "react-icons/sl";
import { AuthContext } from "../provider/AuthProvider";
import { TbListDetails } from "react-icons/tb";
import { IoIosArrowDroprightCircle } from "react-icons/io";

const TrendingProducts = () => {
  const [products, setProducts] = useState([]);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("https://huntify-server.vercel.app/products")
      .then((res) => {
        const sortedProducts = res.data
          .sort((a, b) => (b.votes || 0) - (a.votes || 0)) // Sort by vote count (highest to lowest)
          .slice(0, 6); // Limit to 6 products
        setProducts(sortedProducts);
      })
      .catch((error) => {
        console.error("Error fetching trending products:", error);
      });
  }, []);

  const handleUpvote = (product) => {
    if (!user) {
      // Redirect to login if not logged in
      navigate("/signin");
    } else if (user.email !== product.ownerMail) {
      // Prevent owner from voting
      axios
        .post(
          `https://huntify-server.vercel.app/products/vote/${product.name}`,
          {
            userEmail: user.email, // Send user email to track votes
          }
        )
        .then(() => {
          setProducts((prevProducts) =>
            prevProducts.map((p) =>
              p.name === product.name ? { ...p, votes: (p.votes || 0) + 1 } : p
            )
          );
        })
        .catch((error) => {
          console.error("Error upvoting product:", error);
        });
    }
  };

  return (
    <div className="trending-products my-10 px-5">
      <h2 className="trending-product-title text-4xl font-bold text-center mb-8">Trending Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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

              <div className="mt-4 flex justify-between">
                <button
                  className={`btn ${
                    user && user.email === product.ownerMail
                      ? "btn-disabled"
                      : "btn-primary"
                  }`}
                  disabled={user && user.email === product.ownerMail} // Disable for product owner
                  onClick={() => handleUpvote(product)}
                >
                  <span className="mr-2">
                    <SlLike />
                  </span>
                  {product.votes || 0}
                </button>
                <button className="btn bg-green-300">
                  <Link
                    to={`/productDetails/${product._id}`}
                    className="flex justify-center items-center gap-2 text-sm font-semibold"
                  >
                    <TbListDetails />
                    Details
                  </Link>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-8 text-center flex justify-end">
        <button
          className="text-lg underline flex justify-center items-center gap-2 hover:text-blue-600"
          onClick={() => navigate("/products")}
        >
          Show All Products
          <IoIosArrowDroprightCircle className="text-2xl" />

        </button>
      </div>
    </div>
  );
};

export default TrendingProducts;
