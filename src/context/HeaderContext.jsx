import { createContext, useState } from "react";

export const HeaderContext = createContext();

export const HeaderProvider = ({ children }) => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	const openMenu = () => {
		setIsMenuOpen(true);
	};

	const closeMenu = () => {
		setIsMenuOpen(false);
	};

	return <HeaderContext.Provider value={{ isMenuOpen, openMenu, closeMenu }}>{children}</HeaderContext.Provider>;
};
