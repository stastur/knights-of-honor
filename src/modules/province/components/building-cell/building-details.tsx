import React from "react";
import { Box, BoxProps, Text } from "@chakra-ui/react";

import { Building } from "@app/core/entities/building";

import { assetMap } from "./asset-map";

interface BuildingDetailsProps {
	building: Building;
}

export const BuildingDetails = ({
	building,
	...boxProps
}: BuildingDetailsProps & BoxProps): JSX.Element => {
	const {
		name,
		requiredFeatures,
		requiredBuildings,
		next,
		bonuses,
		cost,
		workers,
	} = building;
	const { description } = assetMap[name];

	return (
		<Box
			width="20rem"
			display="none"
			position="absolute"
			zIndex={1}
			color="white"
			backgroundColor="blackAlpha.700"
			_peerHover={{ display: "block" }}
			{...boxProps}
		>
			<Text fontWeight="bold">
				{name} (gold: {cost}, workers: {workers})
			</Text>
			<Text>{description}</Text>

			{bonuses.length > 0 && (
				<Text>
					Bonuses:{" "}
					{bonuses
						.map(({ value, resource, target }) => {
							return `+${value} ${resource} in ${target}`;
						})
						.join("; ")}
				</Text>
			)}

			{requiredFeatures.length > 0 && (
				<Text>Required features: {requiredFeatures.join(";")}</Text>
			)}

			{requiredBuildings.length > 0 && (
				<Text>Required buildings: {requiredBuildings.join(";")}</Text>
			)}

			{next && <Text>Upgradeable to: {next}</Text>}
		</Box>
	);
};
