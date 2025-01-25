import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ProductDetails = () => {
  const { id } = useParams();
  console.log(id);
  const [product, setProduct] = useState({}); // Initialize as an object instead of an array

  useEffect(() => {
    axios
      .get(`http://localhost:5000/product/${id}`)
      .then((res) => setProduct(res.data[0])) // Assuming the response is a single product object
      .catch((err) => console.log(err));
  }, [id]);

  console.log(product);

  return (
    <div className="max-w-4xl mx-auto p-6">
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
      </div>
    </div>
  );
};

export default ProductDetails;
