import {
	Box,
	BoxProps,
	HStack,
	Slider,
	SliderThumb,
	SliderTrack,
} from "@chakra-ui/react";
import { observer } from "mobx-react-lite";
import React from "react";

import { range } from "@app/utils/util";

import { Kingdom } from "../kingdom";

interface PowerProps {
	kingdom: Kingdom;
}

const gradientColors = [...range(1, 5), ...range(5, 10)]
	.map((v, i) => {
		const color = `hsl(${v * 12}, 100%, 50%)`;

		return `${color} ${i * 10}% ${(i + 1) * 10}%`;
	})
	.join();

export const Power = observer(
	({ kingdom, ...hStackProps }: PowerProps & BoxProps): JSX.Element => {
		return (
			<HStack minW={24} {...hStackProps}>
				<Box>{kingdom.stats.power}</Box>
				<Slider
					aria-label="Kingdom power"
					onClick={kingdom.increasePower}
					isReadOnly
					step={1}
					defaultValue={0}
					value={kingdom.stats.power}
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
	}
);
