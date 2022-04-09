import React from "react";
import { render } from "react-dom";
import { ChakraProvider } from "@chakra-ui/react";

import "@app/modules/i18n";
import { ControlPanel } from "@app/modules/province/components/control-panel";

import { TimerProvider } from "./contexts/timer-context";
import { DevelopmentManagerProvider } from "./contexts/development-context";
import { KingdomProvider } from "./contexts/kingdom-context";
import { ProvinceProvider } from "./contexts/province-context";

import "./styles.css";

render(
	<React.StrictMode>
		<ChakraProvider>
			<TimerProvider interval={100}>
				<KingdomProvider name="Stanland">
					<ProvinceProvider name="Stanwill">
						<DevelopmentManagerProvider>
							<ControlPanel />
						</DevelopmentManagerProvider>
					</ProvinceProvider>
				</KingdomProvider>
			</TimerProvider>
		</ChakraProvider>
	</React.StrictMode>,
	document.getElementById("app")
);
