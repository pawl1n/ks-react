import {useContext, useState} from "react";
import {SidebarContext, SidebarContextType} from "../contexts/SidebarContext";
import {BsBag} from "react-icons/bs";
import {CartContext, CartContextType} from "../contexts/CartContext";
import {Link} from "react-router-dom";
import Logo from "../assets/logo.png";

const Header = () => {
    const [isActive, setIsActive] = useState(false);

    const {isOpen, setIsOpen} = useContext(SidebarContext) as SidebarContextType;
    const {itemAmount} = useContext(CartContext) as CartContextType;

    useState(() => {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 60) {
                setIsActive(true);
            } else {
                setIsActive(false);
            }
        });
    })

    return (
        <header
            className={`${isActive ? 'bg-primary py-4 shadow-md' : 'bg-none py-6 font-semibold'} text-white fixed w-full z-10 transition-all`}>
            <div className="container flex mx-auto items-center justify-between h-full">
                <Link to={"/"}>
                    <div>
                        <img
                            src={Logo}
                            alt="Кішка стрибає - логотип"
                            className="w-[40px]"
                        />
                    </div>
                </Link>
                <div
                    onClick={() => setIsOpen(!isOpen)}
                    className="cursor-pointer flex relative"
                >
                    <BsBag className="text-2xl"/>
                    <div
                        className="bg-red-500 absolute -right-2 -bottom-2 text-12px w-[18px] h-[18px] text-white
                rounded-full flex justify-center items-center"
                    >
                        {itemAmount}
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Header;