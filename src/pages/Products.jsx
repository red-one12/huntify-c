import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../provider/AuthProvider";
import { SlLike } from "react-icons/sl";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(6); // Number of products per page
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:5000/products")
      .then((res) => {
        setProducts(res.data);
      })
      .catch((error) => {
        console.error("Error fetching featured products:", error);
      });
  }, []);

  const handleUpvote = (product) => {
    if (!user) {
      navigate("/login");
    } else if (user.email !== product.ownerMail) {
      axios
        .post(`http://localhost:5000/products/vote/${product.name}`, {
          userEmail: user.email,
        })
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

  // Pagination logic
  const totalPages = Math.ceil(products.length / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  const currentProducts = products.slice(startIndex, startIndex + productsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="featured-products my-10 max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold text-center mb-8">All Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentProducts.map((product, index) => (
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
                to={`/productDetails/${product.name}`}
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
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="join flex justify-center items-center mt-10">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i + 1}
            className={`join-item btn btn-square ${
              currentPage === i + 1 ? "btn-active" : ""
            }`}
            onClick={() => handlePageChange(i + 1)}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Products;
