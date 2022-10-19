import { Box, BoxProps, Center, Heading, SimpleGrid } from "@chakra-ui/react";
import React from "react";
import {
	GiBookCover,
	GiHammerNails,
	GiPopeCrown,
	GiSmart,
	GiTwoCoins,
	GiWheat,
} from "react-icons/gi";

import { IconMeter } from "@app/components/icon-meter";
import { Town } from "@app/impl/town";

interface OverviewProps {
	town: Town;
}

export const Overview = ({
	town,
	...boxProps
}: OverviewProps & BoxProps): JSX.Element => {
	return (
		<Box {...boxProps}>
			<Heading>{town.id}</Heading>

			<Box width="10rem" marginBottom={2}>
				<IconMeter value={100} max={100} icon={<GiSmart fontSize="1.5rem" />} />
			</Box>

			<SimpleGrid columns={3}>
				<Center>
					<GiPopeCrown /> piety
				</Center>

				<Center>
					<GiTwoCoins /> gold
				</Center>

				<Center>
					<GiBookCover /> books
				</Center>

				<Center>
					<GiWheat /> food
				</Center>

				<Center>
					<GiHammerNails /> workers
				</Center>
			</SimpleGrid>

			<Box width="10rem">
				food.value / food.limit
				<IconMeter
					value={100}
					max={200}
					icon={<GiWheat fontSize="1.5rem" color="goldenrod" />}
				/>
			</Box>
		</Box>
	);
};
