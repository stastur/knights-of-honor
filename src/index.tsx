import { ChakraProvider } from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";
import { createRoot } from "react-dom/client";

import "./reset.css";
import "./styles.css";
import { game, map } from "./impl";
import { EntityPanel } from "./impl/hud/entity-panel";
import { FrameInfo } from "./impl/hud/fps-info";
import { GameControls } from "./impl/hud/game-controls";
import { KingdomPanel } from "./impl/hud/kingdom-panel";
import { MiniMap } from "./impl/hud/mini-map";
import { Kingdom } from "./impl/kingdom";

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
	const entity =
		game.activeEntityId !== undefined
			? game.entities.get(game.activeEntityId)
			: null;

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

			<div className="absolute bottom-0 left-1/2 -translate-x-1/2">
				{entity && <EntityPanel entity={entity} />}
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
