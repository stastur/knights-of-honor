import { Box, Grid, useDisclosure } from "@chakra-ui/react";
import { observer } from "mobx-react-lite";
import React from "react";

import { Times } from "@app/components/times";

import { AvailableImprovementsMenu } from "./available-improvements";
import { BuildingCell } from "./building-cell";
import { ControlBox, useControlBox } from "./control-box";
import { useProvinceContext } from "./town-context";

const MAX_BUILDINGS = 18;

export const BuildingsPanel = observer((): JSX.Element => {
	const { isOpen, onClose, onToggle } = useDisclosure();
	const { improvements } = useProvinceContext();
	const { itemsToBeRemoved, ...controlBoxProps } = useControlBox();

	return (
		<AvailableImprovementsMenu
			placement="right-end"
			isOpen={isOpen}
			onClose={onClose}
		>
			<Grid
				position="relative"
				templateColumns="repeat(3, 4.5rem)"
				templateRows="repeat(6, 3rem)"
				gap={2}
			>
				{[...improvements.completed.values()].map((b) => (
					<ControlBox
						{...controlBoxProps}
						key={b.name}
						building={b}
						filter={
							itemsToBeRemoved.includes(b.name)
								? "grayscale(100%) brightness(40%) sepia(100%) hue-rotate(-50deg) saturate(600%) contrast(0.8);"
								: undefined
						}
						_focus={{ outline: "1px solid gold" }}
						_hover={{ outline: "1px solid gold" }}
					>
						<BuildingCell building={b} />
					</ControlBox>
				))}

				<Times n={MAX_BUILDINGS - improvements.completed.size}>
					<Box
						width="full"
						height="full"
						backgroundColor="blackAlpha.200"
						onClick={onToggle}
						_focus={{ outline: "1px solid gold" }}
						_hover={{ outline: "1px solid gold" }}
					/>
				</Times>
			</Grid>
		</AvailableImprovementsMenu>
	);
});
