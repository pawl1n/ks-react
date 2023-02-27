import { memo } from "preact/compat";
import type CartItemType from "../types/CartItem";
import {
  removeCartItem,
  incremenetCartItemQuantity,
  decrementCartItemQuantity,
} from "../stores/cartStore";

interface Props {
  item: CartItemType;
}

const CartItem = memo(({ item }: Props) => {
  console.log(item);
  return (
    <div className="flex gap-x-4 py-2 xl:px-6 border-b border-gray-200 w-full font-light text-gray-500">
      <div className="w-full min-h-[150px] flex items-center gap-x-4">
        <a href={`/product/${item.id}`}>
          <img src={item.image} alt={item.title} className="max-w-[80px]" />
        </a>
        <div className="w-full flex flex-col">
          <div className="flex justify-between mb-2 items-center">
            <a
              href={`/product/${item.id}`}
              className="tet-sm uppercase font-medium max-w-[240px] text-primary hover:underline"
            >
              <span>{item.title}</span>
            </a>
            <div className="text-xl cursor-pointer">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-6 h-6 text-gray-500 hover:text-red-500 transition"
                onClick={() => removeCartItem(item.id)}
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </div>
          </div>
          <div className="flex gap-x-2 h-[36px] text-sm">
            <div className="flex items-center flex-1 max-w-[100px] h-full border text-primary font-medium">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className={`${
                  item.quantity > 1 ? `cursor-pointer` : `cursor-not-allowed`
                } w-6 h-6 flex-1 flex justify-center items-center`}
                onClick={() => {
                  if (item.quantity > 1) decrementCartItemQuantity(item.id);
                }}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 12h-15"
                />
              </svg>

              <div className="h-full flex justify-center items-center px-2">
                {item.quantity}
              </div>

              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 flex-1 flex justify-center items-center cursor-pointer"
                onClick={() => incremenetCartItemQuantity(item.id)}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4.5v15m7.5-7.5h-15"
                />
              </svg>
            </div>
            <div className="flex-1 flex items-center justify-around">
              {item.price} ₴
            </div>
            <div className="flex-1 flex justify-end items-center text-primary font-medium">
              {(item.quantity * item.price).toFixed(2)} ₴
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

export default CartItem;
