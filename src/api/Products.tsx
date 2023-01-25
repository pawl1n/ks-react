import axios from "axios";

export interface ProductType {
    id: number;
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
}

const axiosClient = axios.create({
    baseURL: "https://fakestoreapi.com/",
});

export const getProducts = async () => {
    const result = await axios.get<ProductType[]>(
        "https://fakestoreapi.com/products/"
    );
    return result.data;
};