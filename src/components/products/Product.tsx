import type ProductType from "../../types/Product";
import { addCartItem } from "../../stores/cartStore";
import { useState } from "preact/hooks";

interface ProductProps {
  product: ProductType;
}

const Product = ({ product }: ProductProps) => {
  return (
    <div>
      <div className="border border-[#e4e4e4] h-[300px] mb-4 relative overflow-hidden group transition">
        <div className="w-full h-full flex justify-center">
          <div className="w-[200px] mx-auto flex justify-center items-center">
            <img
              className={`max-h-[160px] group-hover:scale-110 transition duration-300`}
              src={product.image}
              alt={product.title}
              height="160"
              width="auto"
              loading="lazy"
            />
            {/* {isImageLoading && (
              <div class="flex items-center justify-center">
                <div
                  class="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                  role="status"
                >
                  <span class="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                    Loading...
                  </span>
                </div>
              </div>
            )} */}
          </div>
        </div>
        <div
          className="absolute top-6 -right-11 group-hover:right-5 p-2 flex flex-col
                items-center justify-center
                gap-y-2 opacity-0 group-hover:opacity-100 transition-all duration-300"
        >
          <button onClick={() => addCartItem(product)}>
            <div className="flex justify-center items-center text-white w-12 h-12 bg-red-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4.5v15m7.5-7.5h-15"
                />
              </svg>
            </div>
          </button>
          <a
            href={`/products/${product.id}`}
            className="w-12 h-12 bg-white flex justify-center items-center text-primary
                      drop-shadow-x1"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-6 h-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
              />
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
          </a>
        </div>
      </div>
      <div className="text-sm capitalize text-gray-500">{product.category}</div>
      <a href={`/products/${product.id}`}>
        <h2 className="font-semibold mb-1">{product.title}</h2>
      </a>
      <div className="font-semibold ">{product.price} ₴</div>
    </div>
  );
};

export default Product;
