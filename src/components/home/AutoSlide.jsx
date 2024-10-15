import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "@css/AutoSlide.css";

const AutoSlide = ({ musicVideo }) => {
	const settings = {
		dots: true,
		infinite: true,
		speed: 1000,
		autoplay: true,
		autoplaySpeed: 6000,
		pauseOnHover: true,
		slidesToShow: 1,
		slidesToScroll: 1,
		arrows: false,
	};

	return (
		<>
			{musicVideo && (
				<Slider {...settings}>
					{musicVideo.reverse().map((mv) => (
						<div
							key={mv.id}
							id="music-video"
							className="relative -z-10 rounded-sm w-full overflow-hidden pb-[56.25%]"
						>
							<iframe
								className="absolute top-0 left-0 w-full h-full"
								width="100%"
								height="56.25%"
								src={mv.link}
								frameBorder="0"
							/>
						</div>
					))}
				</Slider>
			)}
		</>
	);
};

export default AutoSlide;
