import axios from "axios";
import { useEffect, useState } from "react";

const CouponsCarousel = () => {
  const [coupons, setCoupons] = useState([]);

  // Fetch coupons from the server
  useEffect(() => {
    axios
      .get("http://localhost:5000/coupons")
      .then((res) => setCoupons(res.data))
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="flex flex-col items-center my-10 space-y-6">
      <h1 className="text-5xl font-bold text-center">
        GET YOUR
        <br />
        FAV <span className="text-green-500">COUPONS</span> HERE...
      </h1>

      <div className="carousel carousel-center w-1/2 rounded-box p-4 space-x-4">
        {coupons.map((coupon) => (
          <div
            key={coupon._id}
            className="carousel-item relative flex flex-col items-center bg-white border rounded-lg shadow-xl p-4 w-64"
          >
            <div className="text-center absolute bottom-20">
            <h2 className="text-2xl font-semibold text-green-600 text-center mb-2">
              {coupon.couponCode}
            </h2>
            <p className="text-sm text-gray-600 mb-1">
              <strong>Discount:</strong> {coupon.discountAmount}%
            </p>
            <p className="text-sm text-gray-600 mb-1">
              <strong>Expires on:</strong> {new Date(coupon.expiryDate).toLocaleDateString()}
            </p>
            <p className="text-sm text-gray-600 mb-4 text-center">
              {coupon.description}
            </p>
            </div>
            <img
              src="https://i.ibb.co.com/X5mtY2H/Black-Minimalist-Coming-Soon-Poster.png"
              alt="Coupon"
              className="rounded-lg w-full object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CouponsCarousel;
