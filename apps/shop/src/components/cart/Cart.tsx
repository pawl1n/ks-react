import { useStore } from "@nanostores/preact";
import CartItem from "./CartItem";
import { shoppingCart } from "../../stores/cartStore";

const Cart = () => {
  const $cartItems = useStore(shoppingCart);

  return (
    <div className="min-w-[400px]">
      <div className="flex flex-col gap-y-2 overflow-y-auto overflow-x-hidden border-b">
        {$cartItems?.map((item) => {
          return (
            <CartItem
              key={`${item.productId}-${item.productItemId}`}
              item={item}
            />
          );
        })}
      </div>
      <div className="mt-auto flex flex-col gap-y-3 py-4 mb-0">
        <div className="uppercase font-semibold w-full flex justify-between">
          <span className="">Загальна сума: </span>
          {$cartItems
            .reduce((acc, item) => acc + item.price * item.quantity, 0)
            .toFixed(2)}{" "}
          ₴
        </div>
      </div>
    </div>
  );
};

export default Cart;
