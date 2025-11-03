"use client";
import Image from "next/image";
import heroImg1 from "../../../public/assets/about_hero1.jpg";
import heroImg2 from "../../../public/assets/about_hero2.jpg";
import missionImg from "../../../public/assets/about_mission.jpg";
import visionImg from "../../../public/assets/about_vision.jpg";
import team1 from "../../../public/assets/team1.jpg";
import team2 from "../../../public/assets/team2.jpg";
import team3 from "../../../public/assets/team3.jpg";
import { TbTruckDelivery } from "react-icons/tb";
import { MdWorkspacePremium } from "react-icons/md";
import { FaMobileRetro } from "react-icons/fa6";

const page = () => {
  return (
    <main className="font-Outfit mt-30 min-h-screen">
      
  {/* Hero Section */}
<section className="relative w-full h-[600px] md:h-[700px] lg:h-[800px] flex overflow-hidden">
  {/* Left Image */}
  <div className="relative w-1/2 h-full overflow-hidden group">
    <Image
      src={heroImg1}
      alt="About Hero Left"
      fill
      style={{ objectFit: "cover" }}
      className="transform transition-transform duration-700 ease-in-out group-hover:scale-105"
    />
  </div>

  {/* Right Image */}
  <div className="relative w-1/2 h-full overflow-hidden group">
    <Image
      src={heroImg2}
      alt="About Hero Right"
      fill
      style={{ objectFit: "cover" }}
      className="transform transition-transform duration-700 ease-in-out group-hover:scale-105"
    />
  </div>

  {/* Overlay Text */}
  <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-6">
    <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
      About LuxeCart
    </h1>
    <p className="text-white max-w-2xl text-lg md:text-xl">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis nec
      vestibulum magna, et dapibus lacus.
    </p>
  </div>
</section>


      {/* Mission & Vision */}
      <section className="py-20 px-6 md:px-20 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Mission */}
        <div className="flex flex-col gap-6">
          <h2 className="text-3xl font-semibold text-gray-800">Our Mission</h2>
          <p className="text-gray-600 text-lg">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
          <p className="text-gray-600 text-lg">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis nec vestibulum magna, et dapibus lacus.
          </p>
        </div>
        <div className="relative w-full h-96 md:h-[500px]">
          <Image 
            src={missionImg} 
            alt="Mission Image" 
            fill 
            style={{ objectFit: "cover" }} 
            className="rounded-xl shadow-lg"
          />
        </div>
      </section>

      <section className="py-20 px-6 md:px-20 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Vision */}
        <div className="relative w-full h-96 md:h-[500px] lg:order-2">
          <Image 
            src={visionImg} 
            alt="Vision Image" 
            fill 
            style={{ objectFit: "cover" }} 
            className="rounded-xl shadow-lg"
          />
        </div>
        <div className="flex flex-col gap-6 lg:order-1">
          <h2 className="text-3xl font-semibold text-gray-800">Our Vision</h2>
          <p className="text-gray-600 text-lg">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
          <p className="text-gray-600 text-lg">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis nec vestibulum magna, et dapibus lacus.
          </p>
        </div>
      </section>

      {/* Key Features */}
      <section className="py-20 px-6 md:px-20 bg-gray-50">
        <h2 className="text-3xl font-semibold text-gray-800 text-center mb-12">
          Why Choose Us
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 max-w-7xl mx-auto">
          {[
            { title: "Premium Quality", desc: "Lorem ipsum dolor sit amet consectetur.", icon: <MdWorkspacePremium size={40} />},
            { title: "Fast Shipping", desc: "Lorem ipsum dolor sit amet consectetur.", icon:<TbTruckDelivery size={40} /> },
            { title: "24/7 Support", desc: "Lorem ipsum dolor sit amet consectetur.", icon:<FaMobileRetro size={40} />},
          ].map((feature, idx) => (
            <div key={idx} className="flex flex-col items-center gap-4 text-center p-6 bg-white shadow-lg rounded-xl hover:shadow-2xl transition">
              <span className="text-4xl">{feature.icon}</span>
              <h3 className="text-xl font-semibold text-gray-800">{feature.title}</h3>
              <p className="text-gray-600">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 px-6 md:px-20">
        <h2 className="text-3xl font-semibold text-gray-800 text-center mb-12">Meet Our Team</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 max-w-7xl mx-auto">
          {[team1, team2, team3].map((team, idx) => (
            <div key={idx} className="relative w-full h-96 rounded-xl overflow-hidden shadow-lg group cursor-pointer">
              <Image src={team} alt={`Team member ${idx+1}`} fill style={{ objectFit: "cover" }} className="group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white text-center py-4">
                <h3 className="font-medium">Member Name</h3>
                <p className="text-sm">Position</p>
              </div>
            </div>
          ))}
        </div>
      </section>

    </main>
  )
}

export default page;
