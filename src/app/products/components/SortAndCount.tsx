
"use client"
import React from "react"
import { FiFilter } from "react-icons/fi"

interface Props {
  total: number
  sort: string
  setSort: (s: string) => void
  onOpenMobileFilters?: () => void
}

export default function SortAndCount({ total, sort, setSort, onOpenMobileFilters }: Props) {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between gap-5">
      <div className="text-sm text-gray-600">
        <span className="font-medium">{total}</span> products
      </div>

      <div className="flex items-center gap-3">
        <div className=" items-center  text-sm">
          <label className="text-gray-600 px-2">Sort by:</label>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="border-2 border-gray-500 bg-[#dfe6e9] text-gray-800 rounded-md px-1 py-1.5 text-sm"
            aria-label="Sort products"
          >
            <option value="featured">Featured</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="newest">Newest</option>
          </select>
        </div>

        {/* mobile filter button */}
        {onOpenMobileFilters && (
          <button
            onClick={onOpenMobileFilters}
            className="xl:hidden px-3 py-2 border rounded-md text-sm flex items-center"
            aria-label="Open filters"
          >
            Filters<FiFilter />
          </button>
        )}
      </div>
    </div>
  )
}
