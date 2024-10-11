import { useLocation, useNavigate } from "react-router-dom";
import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { HeaderContext } from "@context/HeaderContext";
import { Pause, Play } from "@phosphor-icons/react";
import TheHeader from "@components/common/TheHeader";
import YouTube from "react-youtube";
import { lrcToJson } from "@utils/lrc-to-json";

const FanChantDetail = () => {
	const location = useLocation();
	const navigate = useNavigate();
	const { song, image } = location.state || {};
	const { isMenuOpen } = useContext(HeaderContext);
	const [isPlaying, setIsPlaying] = useState(false); // 재생 상태
	const [currentTime, setCurrentTime] = useState(0); // 현재 시간
	const [duration, setDuration] = useState(0); // 노래 길이
	const [lyrics, setLyrics] = useState([]); // 가사 상태
	const [activeIndex, setActiveIndex] = useState(-1);
	const playRef = useRef(null);
	const barRef = useRef(null);

	// 재생 준비가 완료되었을 떄 호출되는 함수
	const onPlayerReady = (event) => {
		setDuration(event.target.getDuration());
		playRef.current = event.target;
	};

	// 재생 상태 변경 시 호출되는 함수
	const onPlayerStateChange = (event) => {
		if (event.data === window.YT.PlayerState.PLAYING) {
			setIsPlaying(true);

			const updateCurrentTime = () => {
				if (playRef.current) setCurrentTime(playRef.current.getCurrentTime());
			};
			const interval = setInterval(updateCurrentTime, 1000);

			return () => clearInterval(interval);
		} else if (event.data === window.YT.PlayerState.PAUSED) {
			setIsPlaying(false);
		} else if (event.data === window.YT.PlayerState.ENDED) {
			setIsPlaying(false);
			setCurrentTime(0);
			playRef.current.seekTo(0);
			playRef.current?.pauseVideo();
		}
	};

	const clickPlay = () => {
		playRef.current?.playVideo();
	};

	const clickPause = () => {
		playRef.current?.pauseVideo();
	};

	// 재생 바 클릭 시
	const clickProgressBar = (event) => {
		const { clientX } = event.touches ? event.touches[0] : event;
		const { left, width } = barRef.current.getBoundingClientRect();
		const offSetX = clientX - left;
		const newTime = (offSetX / width) * duration;
		playRef.current.seekTo(newTime);
		setCurrentTime(newTime);
	};

	// 재생 바 드래그 시작
	const handleProgressBarDown = (event) => {
		event.stopPropagation();
		clickProgressBar(event);
		document.addEventListener("mousemove", handleProgressBarMove);
		document.addEventListener("mouseup", handleProgressBarUp);
		document.addEventListener("touchmove", handleProgressBarMove);
		document.addEventListener("touchend", handleProgressBarUp);
	};

	// 재생 바 드래그 중
	const handleProgressBarMove = (event) => {
		event.preventDefault();
		clickProgressBar(event);
	};

	// 재생 바 드래그 종료
	const handleProgressBarUp = () => {
		document.removeEventListener("mousemove", handleProgressBarMove);
		document.removeEventListener("mouseup", handleProgressBarUp);
		document.removeEventListener("touchmove", handleProgressBarMove);
		document.removeEventListener("touchend", handleProgressBarUp);
	};

	// LRC 파일 가져오기
	const getLrcFile = useCallback(async () => {
		try {
			const response = await fetch(`/lyrics/${song.fileName}.lrc`);
			const lrcContent = await response.text();
			const lyricsData = lrcToJson(lrcContent);
			setLyrics(lyricsData);
		} catch (error) {
			console.error(error);
		}
	}, [song.fileName]);

	// 가사 활성화
	const updateActiveLyrics = useCallback(
		(currentTime) => {
			const index = lyrics.findIndex((lyric) => currentTime < lyric.time);
			setActiveIndex(index === -1 ? lyrics.length - 1 : index - 1);
		},
		[lyrics],
	);

	useEffect(() => {
		getLrcFile();
	}, [getLrcFile]);

	useEffect(() => {
		updateActiveLyrics(currentTime);
	}, [currentTime, updateActiveLyrics]);

	const opts = {
		width: "100%",
		height: "auto",
		playerVars: {
			autoplay: 0,
			rel: 0,
			modestbranding: 1,
			fs: 0,
		},
	};

	const clickMain = () => {
		navigate("/");
	};

	const clickList = () => {
		navigate("/fanchant");
	};

	return (
		<>
			{/* 배경 */}
			<div>
				<div
					id="overlay"
					className="fixed inset-0 -z-10 bg-light-bg bg-opacity-60 backdrop-blur-md"
				/>
				<img
					src={image}
					alt={song.title}
					className="fixed object-cover w-full h-full -z-20"
				/>
			</div>

			{/* 요소 */}
			{/* 헤더 */}
			<TheHeader />
			<div className="flex flex-col h-screen lg:w-220 lg:mx-auto">
				{/* 썸네일 및 음악파일 */}
				<div className={`relative lg:w-160 mx-auto w-screen ${isMenuOpen ? "relative -z-10" : "relative z-0"}`}>
					<button
						onClick={isPlaying ? clickPause : clickPlay}
						className="absolute p-4 -translate-x-1/2 -translate-y-1/2 bg-black rounded-full top-1/2 left-1/2 bg-opacity-40"
					>
						{isPlaying ? (
							<Pause
								size={40}
								weight="fill"
								color="#FFFFFF"
							/>
						) : (
							<Play
								size={40}
								weight="fill"
								color="#FFFFFF"
							/>
						)}
					</button>
					<img
						src={image}
						alt={song.title}
					/>
					<YouTube
						videoId={song.resource.split("/embed/")[1]}
						opts={opts}
						onReady={onPlayerReady}
						onStateChange={onPlayerStateChange}
						style={{ display: "none" }}
					/>
				</div>

				{/* 음악 관련 정보 및 기타 */}
				<div className="flex-grow">
					{/* 곡 재생 옵션 */}
					<section className="mx-6 mt-6 mb-4">
						<div>
							<div
								ref={barRef}
								className="relative w-full h-[6px] rounded-sm bg-[#444444] mix-blend-overlay"
								onMouseDown={handleProgressBarDown}
							>
								<div
									className="absolute z-10 h-[6px] bg-black rounded-sm mix-blend-overlay"
									style={{ width: `${(currentTime / duration) * 100}%` }}
								/>
							</div>
						</div>
						<div className="flex justify-between mt-1 text-sm font-extrabold tracking-tighter text-black text-opacity-60">
							<span>{`${Math.floor(currentTime / 60)}:${("0" + Math.floor(currentTime % 60)).slice(
								-2,
							)}`}</span>
							<span>{`${Math.floor(duration / 60)}:${("0" + Math.floor(duration % 60)).slice(-2)}`}</span>
						</div>
					</section>

					{/* 가사 */}
					<section className="flex flex-col items-center gap-1 overflow-y-auto h-96 min-h-96">
						{lyrics.map((lyric, index) => (
							<p
								key={index}
								className={`${
									index === activeIndex
										? "text-gray-1000 text-lg font-extrabold"
										: "text-gray-1000 text-sm text-opacity-50 font-bold"
								} tracking-tighter text-center transition-all duration-200`}
								dangerouslySetInnerHTML={{ __html: lyric.text }}
							/>
						))}
					</section>

					{/* 버튼 및 곡정보 */}
					<section className="z-20 flex items-center justify-between mx-4 my-5 b-0">
						<button
							onClick={clickMain}
							className="h-6 px-2 text-xs font-bold tracking-tight bg-white rounded-sm md:h-8 md:text-sm bg-opacity-20 backdrop-blur-3xl"
						>
							메인메뉴
						</button>
						<div className="flex flex-col items-center">
							<p className="text-base md:text-lg font-bold tracking-tighter text-gray-1000 overflow-hidden whitespace-nowrap overflow-ellipsis xs:max-w-[160px]">
								{song.title}
							</p>
							<span className="text-xs tracking-tighter text-opacity-60">NOW PLAY</span>
						</div>
						<button
							onClick={clickList}
							className="h-6 px-2 text-xs font-bold tracking-tight bg-white rounded-sm md:h-8 md:text-sm bg-opacity-20 backdrop-blur-3xl"
						>
							앨범목록
						</button>
					</section>
				</div>
			</div>
		</>
	);
};

export default FanChantDetail;
