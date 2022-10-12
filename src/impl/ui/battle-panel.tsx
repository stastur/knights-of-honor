import { Box, Flex } from "@chakra-ui/react";
import React from "react";

import { Battle } from "../battle";

interface BattlePanelProps {
	battle: Battle;
}

export const BattlePanel = ({ battle }: BattlePanelProps) => {
	return (
		<Flex wrap="nowrap">
			<Box>{battle.sideA.stats.health}</Box>

			<Box padding="1">X</Box>

			<Box>{battle.sideB.stats.health}</Box>
		</Flex>
	);
};
