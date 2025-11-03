"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import img1 from "../../../public/assets/newsletter1.png";
import img2 from "../../../public/assets/newsletter2.png";
import img3 from "../../../public/assets/newsletter3.png";

const NewsletterBanner = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const images = [img1, img2, img3];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="bg-[#dfe6e9]/40 py-20 px-6 md:px-20 font-Outfit">
      <div className="max-w-7xl px-5 mx-auto flex flex-col lg:flex-row items-center gap-10 md:gap-20">
        
        {/* Left Side - Subscription */}
        <div className=" flex flex-col items-start text-left space-y-6">
          <h2 className="text-3xl  md:text-5xl px-5 font-semibold text-gray-800 whitespace-nowrap">
            Join Our Newsletter
          </h2>
          <p className="text-gray-500  md:text-lg">
            Subscribe now and get exclusive offers, new arrivals, and updates.
          </p>
          <div className="flex gap-1 md:gap-3  w-full ">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-3 md:px-6 py-2 md:py-3 border border-gray-500 rounded-l-md focus:outline-none focus:ring-2 focus:ring-[#52525c]"
            />
            <button className="px-3 md:px-6 py-2 md:py-3 bg-black text-white font-medium rounded-r-md hover:bg-[#52525c] transition">
              Subscribe
            </button>
          </div>
        </div>

        {/* Right Side - Rotating Images */}
        <div className="flex  rounded-xs relative w-full h-[420px] md:h-[450px] lg:h-[500px]">
          {images.map((img, index) => (
            <Image
              key={index}
              src={img}
              alt={`Newsletter Image ${index + 1}`}
              fill
               sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 400px"
               style={{ objectFit: "contain" }}
              className={`object-contain transition-opacity duration-1000 ease-in-out ${
                index === currentImage ? "opacity-100 z-10" : "opacity-0"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default NewsletterBanner;
