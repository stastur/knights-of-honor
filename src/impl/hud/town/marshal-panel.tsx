import { Avatar, Box, BoxProps, Grid } from "@chakra-ui/react";
import { observer } from "mobx-react-lite";
import React from "react";

import { Times } from "@app/components/times";
import { Marshal } from "@app/impl/marshal";

interface MarshalPanelPanel {
	marshal?: Marshal;
}

export const MarshalPanel = observer(
	({ marshal, ...boxProps }: MarshalPanelPanel & BoxProps): JSX.Element => {
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
	}
);
