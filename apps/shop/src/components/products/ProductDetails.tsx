import type ProductType from "../../types/Product";
import type { ProductVariation } from "../../types/Product";
import { useState } from "preact/hooks";
import { addCartItem } from "../../stores/cartStore";

interface ProductProps {
  product: ProductType;
  variations: ProductVariation[];
}

const ProductDetails = ({ product, variations }: ProductProps) => {
  const [selectedVariation, setSelectedVariation] = useState<
    ProductVariation | undefined
  >(undefined);

  const handleAddToCart = () => {
    if (!selectedVariation) {
      return;
    }

    addCartItem(product, selectedVariation);
  };

  return (
    <section className="flex gap-10">
      <div>
        <div className="border border-[#e4e4e4] h-[300px] w-[300px] mb-4 relative overflow-hidden group transition">
          <div className="w-full h-full flex justify-center">
            <div className="w-[200px] mx-auto flex justify-center items-center">
              <img
                className={`max-h-[160px] group-hover:scale-110 transition duration-300`}
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
        <h1 className="font-bold text-xl mb-5">{product.name}</h1>
        <div className="text-sm">{product.description}</div>
        <div className="text-sm capitalize text-gray-500">
          {product.category}
        </div>
        <div className="mt-5">
          <h2 className="font-bold text-xl mb-5">Варіації</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-10">
            {variations?.map((variation) => {
              return (
                <section key={variation.id}>
                  <div
                    onClick={() => setSelectedVariation(variation)}
                    className={`border border-[#e4e4e4] cursor-pointer rounded mb-4 relative overflow-hidden group transition px-5 py-2 hover:bg-stone-200
                    ${selectedVariation === variation ? "bg-stone-200" : ""}`}
                  >
                    {variation.variationOptions
                      .map((option) => option.value)
                      .concat(" ")}
                  </div>
                </section>
              );
            })}
          </div>
          <div>
            <button onClick={() => handleAddToCart()}>
              <div className="flex justify-center items-center text-white px-5 py-2 bg-primary">
                <span>Додати до кошика</span>
              </div>
            </button>
          </div>
        </div>
      </section>
    </section>
  );
};

export default ProductDetails;
