import React from "react";

import { Game } from "../game";

interface GameControlsProps {
	game: Game;
}

export const GameControls = ({ game }: GameControlsProps) => {
	return (
		<button onClick={() => (game.isRunning = !game.isRunning)}>
			{game.isRunning ? "pause" : "resume"}
		</button>
	);
};
