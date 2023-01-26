import {createContext, useState} from "react";
import {useQuery} from "react-query";

export interface CartItemType {
    id: number;
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
    quantity: number
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