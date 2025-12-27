"use client"
import { useState, FC, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import logo from '../../../public/assets/logo.png'
import cartIcon from '../../../public/assets/cart_icon.png'
import { FaUserLarge } from 'react-icons/fa6'
import { MdFavorite } from 'react-icons/md'
import { BiMenu, BiSearch, BiX } from 'react-icons/bi'
import { useShop } from '@/app/context/ShopContext'
import DrawerCart from '../DrawerCart'
import SearchOverlay from '../SearchOverlay'



const Navbar: FC = () => {
  const [menu, setMenu] = useState<'home' | 'men' | 'women' | 'kid' | 'shop' | 'about' | 'contact'>('home');
  const [scrolled, setScrolled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const { cartCount } = useShop();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  },[]);


  const menuItems = [
    { name: 'HOME', key: 'home', href: '/' },
    { name: "MEN'S", key: 'men', href: '/products?category=Men' },
    { name: "WOMEN'S", key: 'women', href: '/products?category=Women' },
    { name: "KID'S", key: 'kid', href: '/products?category=Kids' },
    { name: 'SHOP', key: 'shop', href: '/products' },
    { name: 'ABOUT', key: 'about', href: '/about' },
    { name: 'CONTACT', key: 'contact', href: '/contact' },
  ] as const;

  return (
    <nav 
    className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled ? "bg-white shadow-md" : "bg-white/60"}`}
    >
    <div className="flex justify-between items-center px-6 md:px-20 py-4 font-Outfit ">
      
      {/* Mobile Hamburger */}
      <div className='flex xl:hidden items-center gap-4'>
        <button onClick={() => setDrawerOpen(true)}
          className='text-black text-3xl flex items-center'
        >
        <BiMenu/> <span className='hidden md:flex text-sm'>MENU.</span>
        </button>
      </div>
      

      {/* Logo */}
      <div>
        <Link href="/" className='flex items-center md:gap-0.5 cursor-pointer'>
        <Image src={logo} alt="Logo" width={50} height={50} style={{ height: "auto", width: "auto"}} />
        <p className="sm:text-xl text-md font-semibold text-gray-700 hover:text-gray-900">LUXECART.</p>
        </Link>
      </div>

      {/* Desktop Menu */}
      <ul className="hidden xl:flex items-center gap-12 text-gray-800 text-sm ">
        {menuItems.map((item) => (
          <li
            key={item.key}
            onClick={() => setMenu(item.key)}
            className={`cursor-pointer ${menu === item.key ? "text-[#733e0a] font-medium" : "text-gray-800 hover:text-[#733e0a]"}`}
          >
            <Link href={item.href}>{item.name}</Link>
          </li>
        ))}
      </ul>

      {/* Right Icons */}
      <div className="flex px-4 items-center gap-5 relative">
        <div onClick={() => setSearchOpen(true)} className=' cursor-pointer'>
          <BiSearch size={24} className='hover:text-[#733e0a]'/>
        </div>
        <Link href="/login">
          <FaUserLarge className='hover:text-[#733e0a]'/>
        </Link>
        <div  className='hidden md:flex'>
        <MdFavorite size={20} className='hover:text-[#733e0a]'/>
        </div>
        <div onClick={() => setCartOpen(true)} className="relative cursor-pointer">
          <Image src={cartIcon} alt="Cart" width={24} height={24} />
          <div className="absolute -top-3 -right-2 hover:-top-3 hover:bg-[#733e0a] h-5 w-5 rounded-full bg-black text-white text-xs flex items-center justify-center">
           {cartCount}
          </div>
        </div>
      </div>
    </div>

     {/* Mobile Drawer */}
     <div
     className={`fixed top-0 left-0 h-full w-64 sm:w-80 bg-white shadow-lg z-50 transform transition-transform duration-300 ${drawerOpen ? "translate-x-0" : "-translate-x-full"}`}
     >
      <div className='flex justify-between items-center px-6 py-4 border-b border-gray-200'>
        <h2 className='text-md font-semibold'>MENU</h2>
        <button onClick={() => setDrawerOpen(false)} className='text-3xl'>
          <BiX/>
        </button>
      </div>

      <ul className='flex flex-col mt-4 gap-6 px-6'>
        {menuItems.map((item) => (
          <li
          key={item.key}
          onClick={() => {setMenu(item.key); setDrawerOpen(false);}}
          className={`cursor-pointer transition-all duration-300 ${menu === item.key ? "text-[#733e0a] font-medium" : "text-gray-800 hover:text-[#733e0a]"}`}
          >
         <Link href={item.href}>{item.name}</Link>
          </li>
        ))}
      </ul>

      <div className="flex items-center px-4 mt-10 pt-5 border-t border-gray-200 gap-5 relative">
        <Link href="/login">
          <FaUserLarge className='hover:text-[#733e0a]'/>
        </Link>
        <Link href='/favorite' >
        <MdFavorite size={20} className='hover:text-[#733e0a]'/>
        </Link>
        <div onClick={() => setCartOpen(true)} className="relative cursor-pointer">
          <Image src={cartIcon} alt="Cart" width={24} height={24} />
          <div className="absolute -top-3 -right-2 hover:-top-3 hover:bg-[#733e0a] h-5 w-5 rounded-full bg-black text-white text-xs flex items-center justify-center">
          {cartCount}
          </div>
        </div>
      </div>

     </div>

     {/* Overlay */}
     {drawerOpen && (
      <div className='fixed inset-0 bg-black/30 z-40' onClick={() => setDrawerOpen(false)}>
      
      </div>
     )}

<DrawerCart open={cartOpen} onClose={() => setCartOpen(false)} />

{/* Search Overlay */}
<SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />

    </nav>
    
  )
}

export default Navbar


