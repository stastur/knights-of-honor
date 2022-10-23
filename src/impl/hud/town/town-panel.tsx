import { Box, Flex, HStack, Image } from "@chakra-ui/react";
import { observer } from "mobx-react-lite";
import React from "react";

import { Province } from "@app/impl/province";

import { DevelopmentMenu } from "./development-menu";
import { GuardsPanel } from "./guards-panel";
import { HappinessMenu } from "./happiness-menu";
import { MarshalPanel } from "./marshal-panel";
import { Overview } from "./overview";
import { ProvinceContext } from "./town-context";

interface TownPanelProps {
	town: Province;
}

export const TownPanel = observer((props: TownPanelProps) => {
	return (
		<ProvinceContext value={props.town}>
			<HStack alignItems="stretch">
				<Flex flexFlow="column" justifyContent="space-between">
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
				</Flex>

				<Overview town={props.town} />

				<MarshalPanel marshal={props.town.marshal} />
			</HStack>
		</ProvinceContext>
	);
});
