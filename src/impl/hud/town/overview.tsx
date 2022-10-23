import { Box, BoxProps, Center, Heading, SimpleGrid } from "@chakra-ui/react";
import { observer } from "mobx-react-lite";
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
import { Province } from "@app/impl/province";

import { useProvinceContext } from "./town-context";

interface OverviewProps {
	town: Province;
}

export const Overview = observer(
	({ town, ...boxProps }: OverviewProps & BoxProps): JSX.Element => {
		const province = useProvinceContext();

		return (
			<Box {...boxProps}>
				<Heading>{town.name}</Heading>

				<Box width="10rem" marginBottom={2}>
					<IconMeter
						value={province.population.value}
						max={province.population.limit}
						icon={<GiSmart fontSize="1.5rem" />}
					/>
				</Box>

				<SimpleGrid columns={3}>
					<Center>
						<GiPopeCrown /> {province.stats.piety}
					</Center>

					<Center>
						<GiTwoCoins /> {province.stats.gold}
					</Center>

					<Center>
						<GiBookCover /> {province.stats.books}
					</Center>

					<Center>
						<GiWheat /> {province.stats.food}
					</Center>

					<Center>
						<GiHammerNails /> {province.getWorkersCount()}
					</Center>
				</SimpleGrid>

				<Box width="10rem">
					{province.food.value} / {province.food.limit}
					<IconMeter
						value={province.food.value}
						max={province.food.limit}
						icon={<GiWheat fontSize="1.5rem" color="goldenrod" />}
					/>
				</Box>
			</Box>
		);
	}
);
