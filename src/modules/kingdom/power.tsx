import React from "react";
import {
	Box,
	BoxProps,
	HStack,
	Slider,
	SliderThumb,
	SliderTrack,
} from "@chakra-ui/react";

import { range } from "@app/utils";

const gradientColors = [...range(1, 5), ...range(5, 10)]
	.map((v, i) => {
		const color = `hsl(${v * 12}, 100%, 50%)`;

		return `${color} ${i * 10}% ${(i + 1) * 10}%`;
	})
	.join();

export const Power = (props: BoxProps): JSX.Element => {
	const [power, setPower] = React.useState(0);

	return (
		<HStack minW={24} {...props}>
			<Box>{power}</Box>
			<Slider
				aria-label="Kingdom power"
				onClick={() => setPower((p) => Math.min(p + 1, 5))}
				isReadOnly
				step={1}
				defaultValue={0}
				value={power}
				min={-5}
				max={5}
				flexGrow={1}
			>
				<SliderTrack
					height="full"
					bgGradient={`linear(to-r, ${gradientColors})`}
				/>
				<SliderThumb
					top="100%"
					borderRadius="none"
					bgColor="goldenrod"
					boxShadow="0 0 0 1px black"
					clipPath="polygon(50% 0%, 0% 100%, 100% 100%)"
				/>
			</Slider>
		</HStack>
	);
};
