import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const ReportedContents = () => {
  const [reportedProducts, setReportedProducts] = useState([]);

  // Fetch reported products from the backend
  useEffect(() => {
    axios
      .get("http://localhost:5000/reportedProducts") // Replace with your API endpoint
      .then((res) => setReportedProducts(res.data))
      .catch((err) => console.error("Error fetching reported products:", err));
  }, []);

  // Handle delete action
  const handleDelete = (productId) => {
    axios
      .delete(`http://localhost:5000/reportedProducts/${productId}`) // Replace with your delete API endpoint
      .then(() => {
        setReportedProducts((prevProducts) =>
          prevProducts.filter((product) => product._id !== productId)
        );
        alert("Product deleted successfully!");
      })
      .catch((err) => console.error("Error deleting product:", err));
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Reported Products</h1>
      {reportedProducts.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="table-auto w-full text-left border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 px-4 py-2">Product Name</th>
                <th className="border border-gray-300 px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {reportedProducts.map((product) => (
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
                      className="btn btn-sm btn-danger"
                      onClick={() => handleDelete(product._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p>No reported products to review.</p>
      )}
    </div>
  );
};

export default ReportedContents;
