import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const ReviewQueue = () => {
  const [products, setProducts] = useState([]);

  // Fetching products data from the backend
  useEffect(() => {
    axios
      .get("https://huntify-server.vercel.app/products")
      .then((res) => {
        // Sort products so Pending comes first
        const sortedProducts = res.data.sort((a, b) => {
          if (a.status === "Pending" && b.status !== "Pending") return -1;
          if (a.status !== "Pending" && b.status === "Pending") return 1;
          return 0;
        });
        setProducts(sortedProducts);
      })
      .catch((err) => console.error("Error fetching products:", err));
  }, []);

  // Handlers for product actions
  const handleMakeFeatured = (productId) => {
    axios
      .post(`https://huntify-server.vercel.app/products/feature/${productId}`)
      .then(() => {
        setProducts((prevProducts) =>
          prevProducts.map((product) =>
            product._id === productId
              ? { ...product, isFeatured: true }
              : product
          )
        );
        alert("Product marked as featured!");
      })
      .catch((err) => console.error("Error marking product as featured:", err));
  };

  const handleAccept = (productId) => {
    axios
      .post(`https://huntify-server.vercel.app/products/accept/${productId}`)
      .then(() => {
        setProducts((prevProducts) =>
          prevProducts.map((product) =>
            product._id === productId
              ? { ...product, status: "Accepted" }
              : product
          )
        );
      })
      .catch((err) => console.error("Error accepting product:", err));
  };

  const handleReject = (productId) => {
    axios
      .post(`https://huntify-server.vercel.app/products/reject/${productId}`)
      .then(() => {
        setProducts((prevProducts) =>
          prevProducts.map((product) =>
            product._id === productId
              ? { ...product, status: "Rejected" }
              : product
          )
        );
      })
      .catch((err) => console.error("Error rejecting product:", err));
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Product Review Queue</h2>
      <div className="overflow-x-auto">
        <table className="table-auto w-full text-left border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 px-4 py-2">Product Name</th>
              <th className="border border-gray-300 px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id} className="hover:bg-gray-50">
                <td className="border border-gray-300 px-4 py-2">
                  {product.name}
                </td>
                <td className="border border-gray-300 px-4 py-2 space-x-2">
                  <Link
                    to={`/productDetails/${product._id}`}
                    className="btn btn-sm btn-outline"
                  >
                    View Details
                  </Link>
                  <button
                    className="btn btn-sm btn-success"
                    onClick={() => handleMakeFeatured(product._id)}
                    disabled={product.isFeatured} // Disable if already featured
                  >
                    {product.isFeatured ? "Featured" : "Make Featured"}
                  </button>
                  <button
                    className={`btn btn-sm ${
                      product.status === "Accepted"
                        ? "btn-disabled"
                        : "btn-primary"
                    }`}
                    disabled={product.status === "Accepted"}
                    onClick={() => handleAccept(product._id)}
                  >
                    Accept
                  </button>
                  <button
                    className={`btn btn-sm ${
                      product.status === "Rejected"
                        ? "btn-disabled"
                        : "btn-warning"
                    }`}
                    disabled={product.status === "Rejected"}
                    onClick={() => handleReject(product._id)}
                  >
                    Reject
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ReviewQueue;
