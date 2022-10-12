import { Box, Flex } from "@chakra-ui/react";
import React from "react";

import { Town } from "../town";

interface TownPanelProps {
	town: Town;
	onMarshalFocus: () => void;
}

export const TownPanel = ({ town, onMarshalFocus }: TownPanelProps) => {
	return (
		<Flex wrap="nowrap">
			<Box>buildings+guards</Box>

			<Box>
				<Box>town</Box>
			</Box>

			{town.marshal && (
				<Box cursor="pointer" onClick={onMarshalFocus}>
					marshal
				</Box>
			)}
		</Flex>
	);
};
