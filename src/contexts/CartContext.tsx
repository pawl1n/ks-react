import {createContext, useState} from "react";
import ChildrenProps from "../types/ChildrenProps";
import {CartItemType} from "./ProductContext";

export type CartContextType = {
    addToCart: (id: number) => void,
}
export const CartContext = createContext<CartContextType | null>(null);

const CartProvider = ({children}: ChildrenProps) => {
    const [cart, setCart] = useState([]);
    const addToCart = (id: number) => {
        console.log('todo: addToCart', id);
    }

    return <CartContext.Provider value={{addToCart}}>{children}</CartContext.Provider>;
}

export default CartProvider;