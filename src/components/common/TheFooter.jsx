import { Link } from "react-router-dom";

const TheFooter = () => {
	return (
		<div
			id="footer"
			className="flex items-center justify-between mx-8 my-10 lg:w-240 lg:my-10 lg:mx-auto"
		>
			{/* 버튼 */}
			<section>
				<ul className="flex gap-1">
					<Link to="">
						<li className="px-2 py-2 text-sm font-bold bg-gray-200 rounded-sm">메일</li>
					</Link>
					<Link to="">
						<li className="px-2 py-2 text-sm font-bold bg-gray-200 rounded-sm">트위터</li>
					</Link>
					<Link to="">
						<li className="px-2 py-2 text-sm font-bold bg-gray-200 rounded-sm">로고</li>
					</Link>
				</ul>
			</section>

			{/* 계정 정보 */}
			<section>
				<p className="text-xs font-bold tracking-tighter text-right">SVTCHIVE.kr</p>
				<p className="text-xs font-normal tracking-tighter text-right">@SEVENTEENCHIVE</p>
			</section>
		</div>
	);
};

export default TheFooter;
