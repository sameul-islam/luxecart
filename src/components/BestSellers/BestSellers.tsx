"use client";
import Image from "next/image";
import { MdFavoriteBorder } from "react-icons/md";
import product1a from "../../../public/assets/bestsellers/dress1.png";
import product1b from "../../../public/assets/bestsellers/dress2.png";
import product2a from "../../../public/assets/bestsellers/ladypants1.png";
import product2b from "../../../public/assets/bestsellers/ladypants2.png";
import product3a from "../../../public/assets/bestsellers/skirt1.png";
import product3b from "../../../public/assets/bestsellers/skirt2.png";
import product4a from "../../../public/assets/bestsellers/woment-shirt1.png";
import product4b from "../../../public/assets/bestsellers/woment-shirt2.png";
import product5a from "../../../public/assets/bestsellers/ment-shirt1.png";
import product5b from "../../../public/assets/bestsellers/ment-shirt2.png";
import product6a from "../../../public/assets/bestsellers/boypants1.png";
import product6b from "../../../public/assets/bestsellers/boypants2.png";
import Link from "next/link";

const BestSellers = () => {
  const products = [
    {
      name: "Classic Dress",
      price: "$89.00",
      imgDefault: product1a,
      imgHover: product1b,
    },
    {
      name: "Elegant lady-pants",
      price: "$87.00",
      imgDefault: product2a,
      imgHover: product2b,
    },
    {
      name: "Elegant Skirt",
      price: "$59.00",
      imgDefault: product3a,
      imgHover: product3b,
    },
    {
      name: "women's T-shirt",
      price: "$34.00",
      imgDefault: product4a,
      imgHover: product4b,
    },
    {
      name: "Men's T-shirt",
      price: "$76.00",
      imgDefault: product5a,
      imgHover: product5b,
    },
    {
      name: "Men's pants",
      price: "$69.00",
      imgDefault: product6a,
      imgHover: product6b,
    },
  ];

  return (
    <section className="bg-[#f8f8f8] py-20 px-6 md:px-20 font-Outfit">
      {/* Section Title */}
      <div className="mb-12">
        <div className="text-3xl md:text-5xl font-semibold text-gray-700 flex items-center gap-2">
          Our Best Sellers <div className="h-0.5 bg-gray-600 w-40 mt-3"></div>
        </div>
        <p className="text-gray-500 mt-2 text-sm md:text-base">
          Most loved styles of the season
        </p>
      </div>

      {/* Product Grid */}
      <div className="max-w-7xl lg:max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10">
        {products.map((product, index) => (
          <div
            key={index}
            className="group  relative overflow-hidden cursor-pointer   transition-all duration-500"
          >
            {/* Default Image */}
            <Link href='/products' >
            <Image
              src={product.imgDefault}
              alt={product.name}
              className="w-full h-[430px] sm:h-[550px] md:h-[620px] object-contain bg-[#dfe6e9] transition-opacity duration-700 ease-in-out group-hover:opacity-0"
            />

            {/* Hover Image */}
            <Image
              src={product.imgHover}
              alt={product.name}
              className="absolute top-0 left-0 w-full h-[430px] sm:h-[550px] md:h-[620px] bg-[#dfe6e9] object-contain opacity-0 transition-opacity duration-700 ease-in-out group-hover:opacity-100"
            />
            </Link>

            {/* Quick View */}
            {/* <div className="absolute bottom-0 left-0 right-0   py-2 translate-y-full group-hover:translate-y-0 transition-all duration-500 ease-in-out z-20">
              <button className="block mx-auto bg-black/80 text-white border border-white px-6 py-2 text-sm hover:bg-black transition z-30">
                Quick View
              </button>
            </div> */}

            {/* Product Info */}
            <div className="flex justify-between items-center px-4 py-4">
              <div>
                <h3 className="text-gray-800 font-medium text-lg">
                  {product.name}
                </h3>
                <p className="text-gray-500 text-sm mt-1">{product.price}</p>
              </div>
              <button className="text-gray-600 hover:text-[#733e0a] transition">
                <MdFavoriteBorder size={22} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default BestSellers;
