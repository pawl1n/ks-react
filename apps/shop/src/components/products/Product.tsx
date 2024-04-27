import type { Product as ProductType } from "shared/types/product";

interface ProductProps {
  product: ProductType;
}

const Product = ({ product }: ProductProps) => {
  return (
    <div className="place-self-center md:place-self-auto w-[300px]">
      <div className="border border-[#e4e4e4] h-[300px] mb-4 relative overflow-hidden group transition">
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
        <div
          className="absolute top-6 -right-11 group-hover:right-5 p-2 flex flex-col
                items-center justify-center
                gap-y-2 opacity-0 group-hover:opacity-100 transition-all duration-300"
        >
          <a
            href={`/products/${product.slug}`}
            className="w-12 h-12 bg-white flex justify-center items-center text-primary
                      drop-shadow-x1"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
              <title>View details</title>
            </svg>
          </a>
        </div>
      </div>
      <div className="flex flex-row justify-between">
        <a href={`/products/${product.slug}`}>
          <h2 className="font-semibold mb-1">{product.name}</h2>
        </a>
        <span className="text-sm text-gray-500">{product.price} грн.</span>
      </div>
      <div className="text-sm capitalize text-gray-500">
        {product.category.name}
      </div>
    </div>
  );
};

export default Product;
