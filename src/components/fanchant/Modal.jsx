import { useNavigate } from "react-router-dom";

const Modal = ({ isOpen, onClose, fanChant }) => {
	const navigate = useNavigate();

	const clickSong = (song) => {
		navigate("/fanchant/detail", { state: { song, image: fanChant.image } });
	};

	return (
		<>
			{/* 뒷배경 오버레이 */}
			<div
				id="overlay"
				className={`fixed inset-0 z-10 bg-black bg-opacity-10 backdrop-blur-sm transition-opacity duration-300
					${isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
				onClick={onClose}
			/>

			{/* 모달창 */}
			<div
				id="modal"
				className={`fixed py-8 px-6 mx-auto my-auto rounded w-72 h-128 inset-0 flex bg-opacity-80 backdrop-blur-sm flex-col items-center z-20 bg-white transition-opacity duration-300
                    ${isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
			>
				<h1 className="mb-8 text-xl font-bold tracking-tighter">응원법</h1>
				<img
					src={fanChant.image}
					alt={fanChant.album}
					className="w-40 h-40 shadow-default"
				/>
				<h2 className="mt-2 mb-5 text-base font-bold tracking-tight">{fanChant.album}</h2>
				<ul className="flex flex-col gap-2">
					{fanChant.song.map((song, index) => (
						<li
							key={index}
							onClick={() => clickSong(song)}
							className="flex justify-between p-2 text-sm bg-white rounded-sm w-60 bg-opacity-80 backdrop-blur-md "
						>
							<span className="font-bold">{song.title}</span>
							<button className="absolute top-0 right-0 px-2 text-sm font-bold bg-gray-400 rounded-r-sm h-9 ">
								GO
							</button>
						</li>
					))}
				</ul>
			</div>
		</>
	);
};

export default Modal;
