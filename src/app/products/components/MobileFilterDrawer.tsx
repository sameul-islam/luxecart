"use client"
import { Fragment } from "react"
import SidebarFilters from "./SidebarFilters"
import type { Product } from "../../../../public/all_product"
import { RiCloseLargeLine } from "react-icons/ri"
import { FiFilter } from "react-icons/fi"

interface Props {
  open: boolean
  onClose: () => void
  children?: React.ReactNode
  products: Product[]
  selectedCategory: string | null
  setSelectedCategory: (c: string | null) => void
  selectedSizes: Set<string>
  toggleSize: (s: string) => void
  selectedColors: Set<string>
  toggleColor: (c: string) => void
  clearFilters: () => void
}

export default function MobileFilterDrawer({ open, onClose, products, selectedCategory, setSelectedCategory, selectedSizes, toggleSize, selectedColors, toggleColor, clearFilters }: Props) {
  return (
    <Fragment>
      <div className={`fixed inset-0 z-50 transition-opacity ${open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}>
        <div onClick={onClose} className="absolute inset-0 bg-black/40"></div>

        <aside className={`absolute left-0 top-0 bottom-0 w-80 bg-white p-4 transform transition-transform ${open ? "translate-x-0" : "-translate-x-full"}`}>
          <div className="flex items-center justify-between mb-4 ">
            <h3 className="text-lg font-semibold flex items-center gap-1">Filters <FiFilter /></h3>
            <button onClick={onClose} className="text-xl font-bold text-black"><RiCloseLargeLine /></button>
          </div>

          <SidebarFilters
            products={products}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            selectedSizes={selectedSizes}
            toggleSize={toggleSize}
            selectedColors={selectedColors}
            toggleColor={toggleColor}
            clearFilters={clearFilters}
          />
        </aside>
      </div>
    </Fragment>
  )
}
