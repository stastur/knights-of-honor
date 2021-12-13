import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";

import { ProvinceView } from "./province/ProvinceView";
import { store } from "./province/store";
import { DebugMap } from "./generation/DebugMap";

import "./styles.css";
import { MapView } from "./generation/MapView";

ReactDOM.render(
	<React.StrictMode>
		<Provider store={store}>
			<MapView />
			{/* <DebugMap /> */}
			<ProvinceView />
		</Provider>
	</React.StrictMode>,
	document.getElementById("app")
);
