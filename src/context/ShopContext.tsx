// "use client"
// import React, { createContext, useState, ReactNode } from 'react'
// import all_product from '../../public/all_product'

// interface Product {
//   id: number
//   name: string
//   new_price: number
//   [key: string]: any
// }

// interface CartItems {
//   [key: number]: number
// }

// interface ShopContextType {
//   cartItems: CartItems
//   addToCart: (itemId: number) => void
//   removeFromCart: (itemId: number) => void
//   getTotalCartAmount: () => number
//   getTotalCartItems: () => number
//   all_product: Product[]
// }

// export const ShopContext = createContext<ShopContextType | null>(null)

// interface Props {
//   children: ReactNode
// }

// const getDefaultCart = (): CartItems => {
//   const cart: CartItems = {}
//   for (let index = 0; index < all_product.length; index++) {
//     cart[all_product[index].id] = 0
//   }
//   return cart
// }

// const ShopContextProvider: React.FC<Props> = ({ children }) => {
//   const [cartItems, setCartItems] = useState<CartItems>(getDefaultCart())

//   const addToCart = (itemId: number) => {
//     setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }))
//   }

//   const removeFromCart = (itemId: number) => {
//     setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }))
//   }

//   const getTotalCartAmount = (): number => {
//     let totalAmount = 0
//     for (const item in cartItems) {
//       if (cartItems[item] > 0) {
//         const itemInfo = all_product.find((product) => product.id === Number(item))
//         if (itemInfo) totalAmount += itemInfo.new_price * cartItems[item]
//       }
//     }
//     return totalAmount
//   }

//   const getTotalCartItems = (): number => {
//     let totalItems = 0
//     for (const item in cartItems) {
//       if (cartItems[item] > 0) {
//         totalItems += cartItems[item]
//       }
//     }
//     return totalItems
//   }

//   const contextValue: ShopContextType = {
//     cartItems,
//     addToCart,
//     removeFromCart,
//     getTotalCartAmount,
//     getTotalCartItems,
//     all_product,
//   }

//   return <ShopContext.Provider value={contextValue}>{children}</ShopContext.Provider>
// }

// export default ShopContextProvider
