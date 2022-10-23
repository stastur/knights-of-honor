import { Box, Flex, Grid, GridItem } from "@chakra-ui/react";
import { observer } from "mobx-react-lite";
import React from "react";

import { Marshal } from "../marshal";

interface UnitPanelProps {
	unit: Marshal;
}

export const UnitPanel = observer(({ unit }: UnitPanelProps) => {
	if (unit.kingdom?.playerControlled) {
		return (
			<Flex wrap="nowrap">
				<Grid
					templateColumns="repeat(3, 1fr)"
					border="1px solid black"
					bgColor="white"
				>
					<GridItem colSpan={2} className="unit__name align-middle">
						{unit.name}
					</GridItem>

					<GridItem>
						<Box>
							<img src="images/town.png" />
						</Box>

						<Box>{unit.stats.health}</Box>
					</GridItem>

					<GridItem>skills</GridItem>
				</Grid>

				<Grid border="1px solid black" bgColor="white">
					soldiers
				</Grid>
			</Flex>
		);
	}

	return (
		<Flex wrap="nowrap" bg="white">
			<Box>some info</Box>

			<Box>
				<Box>
					<img src="images/town.png" />
				</Box>

				<Box>{unit.stats.health}</Box>
			</Box>

			<Box>something</Box>
		</Flex>
	);
});
