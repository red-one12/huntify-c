import React, { useEffect, useState } from "react";
import { PieChart } from "react-minimal-pie-chart";
import axios from "axios";

const Statistics = () => {
  const [stats, setStats] = useState({
    totalProducts: 0,
    acceptedProducts: 0,
    pendingProducts: 0,
    totalReviews: 0,
    totalUsers: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Replace these URLs with your actual API endpoints
        const productsResponse = await axios.get(
          "https://huntify-server.vercel.app/products"
        );
        const usersResponse = await axios.get(
          "https://huntify-server.vercel.app/users"
        );

        const totalProducts = productsResponse.data.length;
        const acceptedProducts = productsResponse.data.filter(
          (product) => product.status === "Accepted"
        ).length;
        const pendingProducts = productsResponse.data.filter(
          (product) => product.status === "Pending"
        ).length;

        const totalReviews = productsResponse.data.reduce(
          (acc, product) =>
            acc + (product.reviews ? product.reviews.length : 0),
          0
        );

        const totalUsers = usersResponse.data.length;

        setStats({
          totalProducts,
          acceptedProducts,
          pendingProducts,
          totalReviews,
          totalUsers,
        });
      } catch (error) {
        console.error("Error fetching statistics:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-4">Admin Statistics</h2>
      <div className="max-w-lg mx-auto">
        {stats.totalProducts > 0 ||
        stats.totalUsers > 0 ||
        stats.totalReviews > 0 ? (
          <>
            <PieChart
              data={[
                {
                  title: "Accepted Products",
                  value: stats.acceptedProducts,
                  color: "#4CAF50", // Green
                },
                {
                  title: "Pending Products",
                  value: stats.pendingProducts,
                  color: "#FFC107", // Yellow
                },
                {
                  title: "Total Products",
                  value: stats.totalProducts,
                  color: "#2196F3", // Blue
                },
                {
                  title: "Total Reviews",
                  value: stats.totalReviews,
                  color: "#FF5722", // Orange
                },
                {
                  title: "Total Users",
                  value: stats.totalUsers,
                  color: "#9C27B0", // Purple
                },
              ]}
              label={({ dataEntry }) => `${dataEntry.value}`}
              labelStyle={{
                fontSize: "6px",
                fontWeight: "bold",
                fill: "#fff",
              }}
              radius={42}
              labelPosition={112}
              animate
            />

            {/* Segment Section */}
            <div className="mt-6 grid grid-cols-1 gap-4 text-sm text-gray-800">
              <div className="flex justify-between items-center border-b pb-2">
                <span className="font-semibold">Total Products:</span>
                <span className="text-blue-500 font-semibold">
                  {stats.totalProducts}
                </span>
              </div>
              <div className="flex justify-between items-center border-b pb-2">
                <span className="font-semibold">Total Reviews:</span>
                <span className="text-orange-500 font-semibold">
                  {stats.totalReviews}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-semibold">Total Users:</span>
                <span className="text-purple-500 font-semibold">
                  {stats.totalUsers}
                </span>
              </div>
            </div>
          </>
        ) : (
          <p className="text-center text-gray-500">
            No data available to display
          </p>
        )}
      </div>
    </div>
  );
};

export default Statistics;
