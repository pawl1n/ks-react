import type { ProductDetails, ProductItem } from "shared/types/product";
import { useState } from "preact/hooks";
import { addCartItem, isCartOpen } from "../../stores/cartStore";
import Breadcrumbs from "./Breadcrumbs";

interface ProductProps {
  productDetails: ProductDetails;
}

export default ({ productDetails }: ProductProps) => {
  const { product, variations } = productDetails;
  const [selectedVariation, setSelectedVariation] = useState<
    ProductItem | undefined
  >(variations.length === 1 ? variations[0] : undefined);

  const handleAddToCart = () => {
    if (!selectedVariation) {
      return;
    }

    isCartOpen.set(true);

    addCartItem(product, selectedVariation);
  };

  return (
    <div className="w-full container">
      <section className="grid grid-cols-1 sm:grid-cols-2 gap-10 items-center">
        <div className="w-full flex justify-center">
          <div className="border border-[#e4e4e4] h-[300px] w-[300px] mb-4 relative overflow-hidden group transition content-center flex">
            <div className="w-full h-full flex justify-center">
              <div className="w-[200px] mx-auto flex justify-center items-center">
                <img
                  className="max-h-[160px] group-hover:scale-110 transition duration-300"
                  src={product.mainImage}
                  alt={product.name}
                  height="160"
                  width="auto"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>
        <section>
          <Breadcrumbs breadcrumbs={productDetails?.breadcrumbs} />

          <h1 className="font-bold text-xl">{product.name}</h1>
          <div className="text-sm mt-5">Ціна: {product.price} грн.</div>
          <div className="text-sm text-gray-500">{product.sku}</div>
          <div className="mt-5">
            <h2 className="font-bold text-xl mb-5">Варіації</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-x-5 gap-y-2">
              {variations?.map((variation) => {
                return (
                  <section key={variation.id}>
                    <button
                      type="button"
                      onClick={() => setSelectedVariation(variation)}
                      className={`border border-[#e4e4e4] cursor-pointer rounded relative overflow-hidden group transition px-5 py-2 hover:bg-stone-200 text-center w-full
                    ${selectedVariation === variation ? "bg-stone-200" : ""}`}
                    >
                      {variation.variationOptions
                        ?.map((option) => option.value)
                        .join(", ")}
                    </button>
                  </section>
                );
              })}
            </div>
          </div>
          <div>
            <button
              type="button"
              onClick={() => handleAddToCart()}
              className="flex justify-center items-center text-white px-5 py-2 bg-primary rounded mt-5"
            >
              <div>
                <span>Додати до кошика</span>
              </div>
            </button>
          </div>
        </section>
      </section>
      <div className="mt-10">
        <h2 className="font-bold text-xl mb-5">Опис</h2>
        <p>{product.description}</p>
      </div>
    </div>
  );
};
