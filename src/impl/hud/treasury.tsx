import { Center, HStack } from "@chakra-ui/react";
import React from "react";

import { GiBookCover, GiCoins, GiPopeCrown } from "react-icons/gi";

export const Treasury = (): JSX.Element => {
	return (
		<HStack>
			<Center>
				<GiPopeCrown /> piety
			</Center>

			<Center>
				<GiBookCover /> books
			</Center>

			<Center>
				<GiCoins /> gold
			</Center>
		</HStack>
	);
};
