import React from "react";
import { Box, Flex, HStack, Image } from "@chakra-ui/react";
import { observer } from "mobx-react-lite";

import { TownDevelopmentMenu } from "../town-development-menu";
import { TownGuardsPanel } from "../town-guards-panel";
import { HappinessMenu } from "../happiness-menu";
import { ProvinceInfo } from "../province-info";

import { Tower } from "./tower";

export const ControlPanel = observer((): JSX.Element => {
	return (
		<HStack position="fixed" bottom={0} alignItems="stretch">
			<Tower width="8rem" />

			<Flex flexFlow="column" justifyContent="space-between">
				<HStack>
					<Box>
						<TownDevelopmentMenu>
							<Image src="/images/controls/building.webp" />
						</TownDevelopmentMenu>
					</Box>

					<Box>
						<HappinessMenu>
							<Image src="/images/controls/revolt_risk.webp" />
						</HappinessMenu>
					</Box>
				</HStack>

				<TownGuardsPanel paddingBottom={2} />
			</Flex>

			<ProvinceInfo />

			<Tower width="8rem" />
		</HStack>
	);
});
