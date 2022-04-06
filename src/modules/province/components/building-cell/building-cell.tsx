import React from "react";
import { Box, BoxProps, Image } from "@chakra-ui/react";

import { Building } from "@app/core/entities/building";
import { noop } from "@app/utils";

import { assetMap } from "./asset-map";
import { BuildingDetails } from "./building-details";

interface BuildingCellProps {
	building: Building;
	constructable?: "yes" | "no" | "not-yet";
}

const filters = {
	yes: undefined,
	no: "grayscale(1) contrast(0.6) brightness(0.7)",
	"not-yet": "brightness(0.5)",
};

export const BuildingCell = ({
	building,
	constructable = "yes",
	onClick = noop,
	...boxProps
}: BuildingCellProps & BoxProps): JSX.Element => {
	const { assetName } = assetMap[building.name];
	const source = `/images/buildings/${assetName}`;

	return (
		<Box
			onClick={onClick}
			position="relative"
			tabIndex={0}
			role="group"
			{...boxProps}
		>
			<Image
				src={source}
				alt={building.name}
				data-peer
				filter={filters[constructable]}
			/>

			<BuildingDetails building={building} />
		</Box>
	);
};
