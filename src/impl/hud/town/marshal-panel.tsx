import { Avatar, Box, BoxProps, Grid } from "@chakra-ui/react";
import React from "react";

import { Times } from "@app/components/times";
import { Unit } from "@app/impl/unit";

interface MarshalPanelPanel {
	marshal?: Unit;
}

export const MarshalPanel = ({
	marshal,
	...boxProps
}: MarshalPanelPanel & BoxProps): JSX.Element => {
	return (
		<Box {...boxProps}>
			<Box>
				<Avatar name={marshal?.name} />
			</Box>

			<Grid
				gridTemplateColumns="repeat(3, 4.5rem)"
				gridTemplateRows="repeat(3, 3rem)"
				gap={2}
			>
				<Times n={9}>
					<Box width="full" height="full" backgroundColor="gray.100" />
				</Times>
			</Grid>
		</Box>
	);
};
