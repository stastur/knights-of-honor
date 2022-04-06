import React from "react";
import { Box, BoxProps } from "@chakra-ui/react";

export const Tower = (props: BoxProps): JSX.Element => {
	return (
		<Box
			{...props}
			borderColor="gray"
			borderWidth={10}
			backgroundClip="padding-box"
			backgroundColor="gray"
			borderTopStyle="dashed"
		/>
	);
};
