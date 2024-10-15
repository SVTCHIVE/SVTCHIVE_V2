// lrcToJson.js
// lrcToJson.js
export const lrcToJson = (lrcContent) => {
	const lyrics = [];
	const lines = lrcContent.split("\n");

	lines.forEach((line) => {
		const match = line.match(/\[(\d{2}):(\d{2}\.\d{1,})\](.*)/);
		if (match) {
			const minutes = parseInt(match[1]);
			const seconds = parseFloat(match[2]);
			let text = match[3].trim();
			const totalSeconds = minutes * 60 + seconds;

			const formattedText = text
				.split("*")
				.map((part, index) => {
					return index % 2 === 1 ? `<span class="text-svtblue">${part}</span>` : part;
				})
				.join("");

			const linesArray = formattedText
				.split("\\")
				.map((line) => line.trim())
				.filter((line) => line)
				.map((line) => `<div>${line}</div>`)
				.join("");

			lyrics.push({ time: totalSeconds, text: linesArray });
		}
	});

	return lyrics;
};

// LRC 파일을 읽어오는 함수
export const readLrcFile = (file) => {
	return new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.onload = (event) => {
			const content = event.target.result;
			resolve(lrcToJson(content));
		};
		reader.onerror = (error) => reject(error);
		reader.readAsText(file);
	});
};
