import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../provider/AuthProvider";
import Swal from "sweetalert2";

const ProductDetails = () => {
  const { user, loading } = useContext(AuthContext);
  const [allUser, setAllUser] = useState([]);
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [reviews, setReviews] = useState([]);
  
  const [reviewData, setReviewData] = useState({
    description: "",
    rating: "",
  });
  const [allReviews, setAllReviews] = useState([]);



  // Fetch product details
  useEffect(() => {
    axios
      .get(`http://localhost:5000/product/${id}`)
      .then((res) => setProduct(res.data[0]))
      .catch((err) => console.log(err));
  }, [id]);

  // Fetch reviews for the product
  useEffect(() => {
    axios
      .get(`http://localhost:5000/product/${id}/reviews`)
      .then((res) => setReviews(res.data))
      .catch((err) => console.log(err));
  }, [id]);

  // Fetch all users
  useEffect(() => {
    axios
      .get("http://localhost:5000/users")
      .then((res) => setAllUser(res.data))
      .catch((err) => console.log(err));
  }, []);

  const handleReport = async (productId) => {
    try {
      const response = await fetch(
        `http://localhost:5000/products/report/${productId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ isReported: true }),
        }
      );

      const data = await response.json();
      if (response.ok) {
        Swal.fire({
          title: "Reported This Product!",
          icon: "success",
          draggable: true,
        });
        setProduct((prev) => ({ ...prev, isReported: true }));
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
        Swal.fire({
          title: "Product Deleted!",
          icon: "error",
          draggable: true
        });
        setProduct(null);
      }
    } catch (error) {
      console.error("Error deleting product:", error);
      alert("Failed to delete product. Please try again.");
    }
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    if (!reviewData.description || !reviewData.rating) {
      Swal.fire({
        title: "Error",
        text: "Please fill out all fields before submitting!",
        icon: "error",
      });
      return;
    }
  
    const newReview = {
      productId: id,
      userName: user?.displayName,
      userImage: user?.photoURL,
      description: reviewData.description,
      rating: parseInt(reviewData.rating),
    };
  
    try {
      const response = await axios.post("http://localhost:5000/reviews", newReview);
      if (response.status === 201) {
        Swal.fire({
          title: "Review Submitted",
          text: "Thank you for your feedback!",
          icon: "success",
        });
        setAllReviews((prev) => [...prev, newReview]); // Update the reviews list dynamically
        setReviewData({ description: "", rating: "" }); // Reset the form
      }
    } catch (error) {
      console.error("Error submitting review:", error);
      Swal.fire({
        title: "Error",
        text: "Failed to submit your review. Please try again later.",
        icon: "error",
      });
    }
  };
  

  useEffect(() => {
    axios.get(`http://localhost:5000/review/${id}`)
    .then(res => setAllReviews(res.data))
    .catch(err => {
      console.log(err);
    })
  }, []);
  // console.log(allReviews);
  
  const currentUser = allUser.find((u) => u.email === user?.email);

 

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
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
            {product.isReported ? (
              <button
                className="px-4 py-2 bg-gray-400 text-white rounded-lg cursor-not-allowed"
                disabled
              >
                Reported
              </button>
            ) : (
              <button
                onClick={() => handleReport(product._id)}
                className="px-4 py-2 bg-red-500 text-white rounded-lg mr-4"
              >
                Report
              </button>
            )}
            {currentUser?.position === "moderator" && (
              <button
                onClick={() => handleDelete(product._id)}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg"
              >
                Delete
              </button>
            )}
          </div>

          {/* Post Review Section */}
          <div className="mt-8">
            <h3 className="text-2xl font-bold mb-4">Post a Review</h3>
            <form onSubmit={handleReviewSubmit} className="space-y-4">
              <div>
                <label className="block font-medium mb-1">Reviewer Name</label>
                <input
                  type="text"
                  value={user?.displayName || ""}
                  readOnly
                  className="w-full px-4 py-2 border rounded-lg bg-gray-100"
                />
              </div>
              <div>
                <label className="block font-medium mb-1">Reviewer Image</label>
                <input
                  type="text"
                  value={user?.photoURL || ""}
                  readOnly
                  className="w-full px-4 py-2 border rounded-lg bg-gray-100"
                />
              </div>
              <div>
                <label className="block font-medium mb-1">Review Description</label>
                <textarea
                  value={reviewData.description}
                  onChange={(e) =>
                    setReviewData((prev) => ({ ...prev, description: e.target.value }))
                  }
                  className="w-full px-4 py-2 border rounded-lg"
                  placeholder="Write your review here..."
                ></textarea>
              </div>
              <div>
                <label className="block font-medium mb-1">Rating</label>
                <input
                  type="number"
                  value={reviewData.rating}
                  onChange={(e) =>
                    setReviewData((prev) => ({ ...prev, rating: e.target.value }))
                  }
                  className="w-full px-4 py-2 border rounded-lg"
                  placeholder="Rate out of 5"
                  max={5}
                  min={1}
                />
              </div>
              <button
                type="submit"
                className="px-4 py-2 bg-green-500 text-white rounded-lg"
              >
                Submit Review
              </button>
            </form>
          </div>

          {/* Reviews Section */}
          <div className="mt-8">
            <h3 className="text-2xl font-bold mb-4">Customer Reviews</h3>
            {allReviews.length > 0 ? (
              <div className="carousel carousel-center space-x-4">
                {allReviews.map((review) => (
                  <div
                    key={review._id}
                    className="carousel-item bg-white border rounded-lg shadow-md p-4 w-[250px] flex flex-col gap-5 justify-center items-center"
                  >
                    <img src={review.userImage} className="w-20 h-20 rounded-full object-cover" alt="" />
                    <p className="text-gray-700">
                      <strong>{review.userName}</strong>
                    </p>
                    <p className="text-gray-500 text-center">{review.description}</p>
                    <p className="text-gray-400 text-sm">
                      <strong>Rating:</strong> {review.rating} / 5
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">No reviews available for this product.</p>
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
