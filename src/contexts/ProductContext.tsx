import {createContext, useState} from "react";
import {useQuery} from "react-query";

export type CartItemType = {
    id: number;
    category: string;
    description: string;
}

export const getProducts = async () => {
    const products = await fetch("https://fakestoreapi.com/products");
    return products.json();
}

// const ProductContext = () => {
//     const [product, setProduct] = useState(null);
//
//     return ();
// }
//
// export default ProductContext;