import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../provider/AuthProvider";

const ProductDetails = () => {
  const { user } = useContext(AuthContext);
  const [allUser, setAllUser] = useState([]);
  const { id } = useParams();
  const [product, setProduct] = useState({}); // Initialize as an object instead of an array

  // Fetch product details
  useEffect(() => {
    axios
      .get(`http://localhost:5000/product/${id}`)
      .then((res) => setProduct(res.data[0])) // Assuming the response is a single product object
      .catch((err) => console.log(err));
  }, [id]);

  // Fetch all users
  useEffect(() => {
    axios
      .get("http://localhost:5000/users")
      .then((res) => setAllUser(res.data))
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // Function to handle reporting the product
  const handleReport = async (productId) => {
    try {
      const response = await fetch(
        `http://localhost:5000/products/report/${productId}`,
        {
          method: "PATCH", // Using PATCH because we're updating a specific field
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ isReported: true }), // Sending the report flag
        }
      );

      const data = await response.json();
      if (response.ok) {
        alert("Product reported successfully!");
      } else {
        alert(`Failed to report product: ${data.message}`);
      }
    } catch (error) {
      console.error("Error reporting product:", error);
      alert("Something went wrong. Please try again later.");
    }
  };

  
  const handleDelete = async (productId) => {
    try {
      const response = await axios.delete(
        `http://localhost:5000/product/${productId}`
      );
      if (response.status === 200) {
        alert("Product deleted successfully!");
        setProduct(null); 
      }
    } catch (error) {
      console.error("Error deleting product:", error);
      alert("Failed to delete product. Please try again.");
    }
  };

  
  const currentUser = allUser.find((u) => u.email === user?.email);

  return (
    <div className="max-w-4xl mx-auto p-6">
      {product ? (
        <>
          <h2 className="text-3xl font-bold mb-2">{product.name}</h2>
          <div className="border border-gray-300 rounded-lg p-4">
            <img
              src={product.image}
              alt={product.name}
              className="w-full max-h-64 object-cover rounded-lg mb-4"
            />
            <p className="text-gray-600 mb-2">
              <strong>Status:</strong> {product.status}
            </p>
            <p className="text-gray-600 mb-2">
              <strong>Votes:</strong> {product.votes}
            </p>
            <p className="text-gray-600 mb-2">
              <strong>Owner Email:</strong> {product.ownerMail}
            </p>
            <p className="text-gray-600 mb-2">
              <strong>Featured:</strong> {product.isFeatured ? "Yes" : "No"}
            </p>
            <p className="text-gray-600 mb-4">
              <strong>Timestamp:</strong>{" "}
              {new Date(product.timestamp).toLocaleString()}
            </p>
            <button
              onClick={() => handleReport(product._id)}
              className="px-4 py-2 bg-red-500 text-white rounded-lg mr-4"
            >
              Report
            </button>
            {currentUser?.position === "moderator" && (
              <button
                onClick={() => handleDelete(product._id)}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg"
              >
                Delete
              </button>
            )}
          </div>
        </>
      ) : (
        <p className="text-center text-gray-500">Product not found or deleted.</p>
      )}
    </div>
  );
};

export default ProductDetails;
