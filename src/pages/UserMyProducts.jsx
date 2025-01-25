import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../provider/AuthProvider";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const UserMyProducts = () => {
  const { user } = useContext(AuthContext); // Get logged-in user info
  const [products, setProducts] = useState([]); // State to store user products
  const navigate = useNavigate();

  // Fetch user's products from the server
  useEffect(() => {
    if (user && user.email) { // Check if user and email exist
      const fetchUserProducts = async () => {
        try {
          const response = await axios.get(`http://localhost:5000/products/${user.email}`);
          setProducts(response.data); // Set the retrieved products to state
        } catch (error) {
          console.error("Error fetching products:", error);
        }
      };

      fetchUserProducts();
    }
  }, [user]);

  // Redirect to update page
  const handleUpdate = (productId) => {
    navigate(`/updateProduct/${productId}`);
  };

  // Delete a product
  const handleDelete = async (productId) => {
    const confirmation = window.confirm("Are you sure you want to delete this product?");
    if (confirmation) {
      try {
        await axios.delete(`http://localhost:5000/products/${productId}`);
        // Remove the deleted product from the state
        setProducts(products.filter((product) => product._id !== productId));
        alert("Product deleted successfully!");
      } catch (error) {
        console.error("Error deleting product:", error);
        alert("Failed to delete product. Please try again.");
      }
    }
  };

  if (!user) {
    return (
      <div className="text-center mt-10">
        <h2 className="text-xl font-bold">Loading...</h2>
        <span className="loading loading-dots loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto bg-white shadow-md rounded p-6 mt-10">
      <h2 className="text-2xl font-bold mb-4 text-center">My Products</h2>
      <table className="min-w-full table-auto">
        <thead>
          <tr>
            <th className="px-4 py-2 border">Product Image</th>
            <th className="px-4 py-2 border">Product Name</th>
            <th className="px-4 py-2 border">Votes</th>
            <th className="px-4 py-2 border">Status</th>
            <th className="px-4 py-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.length === 0 ? (
            <tr>
              <td colSpan="4" className="text-center py-4">No products found</td>
            </tr>
          ) : (
            products.map((product) => (
              <tr key={product._id}>
                <td className="px-4 py-2 border"><img src={product.image} className="w-40" alt="" /></td>
                <td className="px-4 py-2 border">{product.name}</td>
                <td className="px-4 py-2 border">{product.votes || 0}</td>
                <td className="px-4 py-2 border">{product.status || "Pending"}</td>
                <td className="px-4 py-2 border">
                  <button
                    onClick={() => handleUpdate(product._id)}
                    className="bg-blue-600 text-white py-1 px-4 rounded mr-2"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => handleDelete(product._id)}
                    className="bg-red-600 text-white py-1 px-4 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default UserMyProducts;
