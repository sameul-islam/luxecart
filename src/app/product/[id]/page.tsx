// app/product/[id]/page.tsx
import ProductDetailsClient from "./ProductDetailsClient";
import all_product from "../../../../public/all_product";
import React from "react";

interface Props {
  params: { id: string } | Promise<{ id: string }>; // if async
}

export default async function ProductPage({ params }: Props) {
  // unwrap params if it's a Promise
  const resolvedParams = await params; 
  const id = Number(resolvedParams.id); 

  const product = all_product.find(p => p.id === id);
  if (!product) {
    return (
      <main className="min-h-screen  flex items-center justify-center p-8">
        <div className="text-center">
          <h2 className="text-2xl font-semibold">Product not found</h2>
          <p className="text-gray-600 mt-2">Looks like this product doesn't exist.</p>
        </div>
      </main>
    );
  }

  return <ProductDetailsClient product={product} />;
}
