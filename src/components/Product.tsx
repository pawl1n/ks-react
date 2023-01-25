import {ProductType} from '../api/Products';
import {Link} from 'react-router-dom';
import {BsPlus, BsEyeFill} from "react-icons/bs";
import {useContext} from "react";
import {CartContext, CartContextType} from "../contexts/CartContext";

interface ProductProps {
    product: ProductType
}

const Product = ({product}: ProductProps) => {
    const {addToCart} = useContext(CartContext) as CartContextType;

    return (
        <div>
            <div className="border border-[#e4e4e4] h-[300px] mb-4 relative overflow-hidden group transition">
                <div className="w-full h-full flex justify-center">
                    <div className="w-[200px] mx-auto flex justify-center items-center">
                        <img
                            className="max-h-[160px] group-hover:scale-110 transition duration-300"
                            src={product.image}
                            alt={product.title}
                        />
                    </div>
                </div>
                <div
                    className="absolute top-6 -right-11 group-hover:right-5 p-2 flex flex-col
                items-center justify-center
                gap-y-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <button onClick={() => addToCart(product.id)}>
                        <div className="flex justify-center items-center text-white w-12 h-12 bg-red-500">
                            <BsPlus className="text-3x1"/>
                        </div>
                    </button>
                    <Link to={`/products/${product.id}`}
                          className="w-12 h-12 bg-white flex justify-center items-center text-primary
                      drop-shadow-x1">
                        <BsEyeFill/>
                    </Link>
                </div>
            </div>
            <div className="text-sm capitalize text-gray-500">{product.category}</div>
            <Link to={`/products/${product.id}`}>
                <h2 className="font-semibold mb-1">{product.title}</h2>
            </Link>
            <div className="font-semibold ">{product.price} ₴</div>
        </div>
    );
}

export default Product;