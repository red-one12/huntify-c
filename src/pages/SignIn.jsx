import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../provider/AuthProvider";

const SignIn = () => {

  const {loginUser, googleLogin} = useContext(AuthContext);

  const handleGoogleSignIn = () => {
    googleLogin()
    .then(result => {
      console.log(result.user);
    })
    .catch(error => {
      console.log(error.message);
    })
  };

  const handleLogin = (event) => {
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;

    loginUser(email, password)
    .then(result => {
      console.log(result.user);
    })
    .catch(error => {
      console.log(error.message);
    })
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-md">
        <h2 className="text-center text-3xl font-bold text-gray-800">Sign In</h2>
        <form className="mt-6" onSubmit={handleLogin}>
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
          <div className="mb-6">
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
          <button
            type="submit"
            className="w-full rounded-lg bg-blue-500 py-2 text-white hover:bg-blue-600"
          >
            Login
          </button>
        </form>
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">Or login with</p>
          <button
            onClick={handleGoogleSignIn}
            className="mt-2 w-full rounded-lg border border-gray-300 py-2 text-gray-600 hover:bg-gray-100"
          >
            Continue with Google
          </button>
        </div>
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Don't have an account?{" "}
            <Link
              to="/signUp"
              className="font-medium text-blue-500 hover:underline"
            >
              Sign Up here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
