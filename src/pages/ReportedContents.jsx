import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Import the hook for navigation

const ReportedContents = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate(); // Initialize navigate hook

  useEffect(() => {
    axios
      .get('http://localhost:5000/products')
      .then((res) => setProducts(res.data))
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // Filter products to only show those that are reported
  const reportedProducts = products.filter(product => product.isReported === true);

  // Handle "View" button click to navigate to product details
  const handleViewClick = (productId) => {
    navigate(`/productDetails/${productId}`);
  };

  return (
    <div>
      <h2>Reported Products</h2>
      {reportedProducts.length > 0 ? (
        <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
          {reportedProducts.map((product) => (
            <div
              key={product._id}
              style={{
                width: "250px",
                padding: "20px",
                border: "1px solid #ddd",
                borderRadius: "8px",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                backgroundColor: "#fff",
              }}
            >
              <div style={{ fontWeight: "bold", marginBottom: "10px" }}>
                {product.name}
              </div>
              <div style={{ marginBottom: "10px", color: "#555" }}>
                Report Count: {product.reportCount}
              </div>
              <button
                onClick={() => handleViewClick(product._id)}
                style={{
                  padding: "8px 16px",
                  backgroundColor: "#4CAF50",
                  color: "#fff",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
              >
                View
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p>No reported products</p>
      )}
    </div>
  );
};

export default ReportedContents;
