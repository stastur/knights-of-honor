import React from "react";
import { render } from "react-dom";
import { ChakraProvider } from "@chakra-ui/react";

import "@app/modules/i18n";
import { ControlPanel } from "@app/modules/province/components/control-panel";
import { Panel } from "@app/modules/kingdom/panel";

import {
	TimerProvider,
	DevelopmentManagerProvider,
	KingdomProvider,
	ProvinceProvider,
	FinanceManagerProvider,
} from "@app/contexts";

import "./styles.css";

render(
	<React.StrictMode>
		<ChakraProvider>
			<TimerProvider interval={100}>
				<KingdomProvider name="Stanland">
					<FinanceManagerProvider>
						<Panel />
						<ProvinceProvider name="Stanwill">
							<DevelopmentManagerProvider>
								<ControlPanel />
							</DevelopmentManagerProvider>
						</ProvinceProvider>
					</FinanceManagerProvider>
				</KingdomProvider>
			</TimerProvider>
		</ChakraProvider>
	</React.StrictMode>,
	document.getElementById("app")
);
