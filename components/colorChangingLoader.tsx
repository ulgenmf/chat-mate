import React, { useEffect, useState } from "react";
import { BeatLoader } from "react-spinners";

const ColorChangingLoader = () => {
	const colors = [
		"#c800ff",
		"#ffffff",
		"#00d9ff",
		"#ffffff",
		"#00ff73",
		"#ffffff",
		"#ff7300",
		"#bfff00",
		"#ffffff",
		"#00ff88",
		"#ffffff",
		"#00ffd0",
		"#ffffff",
	];

	const [colorIndex, setColorIndex] = useState(0);

	useEffect(() => {
		const intervalId = setInterval(() => {
			setColorIndex((prevIndex) => (prevIndex + 1) % 13);
		}, 800);

		return () => {
			clearInterval(intervalId);
		};
	}, []);

	const currentColor = colors[colorIndex];

	return (
		<BeatLoader
			size={7}
			className="duration-500 transition-color"
			color={currentColor}
		/>
	);
};

export default ColorChangingLoader;
