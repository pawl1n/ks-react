import {Link} from 'react-router-dom';
import {IoMdArrowForward, FiTrash, FiTrash2} from "react-icons/all";
import CartItem from "../components/CartItem";
import {SidebarContext, SidebarContextType} from "../contexts/SidebarContext";
import {useContext} from "react";
import {CartContext, CartContextType} from "../contexts/CartContext";

const Sidebar = () => {
    const {isOpen, handleClose} = useContext(SidebarContext) as SidebarContextType;
    const {cart, clearCart, itemAmount, totalPrice} = useContext(CartContext) as CartContextType;

    return (
        <div className={`${isOpen ? 'right-0' : '-right-full'} w-full bg-white fixed top-0 h-full shadow-2xl
md:w-[40vw] xl:max-w-[45vw] transition-all duration-300 z-20 px-4 lg:px-[35px] flex flex-col`}>
            <div className="flex items-center justify-between py-6 border-b">
                <div className="uppercase text-sm font-semibold">Кошик ({itemAmount})</div>
                <div className="cursor-pointer w-8 h-8 flex justify-center items-center" onClick={handleClose}>
                    <IoMdArrowForward/>
                </div>
            </div>
            <div
                className="flex flex-col gap-y-2 lg:h[640px] overflow-y-auto overflow-x-hidden border-b">
                {cart.map(item => {
                    return (
                        <CartItem key={item.id} item={item}/>
                    );
                })}
            </div>
            <div className="mt-auto flex flex-col gap-y-3 py-4 mb-0">
                <div className="flex w-full justify-between items-center">
                    <div className="uppercase font-semibold">
                        <span className="mr-2">Загальна сума: </span>
                        {totalPrice.toFixed(2)} ₴
                    </div>
                    <div
                        className="cursor-pointer py-4 bg-red-500 text-white w-12 h-12 flex justify-center items-center text-xl"
                        onClick={clearCart}>
                        <FiTrash2/>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Sidebar;