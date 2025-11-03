// components/products/ProductCard.tsx
"use client"
import Image from "next/image"
import { MdFavoriteBorder, MdFavorite } from "react-icons/md"
import { useState } from "react"
import type { Product } from "../../../../public/all_product"
import Link from "next/link"

interface Props {
  product: Product
}

export default function ProductCard({ product }: Props) {
  const [liked, setLiked] = useState(false)

  const front = product.images[0]
  const hoverImg = product.images[2] ?? product.images[0]

  return (
    <article className="group overflow-hidden">
      <div className="relative">
        {/* two images, swap on hover */}
        <div className="w-full h-[430px] sm:h-[470px] lg:h-[430px] bg-[#dfe6e9] overflow-hidden relative cursor-pointer">
          <Link href={`/product/${product.id}`}>
          <Image
            src={front}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            style={{ objectFit: "contain" }}
            className="object-contain  transition-opacity duration-500 ease-in-out group-hover:opacity-0"
            loading="lazy"
          />
          <Image
            src={hoverImg}
            alt={product.name + " - alt"}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            style={{ objectFit: "contain" }}
            className="object-contain absolute inset-0 opacity-0 transition-opacity duration-500 ease-in-out group-hover:opacity-100"
            loading="lazy"
          />
          </Link>
        </div>

        {/* small badges (optional) */}
        {product.discountPrice && (
          <div className="absolute top-3 left-3 bg-[#ffefea] text-[#b45309] text-xs font-medium px-2 py-1 rounded-md">
            -{Math.round(((product.price - product.discountPrice) / product.price) * 100)}%
          </div>
        )}
        {product.featured && (
          <div className="absolute top-3 right-3 bg-black/60 text-white text-xs font-medium px-2 py-1 rounded-md">
            Featured
          </div>
        )}
      </div>

      <div className="p-4 flex items-start justify-between gap-3">
        <div>
          <h3 className="text-sm md:text-base font-medium text-gray-700">{product.name}</h3>
          <div className="mt-1">
            {product.discountPrice ? (
              <div className="flex items-center gap-2">
                <span className="text-gray-500 line-through text-sm">${product.price}</span>
                <span className="text-gray-900 font-semibold">${product.discountPrice}</span>
              </div>
            ) : (
              <span className="text-gray-900 font-semibold">${product.price}</span>
            )}
          </div>
        </div>

        <button
          onClick={() => setLiked((v) => !v)}
          aria-label="wishlist"
          className="text-gray-600 hover:text-[#733e0a] transition"
        >
          {liked ? <MdFavorite size={22} className="text-[#733e0a]" /> : <MdFavoriteBorder size={22} />}
        </button>
      </div>
    </article>
  )
}
