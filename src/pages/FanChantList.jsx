import { useContext, useState } from "react";

import fanChant from "@assets/fan-chant.json";
import TheFooter from "@components/common/TheFooter";
import TheHeader from "@components/common/TheHeader";
import Modal from "@components/fanchant/Modal";
import { HeaderContext } from "@context/HeaderContext";

const FanChantList = () => {
	const [active, setActive] = useState("group");
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [openFanChant, setOpenFanChant] = useState({});
	const { isMenuOpen } = useContext(HeaderContext);

	const openModal = (fc) => {
		setOpenFanChant(fc);
		setIsModalOpen(true);
	};

	const closeModal = () => {
		setIsModalOpen(false);
		setOpenFanChant({});
	};

	const clickGroup = () => {
		setActive("group");
	};

	const clickUnit = () => {
		setActive("unit");
	};

	const filterFanChant = [...fanChant].reverse().filter((fc) => fc.kind === active);

	return (
		<>
			<TheHeader />
			<div id="fan-chant-list">
				{/* 단체 & 유닛 구별 탭 */}
				<section className="flex justify-center gap-2 mx-8 mt-4 mb-8 md:mx-16 md:my-12 lg:w-220 lg:mx-auto">
					<button
						onClick={clickGroup}
						className={`px-2 py-1 text-sm font-bold tracking-tight text-center transition duration-300 rounded md:text-base
							${active === "group" ? "bg-gray-900 text-white" : "bg-gray-200 text-gray-400"}`}
					>
						단체앨범
					</button>
					<button
						onClick={clickUnit}
						className={`px-2 py-1 text-sm font-bold tracking-tight text-center transition duration-300 rounded md:text-base
							${active === "unit" ? "bg-gray-900 text-white" : "bg-gray-200 text-gray-400"}`}
					>
						유닛앨범
					</button>
				</section>

				{/* 앨범 리스트 */}
				<section className="mx-8 my-8 md:mx-16 md:my-12 lg:w-220 lg:mx-auto">
					<ul
						className={`grid grid-cols-2 gap-4 transition-all duration-300 transform md:grid-cols-3 lg:grid-cols-4
						${isMenuOpen ? "relative -z-10" : "relative z-0"}`}
					>
						{filterFanChant.map((fc) => (
							<li
								key={fc.id}
								onClick={() => openModal(fc)}
							>
								<img
									src={fc.image}
									alt={fc.album}
									className="rounded-sm"
								/>
								<p className="my-2 text-sm font-bold tracking-tighter text-center text-gray-1000">
									{fc.album}
								</p>
							</li>
						))}
					</ul>
				</section>
			</div>
			<TheFooter />

			{/* 모달창 */}
			{isModalOpen && openFanChant && (
				<Modal
					isOpen={isModalOpen}
					onClose={closeModal}
					fanChant={openFanChant}
				/>
			)}
		</>
	);
};

export default FanChantList;
