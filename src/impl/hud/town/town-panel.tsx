import {
	// Box,
	// Flex,
	HStack,
	// Image
} from "@chakra-ui/react";
import React from "react";

import { Town } from "@app/impl/town";

// import { DevelopmentMenu } from "./development-menu";
// import { GuardsPanel } from "./guards-panel";
// import { HappinessMenu } from "./happiness-menu";
import { MarshalPanel } from "./marshal-panel";
import { Overview } from "./overview";

interface TownPanelProps {
	town: Town;
}

export const TownPanel = (props: TownPanelProps) => {
	return (
		<HStack alignItems="stretch">
			{/* <Flex flexFlow="column" justifyContent="space-between">
				<HStack>
					<Box>
						<DevelopmentMenu>
							<Image src="/images/_koh/controls/building.webp" />
						</DevelopmentMenu>
					</Box>

					<Box>
						<HappinessMenu>
							<Image src="/images/_koh/controls/revolt_risk.webp" />
						</HappinessMenu>
					</Box>
				</HStack>

				<GuardsPanel paddingBottom={2} />
			</Flex> */}

			<Overview town={props.town} />

			<MarshalPanel marshal={props.town.marshal} />
		</HStack>
	);
};
