import React, { ReactElement } from "react";
import { Box, Flex, FlexProps } from "@chakra-ui/react";

import { Times } from "@app/components/times";

interface IconMeterProps {
	max: number;
	value: number;
	icon: ReactElement;
}

export const IconMeter = ({
	max,
	value,
	icon,
	...boxProps
}: IconMeterProps & FlexProps): JSX.Element => {
	const blocks = max / 10;
	const filled = value / 10;

	return (
		<Flex
			{...boxProps}
			width="full"
			height={3}
			borderRadius="md"
			backgroundColor="gray"
			position="relative"
		>
			<Times n={blocks}>
				{(index) => (
					<Box display="flex" flexGrow={1} position="relative">
						<Box
							position="absolute"
							left="50%"
							top="50%"
							transform="translate(-50%, -50%)"
							visibility={index <= filled ? "visible" : "hidden"}
						>
							{icon}
						</Box>
					</Box>
				)}
			</Times>
		</Flex>
	);
};
