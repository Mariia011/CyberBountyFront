import React from "react";
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import { useNavigate } from "react-router-dom";
import loginSchema from "../schemas/LoginSchema"; // Import your Joi validation schema

const LoginPage: React.FC = () => {
  const navigate = useNavigate();

  // Use react-hook-form with Joi resolver
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: joiResolver(loginSchema), // Use Joi schema for validation
  });

  const onSubmit = (data: any) => {
    // Mock authentication logic: Replace with your actual API logic
    if ((data.usernameOrEmail === "vle123" || data.usernameOrEmail === "vle@gmail.com")&& data.password === "password123") {
      navigate("/upload"); // Redirect to the upload page upon successful login
    } else {
      alert("Invalid username or password"); // Show error for failed authentication
    }
  };

  return (
    <div className="flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium" htmlFor="usernameOrEmail">
              Username or Email
            </label>
            <input
              type="text"
              id="usernameOrEmail"
              {...register("usernameOrEmail")} // Bind input field to Joi schema
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.usernameOrEmail && (
              <p className="text-red-500 text-sm">{errors.usernameOrEmail.message as string}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              {...register("password")} // Bind password field to Joi schema
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message as string}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-150 ease-in-out"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
