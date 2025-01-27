import { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const ManageCoupon = () => {
  const [coupons, setCoupons] = useState([]);
  const [formData, setFormData] = useState({
    couponCode: "",
    expiryDate: "",
    description: "",
    discountAmount: "",
  });

  // Fetch coupons from the server
  useEffect(() => {
    axios
      .get("https://huntify-server.vercel.app/coupons")
      .then((res) => setCoupons(res.data))
      .catch((err) => console.error("Error fetching coupons:", err));
  }, []);

  // Handle input change in the form
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle coupon addition
  // Handle coupon addition
  const handleAddCoupon = (e) => {
    e.preventDefault();
    axios
      .post("https://huntify-server.vercel.app/coupons", formData)
      .then(() => {
        Swal.fire({
          title: "Coupon Added!",
          icon: "success",
          draggable: true,
        });
        // Fetch the updated coupons list
        return axios.get("https://huntify-server.vercel.app/coupons");
      })
      .then((res) => {
        setCoupons(res.data); // Update state with the latest list
        setFormData({
          couponCode: "",
          expiryDate: "",
          description: "",
          discountAmount: "",
        });
      })
      .catch((err) => console.error("Error adding coupon:", err));
  };

  // Handle coupon deletion
  const handleDeleteCoupon = (id) => {
    axios
      .delete(`https://huntify-server.vercel.app/coupons/${id}`)
      .then(() => {
        setCoupons(coupons.filter((coupon) => coupon._id !== id));
      })
      .catch((err) => console.error("Error deleting coupon:", err));
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1 className="text-3xl font-bold">Manage Coupons</h1>

      {/* Add Coupon Form */}
      <form onSubmit={handleAddCoupon} style={{ marginBottom: "20px" }}>
        <h2 className="text-lg font-bold">Add a New Coupon</h2>
        <div style={{ marginBottom: "10px" }}>
          <label>Coupon Code:</label>
          <input
            className="border"
            type="text"
            name="couponCode"
            value={formData.couponCode}
            onChange={handleChange}
            required
            style={{ marginLeft: "10px" }}
          />
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label>Expiry Date:</label>
          <input
            className="border"
            type="date"
            name="expiryDate"
            value={formData.expiryDate}
            onChange={handleChange}
            required
            style={{ marginLeft: "10px" }}
          />
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label>Description:</label>
          <textarea
            className="border"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            style={{ marginLeft: "10px" }}
          />
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label>Discount Amount:</label>
          <input
            className="border"
            type="number"
            name="discountAmount"
            value={formData.discountAmount}
            onChange={handleChange}
            required
            style={{ marginLeft: "10px" }}
          />
        </div>
        <button
          type="submit"
          style={{
            padding: "10px 20px",
            background: "#4CAF50",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
          }}
        >
          Add Coupon
        </button>
      </form>

      {/* Coupons Table */}
      {coupons.length > 0 ? (
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ backgroundColor: "#f2f2f2" }}>
              <th style={{ border: "1px solid #ddd", padding: "8px" }}>
                Coupon Code
              </th>
              <th style={{ border: "1px solid #ddd", padding: "8px" }}>
                Expiry Date
              </th>
              <th style={{ border: "1px solid #ddd", padding: "8px" }}>
                Description
              </th>
              <th style={{ border: "1px solid #ddd", padding: "8px" }}>
                Discount Amount
              </th>
              <th style={{ border: "1px solid #ddd", padding: "8px" }}>
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {coupons.map((coupon) => (
              <tr key={coupon._id}>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                  {coupon.couponCode}
                </td>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                  {coupon.expiryDate}
                </td>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                  {coupon.description}
                </td>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                  {coupon.discountAmount}
                </td>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                  <button
                    onClick={() => handleDeleteCoupon(coupon._id)}
                    style={{
                      padding: "5px 10px",
                      background: "#FF6347",
                      color: "#fff",
                      border: "none",
                      borderRadius: "5px",
                      marginRight: "5px",
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No coupons available.</p>
      )}
    </div>
  );
};

export default ManageCoupon;
