import { atom } from "nanostores";
import type CartItem from "../types/CartItem";
import { persistentAtom } from "@nanostores/persistent";
import type { Product, ProductItem } from "shared/types/product";

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

export const addCartItem = (product: Product, productItem: ProductItem) => {
  const existingEntry = shoppingCart
    .get()
    .find(
      (item) =>
        item.productItemId === productItem.id && item.productId === product.id,
    );

  if (existingEntry) {
    shoppingCart.set([
      ...shoppingCart.get().map((item) => {
        if (
          item.productItemId === productItem.id &&
          item.productId === product.id
        ) {
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
      {
        ...product,
        ...productItem,
        productSlug: product.slug,
        quantity: 1,
        category: product.category.name,
        productId: product.id,
        productItemId: productItem.id,
      },
    ]);
  }
};

export const removeCartItem = (cartItemId: number, variationId: number) => {
  shoppingCart.set([
    ...shoppingCart
      .get()
      .filter(
        (item) =>
          !(
            item.productItemId === variationId && item.productId === cartItemId
          ),
      ),
  ]);
};

export const removeAllCartItems = () => {
  shoppingCart.set([]);
};

export const incrementCartItemQuantity = (
  cartItemId: number,
  variationId: number,
) => {
  shoppingCart.set([
    ...shoppingCart.get().map((item) => {
      if (item.productItemId === variationId && item.productId === cartItemId) {
        return {
          ...item,
          quantity: item.quantity + 1,
        };
      }
      return item;
    }),
  ]);
};

export const decrementCartItemQuantity = (
  cartItemId: number,
  variationId: number,
) => {
  shoppingCart.set([
    ...shoppingCart.get().map((item) => {
      if (item.productItemId === variationId && item.productId === cartItemId) {
        return {
          ...item,
          quantity: item.quantity === 1 ? item.quantity : item.quantity - 1,
        };
      }
      return item;
    }),
  ]);
};
