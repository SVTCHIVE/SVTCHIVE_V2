import { Link } from "react-router-dom";

import musicVideo from "@assets/music-video.json";
import TheHeader from "@components/common/TheHeader";
import AutoSlide from "@components/home/AutoSlide";
import TheFooter from "@components/common/TheFooter";

const Home = () => {
	return (
		<>
			<TheHeader />
			<div
				id="home"
				className="mb-20 md:mb-24"
			>
				{/* 메뉴 */}
				<section className="mx-8 mt-4 mb-8 md:mx-16 md:my-12 lg:w-220 lg:mx-auto">
					<ul className="grid grid-cols-3 grid-rows-2 gap-2 md:gap-4">
						<li className="py-8 text-center">
							<p className="mb-1 font-bold tracking-tighter">메뉴</p>
							<p className="text-xs font-medium tracking-tight text-gray-300">MENU</p>
						</li>
						<Link to="/fanchant">
							<li className="py-8 text-center bg-white rounded-sm">
								<p className="mb-1 font-bold tracking-tighter">응원법</p>
								<p className="text-xs font-medium tracking-tight text-gray-300">Fanchant</p>
							</li>
						</Link>
						<Link to="">
							<li className="py-8 text-center bg-white rounded-sm">
								<p className="mb-1 font-bold tracking-tighter">총공팀</p>
								<p className="text-xs font-medium tracking-tight text-gray-300">SVT_STREAM</p>
							</li>
						</Link>
						<Link to="">
							<li className="py-8 text-center bg-white rounded-sm">
								<p className="mb-1 font-bold tracking-tighter">가이드</p>
								<p className="text-xs font-medium tracking-tight text-gray-300">Guide</p>
							</li>
						</Link>
						<Link to="">
							<li className="py-8 text-center bg-white rounded-sm">
								<p className="mb-1 font-bold tracking-tighter">아카이브</p>
								<p className="text-xs font-medium tracking-tight text-gray-300">Archive</p>
							</li>
						</Link>
						<Link to="">
							<li className="py-8 text-center bg-white rounded-sm">
								<p className="mb-1 font-bold tracking-tighter">셉플리</p>
								<p className="text-xs font-medium tracking-tight text-gray-300">#SVT_Playlist</p>
							</li>
						</Link>
					</ul>
				</section>

				{/* 투표 */}
				<section className="mx-8 my-8 md:mx-16 md:my-12 lg:w-220 lg:mx-auto">
					<AutoSlide />
					<div>
						<ul className="flex flex-col gap-2 md:gap-4">
							<Link to="">
								<li className="p-3 text-sm font-bold tracking-tight text-gray-900 bg-white">
									멜론 주간인기상
								</li>
							</Link>
							<Link to="">
								<li className="p-3 text-sm font-bold tracking-tight text-gray-900 bg-white">
									엠카운트다운 사전투표
								</li>
							</Link>
							<Link to="">
								<li className="p-3 text-sm font-bold tracking-tight text-gray-900 bg-white">
									음악중심 사전투표
								</li>
							</Link>
							<Link to="">
								<li className="p-3 text-sm font-bold tracking-tight text-gray-900 bg-white">
									인기가요 사전투표
								</li>
							</Link>
						</ul>
					</div>
				</section>

				{/* 뮤직비디오 */}
				<section className="relative mx-8 my-8 -z-10 md:mx-16 md:my-12 lg:w-220 lg:mx-auto">
					<AutoSlide musicVideo={musicVideo} />
				</section>
			</div>
			<TheFooter />
		</>
	);
};

export default Home;
