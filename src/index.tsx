import { ChakraProvider } from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";
import { createRoot } from "react-dom/client";

import "./reset.css";
import "./styles.css";
import { game, map } from "./impl";
import { Kingdom } from "./impl/kingdom";
import { FrameInfo } from "./impl/ui/fps-info";
import { GameControls } from "./impl/ui/game-controls";
import { KingdomPanel } from "./impl/ui/kingdom-panel";
import { MiniMap } from "./impl/ui/mini-map";

const App = () => {
	const [_, set] = useState(0);

	useEffect(() => {
		game.hooks.onUpdate = () => set((c) => c + 1);

		return () => {
			game.hooks = {};
		};
	}, []);

	const kingdom = [...game.entities.values()].find(
		(entity) => entity instanceof Kingdom && entity.playerControlled
	) as Kingdom;

	const miniature = useRef(map.createMiniature(0.01));

	return (
		<>
			<div className="absolute top-0 left-0 right-0 flex justify-center m-auto">
				<KingdomPanel kingdom={kingdom} />
			</div>

			<div className="absolute top-0 left-0">
				<GameControls game={game} />
			</div>

			<div className="absolute top-0 right-0">
				<FrameInfo info={game.frameInfo} />
			</div>

			<div className="absolute bottom-0 right-0">
				<MiniMap camera={game.camera} miniature={miniature.current} />
			</div>
		</>
	);
};

const root = createRoot(document.getElementById("app")!);
root.render(
	<React.StrictMode>
		<ChakraProvider>
			<App />
		</ChakraProvider>
	</React.StrictMode>
);
