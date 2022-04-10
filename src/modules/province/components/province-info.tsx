import React from "react";
import { observer } from "mobx-react-lite";
import { Box, BoxProps, Center, Heading, SimpleGrid } from "@chakra-ui/react";
import {
	GiBookCover,
	GiHammerNails,
	GiPopeCrown,
	GiSmart,
	GiTwoCoins,
	GiWheat,
} from "react-icons/gi";

import { IconMeter } from "@app/components/icon-meter";
import { useProvince } from "@app/contexts";

export const ProvinceInfo = observer((props: BoxProps): JSX.Element => {
	const province = useProvince();

	return (
		<Box {...props}>
			<Heading>{province.name}</Heading>

			<Box width="10rem" marginBottom={2}>
				<IconMeter value={100} max={100} icon={<GiSmart fontSize="1.5rem" />} />
			</Box>

			<SimpleGrid columns={3}>
				<Center>
					<GiPopeCrown /> {province.piety}
				</Center>

				<Center>
					<GiTwoCoins /> {province.gold}
				</Center>

				<Center>
					<GiBookCover /> {province.books}
				</Center>

				<Center>
					<GiWheat /> {province.food}
				</Center>

				<Center>
					<GiHammerNails /> {province.workers}
				</Center>
			</SimpleGrid>

			<Box width="10rem">
				{province.foodStorage.value}/{province.foodStorage.limit}
				<IconMeter
					value={province.foodStorage.value}
					max={province.foodStorage.limit}
					icon={<GiWheat fontSize="1.5rem" color="goldenrod" />}
				/>
			</Box>
		</Box>
	);
});
