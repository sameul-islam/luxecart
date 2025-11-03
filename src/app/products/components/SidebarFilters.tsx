"use client"
import { useMemo, useState } from "react"
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai"
import type { Product } from "../../../../public/all_product"

interface Props {
  products: Product[]
  selectedCategory: string | null
  setSelectedCategory: (c: string | null) => void
  selectedSizes: Set<string>
  toggleSize: (s: string) => void
  selectedColors: Set<string>
  toggleColor: (c: string) => void
  clearFilters: () => void
}

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

export default function SidebarFilters({
  products,
  selectedCategory,
  setSelectedCategory,
  selectedSizes,
  toggleSize,
  selectedColors,
  toggleColor,
  clearFilters,
}: Props) {
  const [openSize, setOpenSize] = useState(false)
  const [openColor, setOpenColor] = useState(false)

  const sizes = useMemo(() => {
    const s = new Set<string>()
    products.forEach((p) => p.sizes.forEach((z) => s.add(z)))
    return Array.from(s)
  }, [products])

  const colors = useMemo(() => {
    const s = new Set<string>()
    products.forEach((p) => p.colors.forEach((c) => s.add(c)))
    return Array.from(s)
  }, [products])

  return (
    <aside className="w-full sticky top-20 self-start">
      {/* Browse By */}
      <div className="mb-6">
        <h4 className="text-lg text-gray-800 font-semibold">Browse By</h4>
        <ul className="mt-3 flex xl:grid xl:grid-cols-3 xl:justify-between whitespace-nowrap gap-3 space-y-2 text-sm text-gray-900">
          {["All", "Men", "Women", "Kids"].map((c) => {
            const isActive = (selectedCategory ?? "All") === c
            return (
              <li key={c}>
                <button
                  onClick={() => setSelectedCategory(c === "All" ? null : c)}
                  className={`block text-left py-1 px-2 border border-black ${
                    isActive ? "bg-black text-white" : "hover:bg-gray-100"
                  }`}
                >
                  {c}
                </button>
              </li>
            )
          })}
        </ul>
      </div>

      {/* Filters Header */}
      <div className="mb-4">
        <div className="flex items-center justify-between">
          <h4 className="text-lg text-gray-800 font-semibold">Filters</h4>
          <button
            onClick={clearFilters}
            className="text-sm text-white runded-xs bg-black  py-1 px-2 hover:bg-gray-900"
          >
            Clear
          </button>
        </div>
      </div>

      {/* Size Filter */}
      <div className="mb-4">
        <button
          onClick={() => setOpenSize((v) => !v)}
          className="w-full flex items-center justify-between py-2"
        >
          <span className="font-medium text-gray-800">Sizes</span>
          <span className="flex items-center gap-2 text-gray-800">
            {openSize ? <AiOutlineMinus /> : <AiOutlinePlus />}
          </span>
        </button>

        <div
          className={`overflow-hidden transition-all ${
            openSize ? "max-h-96" : "max-h-0"
          }`}
        >
          <div className="mt-3 grid grid-cols-4 xl:grid-cols-3 gap-2 xl:gap-1">
            {sizes.map((s) => {
              const active = selectedSizes.has(s)
              return (
                <button
                  key={s}
                  onClick={() => toggleSize(s)}
                  aria-pressed={active}
                  className={`border border-black  whitespace-nowrap px-2 xl:px-1.5 py-1 text-sm  ${
                    active
                      ? "bg-black text-white border-black"
                      : "bg-white text-black border-black "
                  }`}
                >
                  {s}
                </button>
              )
            })}
          </div>
        </div>
      </div>

      {/* Color Filter */}
      <div className="mb-6">
        <button
          onClick={() => setOpenColor((v) => !v)}
          className="w-full flex items-center justify-between py-2"
        >
          <span className="font-medium text-gray-800">Colors</span>
          <span className="flex items-center gap-2 text-gray-800">
            {openColor ? <AiOutlineMinus /> : <AiOutlinePlus />}
          </span>
        </button>

        <div
          className={`overflow-hidden transition-all ${
            openColor ? "max-h-96" : "max-h-0"
          }`}
        >
          <div className="mt-3 grid grid-cols-5 xl:grid-cols-4 gap-3">
            {colors.map((c) => {
              const active = selectedColors.has(c)
              const hex = getColorHex(c)
              const isWhite = hex === "#ffffff" || hex === "white"
              return (
                <button
                  key={c}
                  onClick={() => toggleColor(c)}
                  aria-pressed={active}
                  title={c}
                  className={`w-8 h-8 rounded-full border border-black/60 flex items-center justify-center ${
                    active ? "ring ring-black" : "border-gray-700"
                  }`}
                  style={{
                    backgroundColor: isWhite ? "#ffffff" : hex,
                  }}
                >
                  {isWhite && (
                    <span
                      className={`w-3 h-3 rounded-full ${
                        active ? "bg-black" : "bg-gray-300"
                      }`}
                    ></span>
                  )}
                </button>
              )
            })}
          </div>
        </div>
      </div>
    </aside>
  )
}
