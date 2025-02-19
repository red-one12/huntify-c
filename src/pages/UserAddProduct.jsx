import { useContext, useState } from "react";
import { AuthContext } from "../provider/AuthProvider";
import { useNavigate } from "react-router-dom";
import { WithContext as ReactTags } from "react-tag-input";
import axios from "axios";
import Swal from "sweetalert2";

const UserAddProduct = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  // States for the form
  const [productName, setProductName] = useState("");
  const [productImage, setProductImage] = useState(null);
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState([]);
  const [externalLink, setExternalLink] = useState("");

  // Ensure user object exists
  if (!user) {
    return (
      <div className="flex items-center justify-center h-screen">
        <span className="loading loading-dots loading-lg"></span>
      </div>
    );
  }

  // Handlers for ReactTags
  const handleDelete = (i) => {
    setTags(tags.filter((tag, index) => index !== i));
  };

  const handleAddition = (tag) => {
    setTags([...tags, tag]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!productName || !productImage || !description) {
      alert("Please fill all required fields!");
      return;
    }

    const formData = {
      name: productName,
      image: productImage,
      description: description,
      ownerMail: user.email,
      tags: tags.map((tag) => tag.text), // Convert tags array into plain text
      externalLink,
      timestamp: new Date(), // Save timestamp
    };

    try {
      await axios.post("https://huntify-server.vercel.app/products", formData);
      Swal.fire({
        title: "Product Added!",
        icon: "success",
        draggable: true,
      });
      navigate("/dashboard/myProducts"); // Redirect to My Products page
    } catch (error) {
      console.error("Error adding product:", error);
      alert("Failed to add product. Please try again.");
    }
  };

  return (
    <div className="w-full mt-10">
      <h2 className="text-light text-4xl font-bold mb-4 text-center">Add New Product</h2>
      <form onSubmit={handleSubmit}>
        {/* Product Name */}
        <label className="block text-light text-gray-700 font-semibold mb-2">
          Product Name <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
          placeholder="Enter product name"
          required
          className="w-full p-3 border rounded mb-4"
        />

        {/* Product Image */}
        <label className="block text-light text-gray-700 font-semibold mb-2">
          Product Image URL <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          value={productImage}
          onChange={(e) => setProductImage(e.target.value)}
          placeholder="Enter image URL"
          required
          className="w-full p-3 border rounded mb-4"
        />

        {/* Description */}
        <label className="block text-light text-gray-700 font-semibold mb-2">
          Description <span className="text-red-500">*</span>
        </label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Write a short description about the product"
          required
          className="w-full p-3 border rounded mb-4"
        ></textarea>

        {/* Owner Info */}
        <div className="mb-4">
          <h4 className="font-semibold text-light text-gray-700">Owner Info</h4>
          <div className="p-3 border rounded bg-gray-100">
            <p>
              <strong>Name:</strong> {user.displayName || "N/A"}
            </p>
            <p>
              <strong>Email:</strong> {user.email || "N/A"}
            </p>
          </div>
        </div>

        {/* Tags */}
        <label className="block text-light text-gray-700 font-semibold mb-2">Tags</label>
        <ReactTags
          tags={tags}
          handleDelete={handleDelete}
          handleAddition={handleAddition}
          placeholder="Add tags"
          classNames={{
            tags: "flex flex-wrap",
            tag: "bg-blue-500 text-white px-2 py-1 rounded mr-2 mb-2",
            remove: "ml-2 text-white cursor-pointer",
            input: "w-full p-3 border rounded mb-4",
          }}
        />

        {/* External Link */}
        <label className="block text-light text-gray-700 font-semibold mb-2">
          External Link
        </label>
        <input
          type="url"
          value={externalLink}
          onChange={(e) => setExternalLink(e.target.value)}
          placeholder="Enter external link (optional)"
          className="w-full p-3 border rounded mb-4"
        />

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded font-semibold"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default UserAddProduct;
