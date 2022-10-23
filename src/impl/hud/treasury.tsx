import { Center, HStack } from "@chakra-ui/react";
import { observer } from "mobx-react-lite";
import React from "react";

import { GiBookCover, GiCoins, GiPopeCrown } from "react-icons/gi";

import { Kingdom } from "../kingdom";

interface TreasuryProps {
	kingdom: Kingdom;
}

export const Treasury = observer(({ kingdom }: TreasuryProps): JSX.Element => {
	return (
		<HStack>
			<Center>
				<GiPopeCrown /> {kingdom.stats.piety}
			</Center>

			<Center>
				<GiBookCover /> {kingdom.stats.books}
			</Center>

			<Center>
				<GiCoins /> {kingdom.stats.gold}
			</Center>
		</HStack>
	);
});
