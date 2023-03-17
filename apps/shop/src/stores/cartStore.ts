import { atom } from "nanostores";
import type CartItem from "../types/CartItem";
import { persistentAtom } from "@nanostores/persistent";
import type Product from "../types/Product";
import type { ProductVariation } from "../types/Product";

export const isCartOpen = atom(false);

export const shoppingCart = persistentAtom<CartItem[]>("cart", [], {
  encode: JSON.stringify,
  decode: (value) => {
    try {
      const cart = JSON.parse(value);
      if (!Array.isArray(cart)) {
        shoppingCart.set([]);
        return [];
      }

      return cart;
    } catch (e) {
      shoppingCart.set([]);
      return [];
    }
  },
});

export const addCartItem = (cartItem: Product, variation: ProductVariation) => {
  const existingEntry = shoppingCart
    .get()
    .find((item) => item.id === variation.id);

  if (existingEntry) {
    shoppingCart.set([
      ...shoppingCart.get().map((item) => {
        if (item.id === variation.id) {
          return {
            ...item,
            quantity: item.quantity + 1,
          };
        }
        return item;
      }),
    ]);
  } else {
    shoppingCart.set([
      ...shoppingCart.get(),
      { ...cartItem, ...variation, quantity: 1 },
    ]);
  }
};

export const removeCartItem = (cartItemId: number) => {
  shoppingCart.set([
    ...shoppingCart.get().filter((item) => item.id !== cartItemId),
  ]);
};

export const removeAllCartItems = () => {
  shoppingCart.set([]);
};

export const incremenetCartItemQuantity = (cartItemId: number) => {
  shoppingCart.set([
    ...shoppingCart.get().map((item) => {
      if (item.id === cartItemId) {
        return {
          ...item,
          quantity: item.quantity + 1,
        };
      }
      return item;
    }),
  ]);
};

export const decrementCartItemQuantity = (cartItemId: number) => {
  shoppingCart.set([
    ...shoppingCart.get().map((item) => {
      if (item.id === cartItemId) {
        return {
          ...item,
          quantity: item.quantity === 1 ? item.quantity : item.quantity - 1,
        };
      }
      return item;
    }),
  ]);
};
