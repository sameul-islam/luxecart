"use client";

import { useState } from "react";
import Link from "next/link";
import { GoEye } from "react-icons/go";
import { TbEyeOff } from "react-icons/tb";
import { IoIosLock } from "react-icons/io";
import { IoMail } from "react-icons/io5";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Login Submitted:", formData);
  };

  return (
    <main className="min-h-screen flex items-center justify-center  font-Outfit px-4">
      <div className="w-full max-w-md bg-white p-10 rounded-2xl shadow-lg hover:shadow-2xl transition duration-300">
        
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">Welcome Back</h1>
          <p className="text-gray-600">Log in to your LuxeCart account</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-8">
          
          {/* Email */}
          <div className="flex flex-col relative">
            <label htmlFor="email" className="text-gray-700 font-medium mb-2">
              Email
            </label>
            <div className="flex items-center border-b-2 border-gray-300 focus-within:border-gray-900 transition-all duration-300">
              <IoMail className="text-gray-400 w-5 h-5 mr-3" />
              <input
                type="email"
                name="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="your@email.com"
                className="w-full py-3 outline-none bg-transparent"
                required
              />
            </div>
          </div>

          {/* Password */}
          <div className="flex flex-col relative">
            <label htmlFor="password" className="text-gray-700 font-medium mb-2">
              Password
            </label>
            <div className="flex items-center border-b-2 border-gray-300 focus-within:border-gray-900 transition-all duration-300">
              <IoIosLock className="text-gray-400 w-5 h-5 mr-3" />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                id="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                className="w-full py-3 outline-none bg-transparent"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-gray-400 hover:text-gray-600 transition"
              >
                {showPassword ? <TbEyeOff className="w-5 h-5" /> : <GoEye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Forgot Password */}
          <div className="flex justify-end">
            <Link href="/forgot-password" className="text-sm text-gray-600 hover:text-gray-900 transition">
              Forgot password?
            </Link>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="bg-gray-900 text-white py-4 rounded-lg font-semibold hover:bg-gray-700 transition duration-300"
          >
            Log In
          </button>
        </form>

        {/* Bottom Section */}
        <p className="text-center text-gray-600 mt-8">
          Don’t have an account?{" "}
          <Link href="/signup" className="text-gray-900 font-semibold hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </main>
  );
};

export default LoginPage;
