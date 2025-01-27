import axios from "axios";
import { useEffect, useState } from "react";

const ShowAllUser = () => {
  const [huntifyUsers, setHuntifyUsers] = useState([]);

  // Fetch all users
  useEffect(() => {
    axios
      .get("https://huntify-server.vercel.app/users") // Replace with your actual API endpoint
      .then((res) => setHuntifyUsers(res.data))
      .catch((err) => console.error("Error fetching users:", err));
  }, []);

  // Make a user a moderator
  const handleMakeModerator = (userId) => {
    axios
      .patch(`https://huntify-server.vercel.app/users/${userId}/moderator`) // Replace with your actual API endpoint
      .then(() => {
        setHuntifyUsers((prevUsers) =>
          prevUsers.map((user) =>
            user._id === userId ? { ...user, role: "Moderator" } : user
          )
        );
        alert("User is now a Moderator!");
      })
      .catch((err) => console.error("Error updating user to Moderator:", err));
  };

  // Make a user an admin
  const handleMakeAdmin = (userId) => {
    axios
      .patch(`https://huntify-server.vercel.app/users/${userId}/admin`) // Replace with your actual API endpoint
      .then(() => {
        setHuntifyUsers((prevUsers) =>
          prevUsers.map((user) =>
            user._id === userId ? { ...user, role: "Admin" } : user
          )
        );
        alert("User is now an Admin!");
      })
      .catch((err) => console.error("Error updating user to Admin:", err));
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">All Users</h1>
      {huntifyUsers.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="table-auto w-full text-left border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 px-4 py-2">User Name</th>
                <th className="border border-gray-300 px-4 py-2">User Email</th>
                <th className="border border-gray-300 px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {huntifyUsers.map((user) => (
                <tr key={user._id} className="hover:bg-gray-50">
                  <td className="border border-gray-300 px-4 py-2">
                    {user.name}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {user.email}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 space-x-2">
                    <button
                      className={`btn btn-sm ${
                        user.role === "Moderator"
                          ? "btn-disabled"
                          : "btn-outline"
                      }`}
                      disabled={user.role === "Moderator"}
                      onClick={() => handleMakeModerator(user._id)}
                    >
                      {user.role === "Moderator"
                        ? "Moderator"
                        : "Make Moderator"}
                    </button>
                    <button
                      className={`btn btn-sm ${
                        user.role === "Admin" ? "btn-disabled" : "btn-primary"
                      }`}
                      disabled={user.role === "Admin"}
                      onClick={() => handleMakeAdmin(user._id)}
                    >
                      {user.role === "Admin" ? "Admin" : "Make Admin"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p>No users found.</p>
      )}
    </div>
  );
};

export default ShowAllUser;
