import {CartItemType} from "../contexts/ProductContext";
import {Link} from "react-router-dom";
import {IoMdAdd, IoMdClose, IoMdRemove} from "react-icons/all";
import {useContext} from "react";
import {CartContext, CartContextType} from "../contexts/CartContext";

interface CartItemProps {
    item: CartItemType
}

const CartItem = ({item}: CartItemProps) => {
    const {removeFromCart, incrementQuantity, decrementQuantity} = useContext(CartContext) as CartContextType;

    return (
        <div className="flex gap-x-4 py-2 xl:px-6 border-b border-gray-200 w-full font-light text-gray-500">
            <div className="w-full min-h-[150px] flex items-center gap-x-4">
                <Link to={`/product/${item.id}`}>
                    <img src={item.image} alt={item.title} className="max-w-[80px]"/>
                </Link>
                <div className="w-full flex flex-col">
                    <div className="flex justify-between mb-2 items-center">
                        <Link to={`/product/${item.id}`}
                              className="tet-sm uppercase font-medium max-w-[240px] text-primary hover:underline">
                            <span>{item.title}</span>
                        </Link>
                        <div className="text-xl cursor-pointer">
                            <IoMdClose className="text-gray-500 hover:text-red-500 transition"
                                       onClick={() => removeFromCart(item.id)}/>
                        </div>
                    </div>
                    <div className="flex gap-x-2 h-[36px] text-sm">
                        <div
                            className="flex items-center flex-1 max-w-[100px] h-full border text-primary font-medium">
                            <IoMdRemove onClick={() => decrementQuantity(item.id)}
                                        className="flex-1 flex justify-center items-center cursor-pointer"/>

                            <div className="h-full flex justify-center items-center px-2">{item.quantity}</div>

                            <IoMdAdd onClick={() => incrementQuantity(item.id)}
                                     className="flex-1 flex justify-center items-center cursor-pointer"/>
                        </div>
                        <div className="flex-1 flex items-center justify-around">{item.price} ₴</div>
                        <div
                            className="flex-1 flex justify-end items-center text-primary font-medium">
                            {(item.quantity * item.price).toFixed(2)} ₴
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CartItem;