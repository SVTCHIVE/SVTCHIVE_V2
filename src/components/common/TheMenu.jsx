import { Link } from "react-router-dom";
import { Envelope, XLogo } from "@phosphor-icons/react";

// import { DarkModeContext } from "@context/DarkModeContext";
// import { useContext } from "react";

const TheMenu = ({ isOpen, onClose }) => {
	// const { darkMode, toggleDarkMode } = useContext(DarkModeContext);

	// const handleToggle = () => {
	// 	toggleDarkMode();
	// };

	return (
		<>
			{/* 뒷배경 오버레이 */}
			<div
				id="overlay"
				className={`fixed inset-0 z-20 bg-black bg-opacity-5 backdrop-blur-sm transition-opacity duration-300
					${isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
				onClick={onClose}
			/>

			{/* 메뉴 */}
			<div
				id="menu"
				className={`fixed top-0 right-0 z-30 w-56 h-screen bg-white transition-transform duration-300 transform
					${isOpen ? "translate-x-0" : "translate-x-full"}`}
			>
				<div
					id="logo"
					className="mx-6 my-8 text-lg font-bold tracking-tighter"
				>
					SVTCHIVE.kr
				</div>
				<section className="mx-6 mb-6">
					<h3 className="mb-3 font-normal tracking-tighter text-gray-900">MENU</h3>
					<ul className="flex flex-col gap-2">
						<Link to="">
							<li>
								<p className="text-xl font-extrabold tracking-tight text-gray-1000">응원법</p>
								<p className="text-xs tracking-tight text-gray-500">세븐틴 응원법 모음</p>
							</li>
						</Link>
						<Link to="">
							<li>
								<p className="text-xl font-extrabold tracking-tight text-gray-1000">가이드</p>
								<p className="text-xs tracking-tight text-gray-500">스밍/다운 가이드 모음</p>
							</li>
						</Link>
						<Link to="">
							<li>
								<p className="text-xl font-extrabold tracking-tight text-gray-1000">총공팀</p>
								<p className="text-xs tracking-tight text-gray-500">아이디 제출, 페이백 등</p>
							</li>
						</Link>
						<Link to="">
							<li>
								<p className="text-xl font-extrabold tracking-tight text-gray-1000">아카이브</p>
								<p className="text-xs tracking-tight text-gray-500">세븐틴 관련 각종 아카이브</p>
							</li>
						</Link>
						<Link to="">
							<li>
								<p className="text-xl font-extrabold tracking-tight text-gray-1000">셉플리</p>
								<p className="text-xs tracking-tight text-gray-500">#세븐틴_플레이리스트</p>
							</li>
						</Link>
					</ul>
				</section>
				<section className="mx-6 mb-6">
					<h3 className="mb-3 font-normal tracking-tighter text-gray-900">CONTACT</h3>
					<ul className="flex flex-col gap-1">
						<Link to="">
							<li className="flex items-center gap-1">
								<XLogo
									size={16}
									color="#2C2C2C"
									weight="fill"
								/>
								<span className="text-sm text-gray-900">Twitter</span>
							</li>
						</Link>
						<Link to="">
							<li className="flex items-center gap-1">
								<Envelope
									size={16}
									color="#2C2C2C"
									weight="fill"
								/>
								<span className="text-sm text-gray-900">Gmail</span>
							</li>
						</Link>
					</ul>
				</section>
				{/* <section className="mx-6 mb-6">
					<h3 className="mb-3 font-normal tracking-tighter text-gray-900">MODE</h3>
					<div
						onClick={handleToggle}
						className={`w-10 h-5 flex items-center mb-2 ${
							darkMode ? "bg-gray-700" : "bg-gray-200"
						} rounded-full transition-colors duration-300`}
					>
						<div
							className={`bg-white w-5 h-5 rounded-full shadow-md transform transition-transform duration-300 ${
								darkMode ? "translate-x-5" : "translate-x-0"
							}`}
						/>
					</div>
					{darkMode ? (
						<p className="text-xs text-gray-700">현재 다크모드 사용중</p>
					) : (
						<p className="text-xs text-gray-300">현재 라이트모드 사용중</p>
					)}
				</section> */}
			</div>
		</>
	);
};

export default TheMenu;
