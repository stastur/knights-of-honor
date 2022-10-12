import { Box, Flex, Grid, GridItem } from "@chakra-ui/react";
import React from "react";

import { Unit } from "../unit";

interface UnitPanelProps {
	unit: Unit;
}

export const UnitPanel = ({ unit }: UnitPanelProps) => {
	return (
		<Flex wrap="nowrap">
			<Grid
				templateColumns="repeat(2, 1fr)"
				border="1px solid black"
				bgColor="white"
			>
				<GridItem colSpan={2} className="unit__name">
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
};
