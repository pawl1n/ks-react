import {createContext, ReactNode, useState} from "react";
import ChildrenProps from "../types/ChildrenProps";

export type SidebarContextType = {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
    handleClose: () => void;
}

export const SidebarContext = createContext<SidebarContextType | null>(null);

const SidebarProvider = ({children}: ChildrenProps) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleClose = () => {
        setIsOpen(false);
    }

    return <SidebarContext.Provider value={{isOpen, setIsOpen, handleClose}}>{children}</SidebarContext.Provider>;
}

export default SidebarProvider;