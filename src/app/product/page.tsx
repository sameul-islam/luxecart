// app/product/page.tsx
import ProductCard from "../products/components/ProductCard";
import all_product from "../../../public/all_product";

export default function page() {
  return (
    <div className="max-w-6xl mx-auto px-4 md:px-8 py-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {all_product.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
