import React from "react";
import { render } from "react-dom";
import { ChakraProvider } from "@chakra-ui/react";

import { baseBuildings } from "@app/core/collections/buildings";
import { ControlPanel } from "@app/modules/province/components/control-panel";
import { DevelopmentManagerObservable } from "@app/observables/development-manager";
import { ProvinceObservable } from "@app/observables/province";
import { KingdomObservable } from "@app/observables/kingdom";

import "./styles.css";

const province = new ProvinceObservable("Brest");
baseBuildings.forEach((b) => province.addBuilding(b));

province.features = ["fishery", "marbleDeposits"];

const developmentManager = new DevelopmentManagerObservable(province);
const kingdom = new KingdomObservable("Belarus");

kingdom.provinces.push(province);

setInterval(() => {
	province.update();
	developmentManager.update();
}, 100);

render(
	<React.StrictMode>
		<ChakraProvider>
			<ControlPanel
				province={province}
				developmentManager={developmentManager}
			/>
		</ChakraProvider>
	</React.StrictMode>,
	document.getElementById("app")
);
