import React from "react";

async function getProducts() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/products`,
    {
      cache: "no-store",
    }
  );
  if (!res.ok) throw new Error("Failed to fetch products");
  return res.json();
}

type Product = {
  id: string | number;
  name: string;
  description: string;
  price: number;
};

export default async function ProductsPage() {
  let products: Product[] = [];
  let error = "";
  try {
    products = await getProducts();
  } catch (e: unknown) {
    if (e instanceof Error) {
      error = e.message;
    } else {
      error = "Failed to load products.";
    }
  }

  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      <h1 className="text-2xl font-bold mb-6 text-lime-900 drop-shadow">
        Products
      </h1>
      {error ? (
        <div className="text-red-600 text-center py-8">{error}</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {products.length === 0 ? (
            <div className="col-span-full text-center text-lime-700">
              No products found.
            </div>
          ) : (
            products.map((product) => (
              <div
                key={product.id}
                className="rounded-xl border border-lime-200 bg-white/90 shadow-lg p-5 flex flex-col items-start hover:scale-105 hover:shadow-xl transition-all duration-300"
              >
                <div className="text-lg font-semibold text-lime-900 mb-2">
                  {product.name}
                </div>
                <div className="text-sm text-lime-700 mb-1">
                  {product.description}
                </div>
                <div className="text-base font-bold text-emerald-700 mt-auto">
                  ${product.price}
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
