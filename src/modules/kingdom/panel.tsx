import { Box, Flex } from "@chakra-ui/react";
import React from "react";

import { Power } from "./power";
import { TimerControls } from "./timer-controls";
import { Treasury } from "./treasury";

export const Panel = (): JSX.Element => {
	return (
		<Flex justifyContent="space-between">
			<Box>
				<Power />
				<TimerControls />
			</Box>

			<Box>Royal court</Box>

			<Box>
				<Treasury />
			</Box>
		</Flex>
	);
};
