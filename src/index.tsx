import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";

import { ProvinceView } from "./province/ProvinceView";
import { store } from "./province/store";
import { Map } from "./generation_v3/map";

import "./styles.css";
import { MapView } from "./generation/MapView";
import { MainMenu } from "./pages/main-menu";
import { Profile } from "./modules/user-profile";
import { View } from "./core/examples/new-entities";

const root = createRoot(document.getElementById("app") as HTMLElement);
root.render(
	<React.StrictMode>
		<Provider store={store}>
			<View />
			{/* <Profile /> */}
			{/* <MainMenu /> */}
		</Provider>
	</React.StrictMode>
);
