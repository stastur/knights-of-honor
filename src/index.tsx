import { ChakraProvider } from "@chakra-ui/react";
import { observer } from "mobx-react-lite";
import React from "react";
import { createRoot } from "react-dom/client";

import "./modules/i18n";
import "./reset.css";
import "./styles.css";

import "./impl/realms";

import { game } from "./impl";
import { GameProvider } from "./impl/hud/game-context";
import { MiniMap } from "./impl/hud/mini-map";
// import { EntityPanel } from "./impl/hud/entity-panel";
// import { FrameInfo } from "./impl/hud/fps-info";
// import { GameControls } from "./impl/hud/game-controls";
// import { KingdomPanel } from "./impl/hud/kingdom-panel";
// import { Kingdom } from "./impl/kingdom";

const App = observer(() => {
	// const kingdom = [...game.entities.values()].find(
	// 	(entity) => entity instanceof Kingdom && entity.playerControlled
	// ) as Kingdom;

	// const entity =
	// 	game.activeEntityId !== undefined
	// 		? game.entities.get(game.activeEntityId)
	// 		: null;

	return (
		<>
			<GameProvider value={game}>
				{/* <div className="absolute top-0 left-0 right-0 flex justify-center m-auto">
					<KingdomPanel kingdom={kingdom} />
				</div>

				<div className="absolute top-0 left-0">
					<GameControls game={game} />
				</div>

				<div className="absolute top-0 right-0">
					<FrameInfo />
				</div> */}

				<div className="absolute bottom-0 right-0">
					<MiniMap />
				</div>

				{/* <div className="absolute bottom-0 left-1/2 -translate-x-1/2">
					{entity && <EntityPanel entity={entity} />}
				</div> */}
			</GameProvider>
		</>
	);
});

const root = createRoot(document.getElementById("app")!);
root.render(
	<React.StrictMode>
		<ChakraProvider>
			<App />
		</ChakraProvider>
	</React.StrictMode>
);
