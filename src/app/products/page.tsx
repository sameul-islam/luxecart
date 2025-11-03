"use client"
import { useEffect, useMemo, useState } from "react"
import all_product, { Product } from "../../../public/all_product"
import SidebarFilters from "./components/SidebarFilters"
import ProductCard from "./components/ProductCard"
import SortAndCount from "./components/SortAndCount"
import MobileFilterDrawer from "./components/MobileFilterDrawer"
import { useSearchParams } from "next/navigation"

export default function page() {
  const products: Product[] = all_product
  const searchParams = useSearchParams();
  const categoryFromQuery = searchParams?.get("category") ?? null;



  const [selectedCategory, setSelectedCategory] = useState<string | null>(categoryFromQuery) 
  const [selectedSizes] = useState<Set<string>>(new Set()) 
  const [, setTick] = useState(0) 
  const toggleSize = (s: string) => {
    if (selectedSizes.has(s)) selectedSizes.delete(s)
    else selectedSizes.add(s)
    setTick((t) => t + 1)
  }

  useEffect(() => {
    setSelectedCategory(categoryFromQuery);
  },[categoryFromQuery]);

  const [selectedColors] = useState<Set<string>>(new Set())
  const toggleColor = (c: string) => {
    if (selectedColors.has(c)) selectedColors.delete(c)
    else selectedColors.add(c)
    setTick((t) => t + 1)
  }

  const [sort, setSort] = useState<string>("featured")
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)

  const clearFilters = () => {
    setSelectedCategory(null)
    selectedSizes.clear()
    selectedColors.clear()
    setTick((t) => t + 1)
  }

  const filtered = useMemo(() => {
    let arr = products.slice()

    if (selectedCategory) {
      arr = arr.filter((p) => p.category === selectedCategory)
    }

    if (selectedSizes.size > 0) {
      arr = arr.filter((p) => p.sizes.some((s) => selectedSizes.has(s)))
    }

    if (selectedColors.size > 0) {
      arr = arr.filter((p) => p.colors.some((c) => selectedColors.has(c)))
    }

    // sort
    switch (sort) {
      case "price-asc":
        arr.sort((a, b) => ( (a.discountPrice ?? a.price) - (b.discountPrice ?? b.price) ))
        break
      case "price-desc":
        arr.sort((a, b) => ( (b.discountPrice ?? b.price) - (a.discountPrice ?? a.price) ))
        break
      case "newest":
        arr.sort((a, b) => b.id - a.id)
        break
      default:
        // featured first, then id
        arr.sort((a, b) => {
          const fa = a.featured ? 0 : 1
          const fb = b.featured ? 0 : 1
          if (fa !== fb) return fa - fb
          return b.id - a.id
        })
    }

    return arr
  }, [products, selectedCategory, selectedSizes, selectedColors, sort, mobileFiltersOpen])

  return (
    <main className="min-h-screen  mt-16 md:mt-24 py-10 px-4 md:px-8 font-Outfit">
      <div className="w-[96%] md:w-[94%] mx-auto flex flex-col gap-8">

       {/* top row: count + sort */}
        <div className=" flex flex-col md:flex-row justify-between items-center ">
          <div>
            <h1 className="text-3xl md:text-5xl font-bold text-gray-800 text-center md:text-left">All Products</h1>
            <p className="text-center md:text-left text-gray-700">
              Lorem ipsum dolor, sit amet consectetur <span className="hidden lg:flex text-[#718093]">adipisicing elit. Quo illo nihil distinctio ab maiores consectetur quisquam voluptas repudiandae, hic</span> corrupti.
            </p>
          </div>
        <div className="flex items-center justify-end mt-6">
          <SortAndCount total={filtered.length} sort={sort} setSort={setSort} onOpenMobileFilters={() => setMobileFiltersOpen(true)} />
        </div>
        </div>

        <div className="flex gap-8">
          {/* LEFT SIDEBAR (desktop only) */}
          <div className="hidden xl:block w-50">
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
          </div>
           
          {/* MAIN GRID */}
          <div className="flex-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6">
              {filtered.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile filter drawer */}
      <MobileFilterDrawer
        open={mobileFiltersOpen}
        onClose={() => setMobileFiltersOpen(false)}
        products={products}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        selectedSizes={selectedSizes}
        toggleSize={toggleSize}
        selectedColors={selectedColors}
        toggleColor={toggleColor}
        clearFilters={clearFilters}
      />
    </main>
  )
}
