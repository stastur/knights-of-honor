import React from "react";
import { observer } from "mobx-react-lite";
import { Box, HStack } from "@chakra-ui/react";

import { GiBookCover, GiCoins, GiPopeCrown } from "react-icons/gi";

import { useFinanceManager } from "@app/contexts/finance-context";
import { useKingdom } from "@app/contexts";

export const Treasury = observer((): JSX.Element => {
	const financeManager = useFinanceManager();
	const { gold } = useKingdom();

	return (
		<HStack>
			<Box>
				<GiPopeCrown /> {financeManager.piety}
			</Box>

			<Box>
				<GiBookCover /> {financeManager.books}
			</Box>

			<Box>
				<GiCoins /> {financeManager.gold} ({(gold >= 0 ? "+" : "-") + gold})
			</Box>
		</HStack>
	);
});
