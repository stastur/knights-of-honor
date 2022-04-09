import React from "react";
import { Box, BoxProps, Text } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

import { Building } from "@app/core/entities/building";

import { assetMap } from "./asset-map";

interface BuildingDetailsProps {
	building: Building;
}

export const BuildingDetails = ({
	building,
	...boxProps
}: BuildingDetailsProps & BoxProps): JSX.Element => {
	const { t } = useTranslation();

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

	const requirements = [...requiredFeatures, ...requiredBuildings].map(t);

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
				{t(name)} (gold: {cost}, workers: {workers})
			</Text>
			<Text>{description}</Text>

			{requirements.length > 0 && (
				<Text>{t("requires", { value: requirements.join("; ") })}</Text>
			)}

			{bonuses.length > 0 && (
				<Text>
					{t("bonuses", {
						value: bonuses.map((options) => t("bonus", options)).join("; "),
					})}
				</Text>
			)}

			{next && <Text>{t("upgradeable", { to: t(next) })}</Text>}
		</Box>
	);
};
