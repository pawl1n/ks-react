import { createContext, useEffect, useMemo, useState } from "react";
import ChildrenProps from "../types/ChildrenProps";
import { CartItemType } from "../store/cartSlice";
import { ProductType } from "../api/Products";

export type CartContextType = {
  cart: CartItemType[];
  addToCart: (product: ProductType) => void;
  removeFromCart: (id: number) => void;
  clearCart: () => void;
  incrementQuantity: (id: number) => void;
  decrementQuantity: (id: number) => void;
  itemAmount: number;
  totalPrice: number;
};
export const CartContext = createContext<CartContextType | null>(null);

const CartProvider = ({ children }: ChildrenProps) => {
  const [cart, setCart] = useState<CartItemType[]>([]);
  const [itemAmount, setItemAmount] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  const addToCart = (product: ProductType) => {
    const newItem: CartItemType = { ...product, quantity: 1 };
    const cartItem = cart.find((item) => item.id === product.id);

    if (cartItem) {
      const newCart = [...cart].map((item) => {
        if (item.id === product.id) {
          return { ...item, quantity: item.quantity + 1 };
        }
        return item;
      });

      setCart(newCart);
    } else {
      setCart([...cart, newItem]);
    }
  };
  const removeFromCart = (id: number) => {
    const newCart = cart.filter((item) => item.id !== id);
    setCart(newCart);
  };
  const clearCart = () => {
    setCart([]);
  };
  const incrementQuantity = (id: number) => {
    const newCart = cart.map((item) => {
      if (item.id === id) {
        return { ...item, quantity: item.quantity + 1 };
      }
      return item;
    });
    setCart(newCart);
  };
  const decrementQuantity = (id: number) => {
    const newCart = cart.map((item) => {
      if (item.id === id && item.quantity > 1) {
        return { ...item, quantity: item.quantity - 1 };
      }
      return item;
    });
    setCart(newCart);
  };

  useEffect(() => {
    if (cart) {
      const amount = cart.reduce((total, item) => total + item.quantity, 0);
      setItemAmount(amount);
      const totalPrice = cart.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );
      setTotalPrice(totalPrice);
    }
  });

  const cartMemo = useMemo(
    () => ({
      cart,
      addToCart,
      removeFromCart,
      clearCart,
      incrementQuantity,
      decrementQuantity,
      itemAmount,
      totalPrice,
    }),
    [cart, itemAmount, totalPrice]
  );

  return (
    <CartContext.Provider value={cartMemo}>{children}</CartContext.Provider>
  );
};

export default CartProvider;
