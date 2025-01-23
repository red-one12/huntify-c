import { useContext, useState } from "react";
import { AuthContext } from "../provider/AuthProvider";
import axios from "axios";

const UserMyProfile = () => {
  const { user } = useContext(AuthContext); // Access user information from AuthContext
  const [isSubscribed, setIsSubscribed] = useState(false); // Track subscription status
  const subscriptionAmount = 49.99; // Subscription amount

  const handleSubscribe = () => {
    axios
      .post("http://localhost:5000/subscribe", { email: user.email })
      .then((response) => {
        setIsSubscribed(true); // Update subscription status
        alert("Subscription successful!");
      })
      .catch((error) => {
        console.error("Error subscribing:", error);
        alert("Failed to subscribe. Please try again.");
      });
  };

  return (
    <div className="my-profile p-8 max-w-lg mx-auto bg-white shadow-2xl rounded-lg">
      <div className="flex flex-col items-center">
        
        <div className="w-32 h-32 rounded-full overflow-hidden border-2 border-gray-300 mb-4">
          <img
            src={user.photoURL || "https://via.placeholder.com/150"}
            alt={user.displayName}
            className="object-cover w-full h-full"
          />
        </div>

       
        <h1 className="text-2xl font-bold mb-2">{user.displayName || "N/A"}</h1>

    
        <p className="text-gray-600 mb-4">{user.email || "N/A"}</p>

     
        {!isSubscribed ? (
          <button
            className="btn bg-[#340070] text-white text-lg px-6 py-2"
            onClick={handleSubscribe}
          >
            Subscribe for ${subscriptionAmount}
          </button>
        ) : (
          <div className="bg-green-100 text-green-700 px-4 py-2 rounded-md mt-4">
            <p className="text-lg font-semibold">Membership Status: Verified</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserMyProfile;
