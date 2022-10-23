import { Box, Grid, GridProps } from "@chakra-ui/react";
import { observer } from "mobx-react-lite";
import React from "react";

import { Times } from "@app/components/times";

export const GuardsPanel = observer((props: GridProps): JSX.Element => {
	return (
		<Grid
			{...props}
			gridTemplateColumns="repeat(3, 4.5rem)"
			gridTemplateRows="repeat(2, 3rem)"
			gap={2}
		>
			<Times n={6}>
				<Box width="full" height="full" backgroundColor="gray.100" />
			</Times>
		</Grid>
	);
});
