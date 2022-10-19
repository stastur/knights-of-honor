import { Box, BoxProps, Image } from "@chakra-ui/react";
import React from "react";
import { useTranslation } from "react-i18next";

import { Building } from "../../buildings/building";

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
	...boxProps
}: BuildingCellProps & BoxProps): JSX.Element => {
	const { t } = useTranslation();

	return (
		<Box position="relative" role="group" {...boxProps}>
			<Image
				src={t("assetPath", { name: building.name, context: "buildings" })}
				alt={building.name}
				data-peer
				filter={filters[constructable]}
			/>

			<BuildingDetails building={building} />
		</Box>
	);
};
