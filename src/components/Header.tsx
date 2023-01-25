import {useContext} from "react";
import {SidebarContext, SidebarContextType} from "../contexts/SidebarContext";
import {BsBag} from "react-icons/bs";

const Header = () => {
    const {isOpen, setIsOpen} = useContext(SidebarContext) as SidebarContextType;

    return <header className="bg-primary text-white">
        <div>Header</div>
        <div onClick={() => setIsOpen(!isOpen)} className="cursor-pointer flex relative">
            <BsBag className="text-2xl"/>
        </div>
    </header>;
}

export default Header;