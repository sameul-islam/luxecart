"use client";

import { useState } from "react";
import { IoMail } from "react-icons/io5";
import { FaMapMarkerAlt, FaMobileAlt } from "react-icons/fa";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  return (
    <main className="min-h-screen mt-30 font-Outfit py-20 px-6 md:px-20 ">
      

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 max-w-6xl mx-auto">
        
        {/* Contact Info */}
        <div className="flex flex-col gap-10 justify-center">
          <div className="flex items-center gap-6">
            <div className="bg-gray-800 text-white p-4 rounded-full">
              <IoMail className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800">Email Us</h3>
              <p className="text-gray-600">support@luxecart.com</p>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="bg-gray-800 text-white p-4 rounded-full">
              <FaMobileAlt className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800">Call Us</h3>
              <p className="text-gray-600">+1 (555) 234-5678</p>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="bg-gray-800 text-white p-4 rounded-full">
              <FaMapMarkerAlt className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800">Our Office</h3>
              <p className="text-gray-600">123 Luxury Avenue, New York, USA</p>
            </div>
          </div>
        </div>

        {/* Form */}
        <div className=" p-10  transition duration-300">
          <form onSubmit={handleSubmit} className="flex flex-col gap-10">
            
            {/* Name */}
            <div className="flex flex-col">
              <label htmlFor="name" className="text-gray-700 font-medium mb-2">
                Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your full name"
                className="border-b-2 border-gray-300 focus:border-gray-900 outline-none py-3 transition-all duration-300 bg-transparent"
                required
              />
            </div>

            {/* Email */}
            <div className="flex flex-col">
              <label htmlFor="email" className="text-gray-700 font-medium mb-2">
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="your@email.com"
                className="border-b-2 border-gray-300 focus:border-gray-900 outline-none py-3 transition-all duration-300 bg-transparent"
                required
              />
            </div>

            {/* Subject */}
            <div className="flex flex-col">
              <label htmlFor="subject" className="text-gray-700 font-medium mb-2">
                Subject
              </label>
              <input
                type="text"
                name="subject"
                id="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder="Subject"
                className="border-b-2 border-gray-300 focus:border-gray-900 outline-none py-3 transition-all duration-300 bg-transparent"
                required
              />
            </div>

            {/* Message */}
            <div className="flex flex-col">
              <label htmlFor="message" className="text-gray-700 font-medium mb-2">
                Message
              </label>
              <textarea
                name="message"
                id="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Write your message here..."
                rows={6}
                className="border-b-2 border-gray-300 focus:border-gray-900 outline-none py-3 transition-all duration-300 resize-none bg-transparent"
                required
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="bg-gray-900 text-white font-semibold py-4 rounded-lg hover:bg-gray-700 transition duration-300"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </main>
  );
};

export default ContactPage;
