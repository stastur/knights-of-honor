import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";

import "./styles.css";
import { ProvinceProvider, ProvinceView } from "./province/ProvinceView";
// import { App } from "./App";

import "./game/province";
import { Brest } from "./game/province";
import { store } from "./province/store";

ReactDOM.render(
	<React.StrictMode>
		<Provider store={store}>
			<ProvinceProvider province={Brest}>
				<ProvinceView />
			</ProvinceProvider>
		</Provider>
	</React.StrictMode>,
	document.getElementById("app")
);
