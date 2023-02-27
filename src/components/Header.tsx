import { useContext, useState } from "react";
import { SidebarContext, SidebarContextType } from "../contexts/SidebarContext";
import { BsBag } from "react-icons/bs";
import { CartContext, CartContextType } from "../contexts/CartContext";
import { Link } from "react-router-dom";
import Logo from "../assets/logo.png";

interface HeaderProps {
  link?: string;
}

const Header = ({ link = "/" }: HeaderProps) => {
  const [isActive, setIsActive] = useState(false);

  const { isOpen, setIsOpen } = useContext(
    SidebarContext
  ) as SidebarContextType;
  const { itemAmount } = useContext(CartContext) as CartContextType;

  useState(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 60) {
        setIsActive(true);
      } else {
        setIsActive(false);
      }
    });
  });

  return (
    <>
      <header
        className={`${
          isActive ? "py-4 shadow-md" : " py-6 font-semibold"
        } sticky top-0 left-0 right-0 bg-primary text-white w-full z-10 transition-all`}
      >
        <div className="container flex mx-auto items-center justify-between h-full">
          <Link to={link}>
            <div className="flex items-center gap-5">
              <img
                src={Logo}
                alt="Кішка стрибає - логотип"
                className="w-[40px]"
              />
              <h1 className="font-semibold text-2xl">Кішка стрибає</h1>
            </div>
          </Link>
          <div
            onClick={() => setIsOpen(!isOpen)}
            className="cursor-pointer flex relative"
          >
            <BsBag className="text-2xl" />
            <div
              className="bg-red-500 absolute -right-2 -bottom-2 text-12px w-[18px] h-[18px] text-white
                rounded-full flex justify-center items-center"
            >
              {itemAmount}
            </div>
          </div>
        </div>
      </header>
      <div className="pt-[85px]"></div>
    </>
  );
};

export default Header;
