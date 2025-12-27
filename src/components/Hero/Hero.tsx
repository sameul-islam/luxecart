
"use client";

import Image from "next/image";
import bgImage from "../../../public/assets/hero_bg.jpg"; 


const Hero: React.FC = () => {

  return (
    <section className="relative flex flex-col-reverse xl:flex-row items-center justify-between px-6 md:px-20 py-10 md:py-16 overflow-hidden">
      {/* 🔹 Background Image */}
      <div className=" h-[350px] md:h-[700px]">
      <Image
        src={bgImage}
        alt="Background"
        fill
        priority
        className="object-cover" 
      />
      </div>
    </section>
  );
};

export default Hero;
