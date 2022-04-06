import React from "react";
import { Box, Grid, useDisclosure } from "@chakra-ui/react";
import { observer } from "mobx-react-lite";

import { Times } from "@app/components/times";
import { useProvinceContext } from "@app/contexts/province-context";

import { AvailableImprovementsMenu } from "../available-improvements-menu";
import { BuildingCell } from "../building-cell";

import { useControlBox, ControlBox } from "./control-box";

const MAX_BUILDINGS = 18;

export const BuildingsPanel = observer((): JSX.Element => {
	const { isOpen, onClose, onToggle } = useDisclosure();
	const { province } = useProvinceContext();
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
				templateRows="repeat(6, 1fr)"
				gap={2}
			>
				{province.buildings.map((b) => (
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
						<BuildingCell building={b} onClick={onToggle} />
					</ControlBox>
				))}

				<Times n={MAX_BUILDINGS - province.buildings.length}>
					<Box
						width="100%"
						height="100%"
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
