import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";

import { ProvinceView } from "./province/ProvinceView";
import { store } from "./province/store";
import { DebugMap } from "./generation/DebugMap";

import "./styles.css";

ReactDOM.render(
	<React.StrictMode>
		<Provider store={store}>
			<DebugMap />
			<ProvinceView />
		</Provider>
	</React.StrictMode>,
	document.getElementById("app")
);
