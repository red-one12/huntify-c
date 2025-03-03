import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../provider/AuthProvider";
import { updateProfile } from "firebase/auth";
import Swal from "sweetalert2";

const SignUp = () => {
  const { createNewUser, setUser } = useContext(AuthContext);
  const navigateToHome = useNavigate();

  const handleSignUp = (event) => {
    event.preventDefault();
    const name = event.target.name.value;
    const email = event.target.email.value;
    const password = event.target.password.value;
    const photoURL = event.target.photoURL.value;

    createNewUser(email, password)
      .then((result) => {
        const user = result.user;
        return updateProfile(user, {
          displayName: name,
          photoURL: photoURL,
        }).then(() => {
          // Add user to the database
          const newUser = {
            email,
            isSubscribed: false, // Default value
            name,
          };

          fetch("https://huntify-server.vercel.app/users", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(newUser),
          })
            .then((res) => res.json())
            .then((data) => {
              if (data.insertedId || data.upsertedId) {
                Swal.fire({
                  title: "Successfully Signed UP!",
                  icon: "success",
                  draggable: true,
                });
                navigateToHome("/");
                // console.log("User added to the database:", data);
              } else {
                console.error("Failed to add user to the database");
              }
            })
            .catch((error) => console.error("Error posting user:", error));
        });
      })
      .catch((error) => {
        console.error("Error signing up:", error.message);
      });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-md">
        <h2 className="text-center text-3xl font-bold text-gray-800">
          Sign Up
        </h2>
        <form className="mt-6" onSubmit={handleSignUp}>
          <div className="mb-4">
            <label
              htmlFor="name"
              className="mb-2 block text-sm font-medium text-gray-600"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Enter your name"
              className="w-full rounded-lg border border-gray-300 p-3 text-gray-800 focus:border-blue-500 focus:outline-none"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="mb-2 block text-sm font-medium text-gray-600"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              className="w-full rounded-lg border border-gray-300 p-3 text-gray-800 focus:border-blue-500 focus:outline-none"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="mb-2 block text-sm font-medium text-gray-600"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              className="w-full rounded-lg border border-gray-300 p-3 text-gray-800 focus:border-blue-500 focus:outline-none"
              required
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="photo"
              className="mb-2 block text-sm font-medium text-gray-600"
            >
              Photo URL or Upload
            </label>
            <input
              type="url"
              id="photo"
              name="photoURL"
              placeholder="Enter an image URL"
              className="w-full rounded-lg border border-gray-300 p-3 text-gray-800 focus:border-blue-500 focus:outline-none"
            />
          </div>
          <button
            type="submit"
            className="w-full rounded-lg bg-blue-500 py-2 text-white hover:bg-blue-600"
          >
            Sign Up
          </button>
        </form>
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Already have an account?{" "}
            <Link
              to="/signIn"
              className="font-medium text-blue-500 hover:underline"
            >
              Sign In here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
