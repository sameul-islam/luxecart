"use client";
import { useState } from "react";
import Image from "next/image";
import { useShop } from "@/app/context/ShopContext";
import { RiCloseLargeLine, RiDeleteBin6Line } from "react-icons/ri";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { GiShoppingCart } from "react-icons/gi";

const DrawerCart = ({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) => {
  const { cart, removeFromCart } = useShop();
  const [promoCode, setPromoCode] = useState("");
  const [quantities, setQuantities] = useState<Record<number, number>>({});

  const handleQuantityChange = (id: number, change: number) => {
    setQuantities((prev) => {
      const current = prev[id] || 1;
      const updated = Math.max(1, current + change);
      return { ...prev, [id]: updated };
    });
  };

  const estimatedTotal = cart.reduce((acc, item) => {
    const qty = quantities[item.id] || item.quantity || 1;
    const price = item.discountPrice ?? item.price;
    return acc + price * qty;
  }, 0);

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black/40 transition-opacity duration-300 ${
          open ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={onClose}
      />

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-[90%] sm:w-[400px] bg-white shadow-2xl z-50 transform transition-transform duration-500 ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex justify-between items-center px-6 py-4 border-b">
          <h2 className="text-lg font-semibold tracking-wide flex items-center gap-1.5">Your Cart <GiShoppingCart  size={22}/> </h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
            <RiCloseLargeLine size={22} />
          </button>
        </div>

        {/* Items */}
        <div className="flex flex-col gap-6 px-6 py-6 overflow-y-auto h-[60vh]">
          {cart.length === 0 ? (
            <p className="text-gray-500 text-center mt-10">
              Your cart is empty 🛒
            </p>
          ) : (
            cart.map((item) => {
              const price = item.discountPrice ?? item.price;
              const quantity = quantities[item.id] || item.quantity || 1;
              return (
                <div key={item.id} className="flex gap-4 items-center border-b pb-4">
                  <Image
                    src={item.images[0]}
                    alt={item.name}
                    width={70}
                    height={70}
                    className="rounded-md border"
                  />
                  <div className="flex-1">
                    <h3 className="text-sm font-medium">{item.name}</h3>
                    {item.selectedColor && (
                      <p className="text-xs text-gray-500">Color: {item.selectedColor}</p>
                    )}
                    {item.selectedSize && (
                      <p className="text-xs text-gray-500">Size: {item.selectedSize}</p>
                    )}
                    <p className="text-sm font-semibold mt-1">
                      ${price.toFixed(2)}
                    </p>

                    {/* Quantity controls */}
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() => handleQuantityChange(item.id, -1)}
                        className="border rounded-md w-6 h-6 flex items-center justify-center hover:bg-gray-100"
                      >
                        <AiOutlineMinus  />
                      </button>
                      <span className="text-sm font-medium">{quantity}</span>
                      <button
                        onClick={() => handleQuantityChange(item.id, 1)}
                        className="border rounded-md w-6 h-6 flex items-center justify-center hover:bg-gray-100"
                      >
                        <AiOutlinePlus  />
                      </button>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="ml-3 text-black hover:text-red-600"
                      >
                        <RiDeleteBin6Line size={22} />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Promo Code */}
        <div className="px-6 py-4 border-t">
          <label className="text-sm text-gray-600 font-medium">Promo Code</label>
          <div className="flex gap-2 mt-2">
            <input
              type="text"
              placeholder="Enter promo code"
              value={promoCode}
              onChange={(e) => setPromoCode(e.target.value)}
              className="w-full border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-gray-400"
            />
            <button className="px-4 py-2 bg-black text-white text-sm rounded-md hover:bg-gray-800">
              Apply
            </button>
          </div>
        </div>

        {/* Total + Checkout */}
        <div className="px-6 py-6 border-t bg-gray-50">
          <div className="flex justify-between mb-3">
            <span className="text-gray-700 font-medium">Estimated Total</span>
            <span className="text-gray-900 font-semibold">
              ${estimatedTotal.toFixed(2)}
            </span>
          </div>
          <button
            disabled={cart.length === 0}
            className={`w-full py-3 rounded-md font-semibold transition-all ${
              cart.length === 0
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-black text-white hover:bg-gray-800"
            }`}
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </>
  );
};

export default DrawerCart;
