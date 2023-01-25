import {Link} from 'react-router-dom';
import {IoMdArrowForward, FiTrash} from "react-icons/all";
import CartItem from "../components/CartItem";
import {SidebarContext, SidebarContextType} from "../contexts/SidebarContext";
import {useContext} from "react";
import {CartContext} from "../contexts/CartContext";

const Sidebar = () => {
    const {isOpen, handleClose} = useContext(SidebarContext) as SidebarContextType;
    const {} = useContext(CartContext);

    return (
        <>
            <div className={`${isOpen ? 'right-0' : '-right-full'} w-full bg-white fixed top-0 h-full shadow-2xl
    md:w-[35vw] xl:max-w-[30vw] transition-all duration-300 z-20 px-4 lg:px-[35px]`}>
                <div className="flex items-center justify-between py-6 border-b" onClick={handleClose}>
                    <div className="uppercase text-sm font-semibold">Кошик (0)</div>
                    <div className="cursor-pointer w-8 h-8 flex justify-center items-center">
                        <IoMdArrowForward/>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Sidebar;