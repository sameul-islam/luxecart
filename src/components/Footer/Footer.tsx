"use client";
import Image from "next/image";
import Link from "next/link";
import { FaFacebookF, FaInstagram, FaTwitter, FaArrowUp } from "react-icons/fa";
import logo from "../../../public/assets/logo.png";


const Footer = () => {
 
  return (
    <footer className="bg-[#dfe6e9] text-gray-700 font-Outfit relative">
      <div className="max-w-7xl mx-auto px-4 md:px-20 py-16 grid grid-cols-1 md:grid-cols-4 gap-12">
        {/* Brand */}
        <div>
          <Link href='/' className="flex items-center gap-2 mb-4">
            <Image src={logo} alt="LUXECART Logo" width={45} height={45} style={{ height: "auto", width: "auto"}} />
            <h2 className="text-xl font-semibold text-gray-800">LUXECART.</h2>
          </Link>
          <p className="text-sm text-gray-500 leading-relaxed">
            Your trusted destination for timeless fashion and modern style.
          </p>
          <div className="flex gap-4 mt-5">
            <a href="#" className="hover:text-gray-700"><FaFacebookF /></a>
            <a href="#" className="hover:text-gray-700"><FaInstagram /></a>
            <a href="#" className="hover:text-gray-700"><FaTwitter /></a>
          </div>
        </div>
       
        {/* Shop */}
        <div>
          <h3 className="text-gray-900 text-lg font-medium mb-4">Shop</h3>
          <ul className="space-y-2 text-sm">
            <li><Link href="/products?category=Men" className=" hover:text-gray-800">Men's</Link></li>
            <li><Link href="/products?category=Women" className="hover:text-gray-800">Women's</Link></li>
            <li><Link href="/products?category=Kids" className="hover:text-gray-800">Kids</Link></li>
            <li><Link href="/products" className="hover:text-gray-800">All Products</Link></li>
          </ul>
        </div>

        {/* Company */}
        <div>
          <h3 className="text-gray-800 text-lg font-medium mb-4">Company</h3>
          <ul className="space-y-2 text-sm">
            <li><Link href="/about" className="hover:text-gray-800">About Us</Link></li>
            <li><Link href="/contact" className="hover:text-gray-800">Contact</Link></li>
            <li><Link href="/privacy" className="hover:text-gray-800">Privacy Policy</Link></li>
            <li><Link href="/terms" className="hover:text-gray-800">Terms & Conditions</Link></li>
          </ul>
        </div>

        {/* Help */}
        <div>
          <h3 className="text-gray-800 text-lg font-medium mb-4">Help & Support</h3>
          <ul className="space-y-2 text-sm">
            <li><Link href="/faq" className="hover:text-gray-800">FAQs</Link></li>
            <li><Link href="/returns" className="hover:text-gray-800">Returns</Link></li>
            <li><Link href="/shipping" className="hover:text-gray-800">Shipping Info</Link></li>
            <li><Link href="/tracking" className="hover:text-gray-800">Order Tracking</Link></li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-500 w-[80%]  mx-auto py-6 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} LUXECART. All rights reserved.
      </div>

    </footer>
  );
};

export default Footer;
