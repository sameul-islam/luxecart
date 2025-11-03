
"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import { FiMinus, FiPlus } from "react-icons/fi";
import { HiPlusSm, HiMinusSm } from "react-icons/hi";
import { useRouter } from "next/navigation";
import { useShop } from "../../context/ShopContext"; 
import { BsCart3 } from "react-icons/bs";

type ProductAny = any; 

interface Props {
  product: ProductAny;
}

export default function ProductDetailsClient({ product }: Props) {
  const router = useRouter();
  const { addToCart } = (() => {
    try {
      return useShop();
    } catch {
      return { addToCart: (p: any) => console.warn("addToCart called:", p) };
    }
  })();

  const COLOR_MAP: Record<string, string> = {
  white: "#ffffff",
  black: "#000000",
  blue: "#2563eb",
  "light blue": "#60a5fa",
  green: "#16a34a",
  red: "#dc2626",
  gray: "#6b7280",
  grey: "#6b7280",
  brown: "#92400e",
  yellow: "#eab308",
  pink: "#ec4899",
}

function getColorHex(name: string) {
  const key = name.trim().toLowerCase()
  return COLOR_MAP[key] || key
}


  const [activeIndex, setActiveIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const imgWrapRef = useRef<HTMLDivElement | null>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);
  const [transformOrigin, setTransformOrigin] = useState("50% 50%");

  const [selectedSize, setSelectedSize] = useState<string | null>(product.sizes?.[0] ?? null);
  const [selectedColor, setSelectedColor] = useState<string | null>(product.colors?.[0] ?? null);
  const [quantity, setQuantity] = useState<number>(1);

  useEffect(() => {
    setActiveIndex(0);
    setSelectedSize(product.sizes?.[0] ?? null);
    setSelectedColor(product.colors?.[0] ?? null);
    setQuantity(1);
  }, [product?.id]);

  function onMouseMove(e: React.MouseEvent) {
    if (!imgWrapRef.current) return;
    const rect = imgWrapRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setTransformOrigin(`${x}% ${y}%`);
  }

  function onTouchStart() {
    setIsZoomed((v) => !v);
  }


  function increment() {
    const max = product.stock ?? 9999;
    setQuantity((q) => (q < max ? q + 1 : q));
  }
  function decrement() {
    setQuantity((q) => (q > 1 ? q - 1 : 1));
  }


  function handleAddToCart() {

    const cartItem = {
      ...product,
      selectedSize,
      selectedColor,
      quantity,
    };


    addToCart(cartItem as any);
  }

  function handleBuyNow() {
    handleAddToCart();
    router.push(""); //   page link       Ex: /cart or /checkout
  }


  const [openInfo, setOpenInfo] = useState(false);
  const [openReturn, setOpenReturn] = useState(false);
  const [openShipping, setOpenShipping] = useState(false);

  return (
    <div className="max-w-6xl mt-30 mx-auto px-4 md:px-8 py-10">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
        {/* LEFT: IMAGE VIEWER */}
        <div className="space-y-4">
          <div
            ref={imgWrapRef}
            onMouseMove={onMouseMove}
            onMouseEnter={() => setIsZoomed(true)}
            onMouseLeave={() => setIsZoomed(false)}
            onTouchStart={onTouchStart}
            className="relative w-full bg-[#dfe6e9] cursor-zoom-in  overflow-hidden border border-gray-400 "
            style={{ height: "620px" }}
          >
            {/* main image - using Next/Image via layout 'fill' behaviour */}
            <div className="w-full h-full">
              <Image
                src={product.images[activeIndex]}
                alt={product.name}
                fill
                style={{
                  objectFit: "contain",
                  transformOrigin,
                  transform: isZoomed ? "scale(1.9)" : "scale(1)",
                  transition: "transform 350ms ease, transform-origin 0s",
                }}
                className="select-none"
              />
            </div>

            {/* small overlay note */}
            <div className="absolute bottom-3 right-3 bg-black/60 text-white hidden md:flex text-xs px-3 py-1 rounded-md">
              {isZoomed ? "Zoomed — move your mouse" : "Hover to zoom"}
            </div>
          </div>

          {/* thumbnails */}
          <div className="flex items-center gap-3">
            {product.images?.map((img: any, i: number) => (
              <button
                key={i}
                onClick={() => setActiveIndex(i)}
                className={`w-20 h-20 bg-[#dfe6e9]/70 object-contain overflow-hidden border ${
                  i === activeIndex ? "border-black" : "border-gray-300"
                }`}
              >
                <Image
                  src={img}
                  alt={product.name + " thumb " + i}
                  width={80}
                  height={80}
                  style={{ objectFit: "contain" }}
                />
              </button>
            ))}
          </div>

          {/* short description */}
          <div className="text-gray-700">
            <p className="text-sm leading-relaxed">
              {product.description ||
                "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tempora, dolore."}
            </p>
          </div>
        </div>

        {/* RIGHT: DETAIL / BUY PANEL */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-semibold text-gray-900">{product.name}</h1>
            <div className="mt-2 flex items-center gap-3">
              {product.discountPrice ? (
                <>
                  <span className="text-2xl font-bold">${product.discountPrice}</span>
                  <span className="text-gray-400 line-through">${product.price}</span>
                  <span className="text-sm text-green-600">Save {Math.round(((product.price - (product.discountPrice ?? product.price))/product.price)*100)}%</span>
                </>
              ) : (
                <span className="text-2xl font-bold">${product.price}</span>
              )}
            </div>
          </div>

          {/* sizes */}
          <div>
            <h4 className="text-md font-medium text-gray-700 mb-2">Size</h4>
            <div className="flex gap-2 flex-wrap">
              {(product.sizes ?? []).map((s: string) => {
                const active = selectedSize === s;
                return (
                  <button
                    key={s}
                    onClick={() => setSelectedSize(s)}
                    className={`px-3 py-1.5 border border-black text-sm ${
                      active ? "bg-black text-white" : "bg-white text-black border-gray-300"
                    }`}
                  >
                    {s}
                  </button>
                );
              })}
            </div>
          </div>

          {/* colors */}
          <div>
            <h4 className="text-md font-medium text-gray-700 mb-2">Color</h4>
            <div className="flex items-center gap-3">
              {(product.colors ?? []).map((c: string) => {
                const active = selectedColor === c;
                const hex = getColorHex(c)
                const isWhite = hex === "#ffffff" || hex === "White" 
                return (
                  <button
                    key={c}
                    onClick={() => setSelectedColor(c)}
                    title={c}
                    className={`w-8 h-8 rounded-full border flex items-center justify-center ${
                      active ? "ring-2 ring-black " : "border-gray-700"
                    }`}
                    style={{ backgroundColor: isWhite ? "#ffffff" : hex, }}
                  >
                    {/* white color needs inner dot to see */}
                    {c.toLowerCase() === "white" && (
                      <span className={`${active ? "bg-black" : "bg-gray-300"} w-3 h-3 rounded-full`} />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* quantity + add to cart */}
          <div className="flex  items-center gap-2 sm:gap-4">
            <div className="flex items-center gap-2 border px-2">
              <button onClick={decrement} aria-label="Decrease" className="p-2">
                <HiMinusSm size={18} />
              </button>
              <div className="px-3 text-sm font-medium">{quantity}</div>
              <button onClick={increment} aria-label="Increase" className="p-2">
                <HiPlusSm size={18} />
              </button>
            </div>

            <div className="flex-1 flex gap-1.5 sm:gap-3">
              <button
                onClick={handleAddToCart}
                className="flex-1 px-4 sm:px-6 py-2 sm:py-3 bg-black text-white text-sm font-medium flex items-center justify-center hover:bg-gray-900 transition"
              >
              <span className="hidden sm:block">Add to Cart</span> <BsCart3 className="block sm:hidden text-xl font-bold text-white"/>
              </button>
              <button
                onClick={handleBuyNow}
                className="px-6 py-3 border border-black  text-sm font-medium hover:bg-black hover:text-white transition"
              >
                Buy Now
              </button>
            </div>
          </div>

          {/* Accordions */}
          <div className="space-y-3">
            {/* Product Info */}
            <div className="border-b border-gray-400">
              <button
                onClick={() => setOpenInfo((v) => !v)}
                aria-expanded={openInfo}
                className="w-full flex items-center justify-between py-3 px-4 "
              >
                <span className="font-medium">Product Info</span>
                <span>{openInfo ? <AiOutlineMinus /> : <AiOutlinePlus />}</span>
              </button>
              <div
                className={`overflow-hidden transition-[max-height] duration-300`}
                style={{ maxHeight: openInfo ? "280px" : "0px" }}
              >
                <div className="p-4 text-sm text-gray-700">
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quisquam,
                    distinctio. Amet, doloremque. Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ipsa exercitationem dolores voluptas iure placeat. (This area is product info — put your real copy here.)
                  </p>
                </div>
              </div>
            </div>

            {/* Return & Refund */}
            <div className="border-b border-gray-400">
              <button
                onClick={() => setOpenReturn((v) => !v)}
                aria-expanded={openReturn}
                className="w-full flex items-center justify-between py-3 px-4 "
              >
                <span className="font-medium">Return & Refund Policy</span>
                <span>{openReturn ? <AiOutlineMinus /> : <AiOutlinePlus />}</span>
              </button>
              <div
                className={`overflow-hidden transition-[max-height] duration-300`}
                style={{ maxHeight: openReturn ? "280px" : "0px" }}
              >
                <div className="p-4 text-sm text-gray-700">
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloribus, velit. Lorem ipsum dolor, sit amet consectetur adipisicing elit. Assumenda aperiam praesentium animi.
                    (Return & refund policy details go here.)
                  </p>
                </div>
              </div>
            </div>

            {/* Shipping Info */}
            <div className="border-b border-gray-400">
              <button
                onClick={() => setOpenShipping((v) => !v)}
                aria-expanded={openShipping}
                className="w-full flex items-center justify-between py-3 px-4"
              >
                <span className="font-medium">Shipping Info</span>
                <span>{openShipping ? <AiOutlineMinus /> : <AiOutlinePlus />}</span>
              </button>
              <div
                className={`overflow-hidden transition-[max-height] duration-300`}
                style={{ maxHeight: openShipping ? "280px" : "0px" }}
              >
                <div className="p-4 text-sm text-gray-700">
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque,
                    quidem. Lorem, ipsum dolor sit amet consectetur adipisicing elit. Esse dolorem veritatis aliquid quidem. (Shipping timelines, rates, and policies.)
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* extra small note */}
          <div className="text-xs text-gray-500">
            <p>Stock: {product.stock ?? "—"}. SKU: {product.id}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
