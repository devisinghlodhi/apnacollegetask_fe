import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const API_URL = import.meta.env.VITE_API_URL;

const SignupForm = () => {
    const navigate = useNavigate()
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false); // For showing loading indicator
  const [success, setSuccess] = useState(""); // For showing success message
  const [errorMessage, setErrorMessage] = useState(""); // For showing error message from API

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const validateForm = () => {
    let formErrors = {};
    if (!form.fullName) formErrors.fullName = "Full Name is required";
    if (!form.email) formErrors.email = "Email is required";
    if (!form.password) formErrors.password = "Password is required";
    if (!form.confirmPassword) formErrors.confirmPassword = "Confirm Password is required";
    if (form.password !== form.confirmPassword)
      formErrors.confirmPassword = "Passwords do not match";
    setErrors(formErrors);

    return Object.keys(formErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate the form
    if (!validateForm()) return;

    try {
      setLoading(true); // Start loading

      // Make a POST request to the API
      const response = await axios.post(`${API_URL}/api/signup`, {
        fullName: form.fullName,
        email: form.email,
        password: form.password,
      });

      // On successful response
      setSuccess("Signup successful! Welcome.");
      setErrorMessage("");
      setLoading(false); // Stop loading
      setForm({
        fullName: "",
        email: "",
        password: "",
        confirmPassword: "",
      }); // Reset the form

      setTimeout(() => {
        navigate("/")
      }, 1000);

    } catch (error) {
        console.log(error)
      // On error, handle the error message
      setLoading(false);
      if (error.response) {
        setErrorMessage(error.response.data.message || "Something went wrong!");
      } else {
        setErrorMessage("Network error, please try again later.");
      }
      setSuccess(""); // Clear success message if error occurs
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-purple-100 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-3xl shadow-2xl">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Create Account</h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-600">Full Name</label>
            <input
              type="text"
              name="fullName"
              value={form.fullName}
              onChange={handleChange}
              className={`mt-1 w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 ${errors.fullName ? "border-red-500" : "border-gray-300"}`}
              placeholder="John Doe"
            />
            {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className={`mt-1 w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 ${errors.email ? "border-red-500" : "border-gray-300"}`}
              placeholder="you@example.com"
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600">Password</label>
            <div className="relative">
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                className={`mt-1 w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 ${errors.password ? "border-red-500" : "border-gray-300"}`}
                placeholder="••••••••"
              />
              {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={form.confirmPassword}
              onChange={handleChange}
              className={`mt-1 w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 ${errors.confirmPassword ? "border-red-500" : "border-gray-300"}`}
              placeholder="••••••••"
            />
            {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}
          </div>

          {/* Show success message */}
        {success && <p className="text-green-500">{success}</p>}

        {/* Show error message */}
        {errorMessage && <p className="text-red-500">{errorMessage}</p>}

          <button
            type="submit"
            className="w-full py-2 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-all duration-300"
            disabled={loading} // Disable the button when loading
          >
            {loading ? "Signing Up..." : "Sign Up"}
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-6">
          Already have an account? <Link to="/" className="text-blue-600 hover:underline">Log In</Link>
        </p>
      </div>
    </div>
  );
};

export default SignupForm;
