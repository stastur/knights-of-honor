import { observer } from "mobx-react-lite";
import React from "react";

import { useGameContext } from "./game-context";

export const FrameInfo = observer(() => {
	const { frameInfo: info } = useGameContext();

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
});
