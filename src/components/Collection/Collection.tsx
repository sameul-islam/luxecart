"use client";
import Image from "next/image";
import men1 from "../../../public/assets/showcaseboy1.png";
import men2 from "../../../public/assets/showcaseboy2.png";
import women1 from "../../../public/assets/showcasegirl1.png";
import women2 from "../../../public/assets/showcasegirl2.png";
import kids1 from "../../../public/assets/showcasekids1.png";
import kids2 from "../../../public/assets/showcasekids2.png";
import Link from "next/link";

const Collection = () => {
  const categories = [
    {
      title: "Men's Collection",
      imageDefault: men1,
      imageHover: men2,
      link:'/products?category=Men'
    },
    {
      title: "Women's Collection",
      imageDefault: women1,
      imageHover: women2,
      link:'/products?category=Women'
    },
    {
      title: "Kid's Collection",
      imageDefault: kids1,
      imageHover: kids2,
      link:'/products?category=Kids'
    },
  ];

  return (
    <section className="bg-[#f8f8f8] py-20 px-6 md:px-20 font-Outfit">
      {/* Title */}
      <div className=" mb-12">
        <div className="text-3xl md:text-5xl font-semibold text-gray-700 flex items-center gap-2">
          Explore Our Collections <div className="h-0.5 bg-gray-600 w-40 mt-3"></div>
        </div>
        <p className="text-gray-500 mt-2 text-sm md:text-base">
          Handpicked styles curated for everyone
        </p>
      </div>

      {/* Grid */}

      <div className=" max-w-5xl md:max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
        {categories.map((cat, index) => (
          <Link
           href={cat.link}
            key={index}
            className="relative group overflow-hidden cursor-pointer"
          >
            {/* Default Image */}
            <Image
              src={cat.imageDefault}
              alt={cat.title}
              className="object-contain bg-[#dfe6e9] w-full h-[450px] sm:h-[650px] md:h-[600px] transition-opacity duration-700 ease-in-out group-hover:opacity-0"
            />

            {/* Hover Image */}
            <Image
              src={cat.imageHover}
              alt={cat.title}
              className="object-contain bg-[#dfe6e9] w-full h-[450px] sm:h-[650px] md:h-[600px] absolute top-0 left-0 transition-opacity duration-700 ease-in-out opacity-0 group-hover:opacity-100"
            />
            

            {/* Overlay Quick View */}
            <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white py-6 translate-y-full group-hover:translate-y-0 transition-all duration-500 ease-in-out">
              <h3 className="text-lg font-medium text-center">
                {cat.title}
              </h3>
              <button className="block mx-auto mt-3 border border-white px-6 py-2 text-sm hover:bg-white hover:text-black transition">
                Quick View
              </button>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default Collection;
