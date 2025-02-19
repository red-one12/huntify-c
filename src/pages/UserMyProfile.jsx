import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../provider/AuthProvider";
import axios from "axios";
import Swal from "sweetalert2";

const UserMyProfile = () => {
  const { user } = useContext(AuthContext);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const subscriptionAmount = 20;

  useEffect(() => {
    if (user && user.email) {
      axios
        .get(`https://huntify-server.vercel.app/users/${user.email}`)
        .then((response) => {
          if (response.data.subscriptionStatus) {
            setIsSubscribed(true);
          }
        })
        .catch((error) => {
          console.error("Error fetching user subscription status:", error);
        });
    }
  }, [user]);

  const handleSubscribe = () => {
    if (!user || !user.email) {
      alert("User information is not available.");
      return;
    }

    axios
      .post("https://huntify-server.vercel.app/subscribe", {
        email: user.email,
      })
      .then((response) => {
        setIsSubscribed(true);

        Swal.fire({
          title: "Subscription successful! Thank you for subscribing!",
          icon: "success",
          draggable: true,
        });
        closeModal();
      })
      .catch((error) => {
        console.error("Error subscribing:", error);
        alert("Failed to subscribe. Please try again.");
      });
  };

  // Close subscription modal
  const closeModal = () => {
    document.getElementById("subscriptionModal").close();
  };

  return (
    <div className="pt-10">
      <div className="flex flex-col">
        {user ? (
          <>
            {/* User Avatar */}
            <div className="flex justify-start items-center gap-5">
            <div className="w-32 h-32 rounded-full overflow-hidden border-2 border-gray-300 mb-4">
              <img
                src={user.photoURL}
                alt={user.displayName || "User"}
                className="object-cover w-full h-full"
              />
            </div>

            <div>
              <h1 className="text-5xl text-blue-600 font-bold">Welcome Back!</h1>

              <h1 className="text-2xl font-bold mb-2">
                {user.displayName || "N/A"}
              </h1>
            </div>
            </div>

            <p className="text-gray-600 mb-4">Email: <span className="font-bold">{user.email || "N/A"}</span></p>
            <p className="text-gray-600 mb-4">Phone Number: <span className="font-bold">+8801703344405</span></p>



            {isSubscribed ? (
              <div className="bg-green-100 text-green-700 w-[350px] px-4 py-2 rounded-md mt-4">
                <p className="text-lg font-semibold">
                  Membership Status: Verified
                </p>
              </div>
            ) : (
              <button
                className="btn bg-[#340070] text-white text-lg px-6 py-2"
                onClick={() =>
                  document.getElementById("subscriptionModal").showModal()
                }
              >
                Subscribe for ${subscriptionAmount}
              </button>
            )}
          </>
        ) : (
          <span className="loading loading-dots loading-lg"></span>
        )}
      </div>

      {/* Subscription Modal */}
      <dialog
        id="subscriptionModal"
        className="modal modal-bottom sm:modal-middle"
      >
        <div className="modal-box">
          <h3 className="font-bold text-lg mb-2">Complete Your Subscription</h3>
          <p className="py-4">
            Subscribe now for just ${subscriptionAmount} to enjoy exclusive
            benefits!
          </p>
          <div className="modal-action">
            {/* Close Modal */}
            <button className="btn bg-gray-300 text-black" onClick={closeModal}>
              Cancel
            </button>

            {/* Confirm Payment */}
            <button
              className="btn bg-[#340070] text-white"
              onClick={handleSubscribe}
            >
              Pay Now
            </button>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default UserMyProfile;
