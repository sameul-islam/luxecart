
"use client";

import React, { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { BiX } from "react-icons/bi";
import all_product, { Product } from "../../public/all_product";
import { useShop } from "@/app/context/ShopContext";

type SearchOverlayProps = {
  open: boolean;
  onClose: () => void;
};

const categories = ["Men", "Women", "Kids"];

export default function SearchOverlay({ open, onClose }: SearchOverlayProps) {
  const { searchTerm, setSearchTerm } = useShop();
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [typing, setTyping] = useState(false);


  const trending = useMemo(() => {
    return all_product.filter((p) => p.featured).slice(0, 12);
  }, []);


  useEffect(() => {
    setTyping(true);
    const q = (searchTerm ?? "").trim().toLowerCase();

    const id = setTimeout(() => {
      if (!q) {

        setFilteredProducts(
          activeCategory ? trending.filter((t) => t.category === activeCategory) : trending
        );
        setTyping(false);
        return;
      }

      const results = all_product.filter((p) => {

        const hay = [
          p.name,
          p.subCategory ?? "",
          p.description ?? "",
          (p.colors ?? []).join(" "),
        ]
          .join(" ")
          .toLowerCase();

        const matchesQuery = hay.includes(q);
        const matchesCategory = activeCategory ? p.category === activeCategory : true;
        return matchesQuery && matchesCategory;
      });

      setFilteredProducts(results);
      setTyping(false);
    }, 160); 

    return () => clearTimeout(id);
  }, [searchTerm, activeCategory, trending]);


  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    if (open) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed  inset-0 z-50 bg-white/95 backdrop-blur-md flex flex-col transition-opacity duration-200">
      {/* Header */}
      <div className=" w-full xl:w-7xl mx-auto flex items-center gap-4 px-6 py-4 border-b border-gray-500">
        <input
          autoFocus
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search products, categories, colors..."
          className="flex-1 border rounded-sm px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-gray-400"
        />
        <div className="flex items-center gap-3">
          <div className="text-sm text-gray-500 hidden sm:block">
            {typing ? "Searching…" : `${filteredProducts.length} results`}
          </div>
          <button
            onClick={onClose}
            aria-label="Close search"
            className="ml-2 p-2 hover:bg-gray-200 rounded-full"
          >
            <BiX size={24} />
          </button>
        </div>
      </div>

      {/* Category filters */}
      <div className="flex mx-auto gap-3 px-6 py-3 overflow-x-auto">
        {categories.map((c) => {
          const active = activeCategory === c;
          return (
            <button
              key={c}
              onClick={() => setActiveCategory(active ? null : c)}
              className={`px-4 py-2 rounded-full font-medium transition-colors whitespace-nowrap ${
                active ? "bg-black text-white" : "bg-gray-200 text-gray-800 hover:bg-gray-300"
              }`}
            >
              {c}
            </button>
          );
        })}
      </div>

      {/* Results area */}
      <div className="px-6 py-4 flex-1 overflow-y-auto">
        {filteredProducts.length === 0 ? (
          <div className="text-center mt-12 text-gray-600">
            {typing ? (
              <p>Searching products…</p>
            ) : (
              <>
                <p className="mb-3 text-lg">No products found</p>
                <p className="text-sm text-gray-500">Try different keywords or clear filters.</p>
              </>
            )}
          </div>
        ) : (
          <div className=" max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.map((item) => {
              const price = item.discountPrice ?? item.price;
              return (
                <Link
                  key={item.id}
                  href={`/product/${item.id}`}
                  className="block  overflow-hidden bg-gray-50"
                >
                  <div className=" flex items-center justify-center bg-[#dfe6e9]">
                    <Image
                      src={item.images[0]}
                      alt={item.name}
                      onClick={onClose}
                      width={320}
                      height={320}
                      className="w-40 h-32 sm:h-36 md:h-40 lg:h-44 object-contain p-4"
                    />
                  </div>

                  <div className="p-3">
                    <h3 className="text-sm font-medium text-gray-800 truncate">{item.name}</h3>
                    <p className="text-xs text-gray-500 mt-1">Category: {item.category}</p>
                    <div className="mt-2 flex items-center justify-between">
                      <div className="text-sm font-semibold text-gray-900">${price.toFixed(2)}</div>
                      {item.discountPrice && (
                        <div className="text-xs text-gray-500 line-through">${item.price.toFixed(2)}</div>
                      )}
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
