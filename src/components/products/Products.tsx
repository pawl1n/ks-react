import { memo, useState } from "preact/compat";
import Product from "./Product";
import type ProductType from "../../types/Product";

let isLoading = false;

const products: ProductType[] = await fetch(
  "https://fakestoreapi.com/products/"
)
  .then((response) => response.json())
  .then((data) => {
    isLoading = false;

    return data.filter((product: ProductType) =>
      product.category.includes("clothing")
    );
  });

const Products = memo(() => {
  return (
    <section className="py-16">
      <div className="container mx-auto">
        {isLoading ? (
          "Loading..."
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-10">
            {products.map((product) => {
              return <Product key={product.id} product={product} />;
            })}
          </div>
        )}
      </div>
    </section>
  );
});

export default Products;
