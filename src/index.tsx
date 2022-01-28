import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";

import { ProvinceView } from "./province/ProvinceView";
import { store } from "./province/store";
import { Map } from "./generation_v3/map";

import "./styles.css";
import { MapView } from "./generation/MapView";

ReactDOM.render(
	<React.StrictMode>
		<Provider store={store}>
			<Map />
			{/* <MapView />
			<DebugMap /> */}
			<ProvinceView />
		</Provider>
	</React.StrictMode>,
	document.getElementById("app")
);
