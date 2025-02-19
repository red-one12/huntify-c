import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../provider/AuthProvider";
import { SlLike } from "react-icons/sl";
import { TbListDetails } from "react-icons/tb";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(6); // Number of products per page
  const [searchTerm, setSearchTerm] = useState(""); // For search functionality
  const [sortOrder, setSortOrder] = useState("desc"); // Sorting order state
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  // Fetch products based on search term
  useEffect(() => {
    axios
      .get(`https://huntify-server.vercel.app/products?search=${searchTerm}`)
      .then((res) => {
        setProducts(res.data);
        setCurrentPage(1); // Reset to page 1 when search term changes
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }, [searchTerm]);

  // Handle upvoting
  const handleUpvote = (product) => {
    if (!user) {
      navigate("/signin");
    } else if (user.email !== product.ownerMail) {
      axios
        .post(
          `https://huntify-server.vercel.app/products/vote/${product.name}`,
          {
            userEmail: user.email,
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

  const sortedProducts = [...products].sort((a, b) => {
    return sortOrder === "asc" ? a.votes - b.votes : b.votes - a.votes;
  });

  // Pagination logic
  const totalPages = Math.ceil(sortedProducts.length / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  const currentProducts = sortedProducts.slice(
    startIndex,
    startIndex + productsPerPage
  );

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="featured-products py-28 max-w-7xl mx-auto px-5">
      <div className="mb-6 flex flex-col sm:flex-row w-full max-w-2xl mx-auto gap-4 items-center">
  <input
    type="text"
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
    placeholder="Search products by tags..."
    className="input input-bordered w-full sm:flex-1"
  />

  <button
    className="btn bg-blue-600 text-white w-full sm:w-auto"
    onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
  >
    Sort by Votes: {sortOrder === "asc" ? "Ascending" : "Descending"}
  </button>
</div>


      <h2 className="text-light text-2xl font-bold mb-8">All Products</h2>
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

              <div className="mt-4 flex items-center justify-between">
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

      {/* Pagination */}
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
