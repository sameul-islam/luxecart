
"use client";

import Image from "next/image";
import Link from "next/link";
import heroImage1 from "../../../public/assets/hero_img1.png";
import heroImage2 from "../../../public/assets/hero_img2.png";
import heroImage3 from "../../../public/assets/hero_img3.png";
import heroImage4 from "../../../public/assets/hero_img4.png";
import heroImage5 from "../../../public/assets/hero_img5.png";
import bgImage from "../../../public/assets/hero_bg.jpg"; 

import { useEffect, useState } from "react";

const Hero: React.FC = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const images = [heroImage1, heroImage2, heroImage3, heroImage4, heroImage5];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative text-black flex flex-col-reverse xl:flex-row items-center justify-between px-6 md:px-20 py-10 md:py-16 overflow-hidden">
      {/* 🔹 Background Image */}
      <Image
        src={bgImage}
        alt="Background"
        fill
        priority
        className="object-cover opacity-30" 
      />

  
      <div className="absolute inset-0 bg-[#95afc0]/20"></div>

      {/* 🔹 Content Section */}
      <div className="relative flex-1 flex flex-col items-center md:items-start text-center md:text-left font-Outfit space-y-5 z-10">
        <h2 className="text-black/60 text-lg md:text-xl font-semibold">
          Best Deals || Best Prices
        </h2>

        <div className="flex items-center justify-center md:justify-start gap-4">
          <h3 className="text-3xl md:text-6xl font-light">New</h3>
          <div className="w-20 md:w-[100px] h-0.5 bg-black"></div>
        </div>

        <h1 className="text-5xl md:text-7xl font-semibold leading-tight">
          Collections
        </h1>
        <h1 className="text-5xl md:text-7xl font-semibold leading-tight">
          For Everyone
        </h1>

        <Link href="/products">
          <button className="px-8 py-3 border border-black text-lg font-medium rounded-sm hover:bg-black hover:text-white transition duration-300 mt-6">
            SHOP NOW
          </button>
        </Link>
      </div>

      {/* 🔹 Image Slider Section */}
      <div className="relative flex-1 flex items-center justify-center mt-6 mb-10 md:mb-0 z-10">
        <div className="relative w-[360px] h-[360px] sm:w-[380px] sm:h-[380px] md:w-[700px] md:h-[700px]">
          {images.map((img, index) => (
            <Image
              key={index}
              src={img}
              alt="Hero Image"
              fill
              priority
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 650px"
              style={{ objectFit: "contain" }}
              className={`object-contain absolute transition-opacity duration-1000 ease-in-out ${
                index === currentImage ? "opacity-100 z-10" : "opacity-0"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
