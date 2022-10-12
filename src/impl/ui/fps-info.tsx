import React from "react";

import { Game } from "../game";

interface FrameInfoProps {
	info: Game["frameInfo"];
}

export const FrameInfo = ({ info }: FrameInfoProps) => {
	let color = "white";

	if (info.fps > 55) {
		color = "green";
	} else if (info.fps > 30) {
		color = "orange";
	} else {
		color = "red";
	}

	return (
		<div className="font-bold p-1 bg-white" style={{ color }}>
			FPS: {info.fps}
		</div>
	);
};
