import { useContext } from "react";
import { Link } from "react-router-dom";
import { List } from "@phosphor-icons/react";

import { HeaderContext } from "@context/HeaderContext";
import TheMenu from "@components/common/TheMenu";

const TheHeader = () => {
	const { isMenuOpen, openMenu, closeMenu } = useContext(HeaderContext);

	return (
		<div
			id="header"
			className="relative z-0 flex items-center justify-between p-8 bg-opacity-0 bg-light-bg lg:w-240 lg:py-10 lg:mx-auto"
		>
			{/* 로고 */}
			<Link to="/">
				<div
					id="logo"
					className="text-xl font-bold tracking-tighter lg:text-2xl lg:font-extrabold"
				>
					SVTCHIVE.kr
				</div>
			</Link>

			{/* 내비게이션 & 메뉴 버튼 */}
			<div id="nav">
				<ul className="hidden lg:flex lg:gap-2">
					<Link
						to="/fanchant"
						className="px-3 py-2 transition duration-500 rounded hover:bg-black hover:bg-opacity-5"
					>
						<li>응원법</li>
					</Link>
					<Link
						to=""
						className="px-3 py-2 transition duration-500 rounded hover:bg-black hover:bg-opacity-5"
					>
						<li>가이드</li>
					</Link>
					<Link
						to=""
						className="px-3 py-2 transition duration-500 rounded hover:bg-black hover:bg-opacity-5"
					>
						<li>총공팀</li>
					</Link>
					<Link
						to=""
						className="px-3 py-2 transition duration-500 rounded hover:bg-black hover:bg-opacity-5"
					>
						<li>아카이브</li>
					</Link>
					<Link
						to=""
						className="px-3 py-2 transition duration-500 rounded hover:bg-black hover:bg-opacity-5"
					>
						<li>셉플리</li>
					</Link>
				</ul>
				<List
					className="block lg:hidden"
					size={20}
					weight="bold"
					onClick={openMenu}
				/>

				{/* 메뉴 컴포넌트 */}
				{
					<TheMenu
						isOpen={isMenuOpen}
						onClose={closeMenu}
					/>
				}
			</div>
		</div>
	);
};

export default TheHeader;
