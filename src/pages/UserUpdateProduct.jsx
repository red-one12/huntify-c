import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const UserUpdateProduct = () => {
  const { id } = useParams(); // Get product ID from URL params
  const navigate = useNavigate(); // Navigate to another page after updating
  const [formData, setFormData] = useState({
    name: "",
    votes: "",
    status: "",
  }); // State to store product data
  const [isLoading, setIsLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  useEffect(() => {
    // Fetch product data by ID
    axios
      .get(`https://huntify-server.vercel.app/product/${id}`)
      .then((res) => {
        const { name, votes, status, image } = res.data[0]; // Adjust based on API response
        setFormData({
          name: name || "",
          image: image || "",
          votes: votes || "",
          status: status || "Pending",
        });
        setIsLoading(false); // Stop loading once data is fetched
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to fetch product data.");
        setIsLoading(false); // Stop loading on error
      });
  }, [id]);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(`https://huntify-server.vercel.app/product/${id}`, formData)
      .then(() => {
        Swal.fire({
          title: "Product Updated!",
          icon: "success",
          draggable: true,
        });
        navigate("/dashboard/myProducts"); // Redirect to product list
      })
      .catch((err) => {
        console.error(err);
        alert("Failed to update product. Please try again.");
      });
  };

  // Show loading indicator
  if (isLoading) {
    return (
      <div className="text-center mt-10">
        <h2 className="text-xl font-bold">Loading...</h2>
        <span className="loading loading-dots loading-lg"></span>
      </div>
    );
  }

  // Show error message if there's an issue
  if (error) {
    return (
      <div className="text-center mt-10">
        <h2 className="text-xl font-bold text-red-600">{error}</h2>
      </div>
    );
  }

  // Display product form
  return (
    <div className="max-w-4xl mx-auto bg-white shadow-md rounded p-6 mt-10">
      <h2 className="text-2xl font-bold mb-4 text-center">Update Product</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Product Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name} // Prefilled value
            onChange={handleChange} // Handle changes
            className="w-full px-4 py-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Product Image
          </label>
          <input
            type="text"
            id="image"
            name="image"
            value={formData.image} // Prefilled value
            onChange={handleChange} // Handle changes
            className="w-full px-4 py-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="votes"
            className="block text-sm font-medium text-gray-700"
          >
            Votes
          </label>
          <input
            type="number"
            id="votes"
            name="votes"
            value={formData.votes} // Prefilled value
            onChange={handleChange} // Handle changes
            className="w-full px-4 py-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="status"
            className="block text-sm font-medium text-gray-700"
          >
            Status
          </label>
          <select
            id="status"
            name="status"
            value={formData.status} // Prefilled value
            onChange={handleChange} // Handle changes
            className="w-full px-4 py-2 border rounded"
          >
            <option value="Pending">Pending</option>
            <option value="Published">Published</option>
            <option value="Archived">Archived</option>
          </select>
        </div>
        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-blue-600 text-white py-2 px-6 rounded hover:bg-blue-700"
          >
            Update Product
          </button>
        </div>
      </form>
    </div>
  );
};

export default UserUpdateProduct;
