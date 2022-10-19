import { Box, BoxProps, Text } from "@chakra-ui/react";
import React from "react";
import { useTranslation } from "react-i18next";

import { Building } from "../../buildings/building";

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
		bound: requiredBuildings,
		next,
		// bonuses,
		cost,
		workers,
	} = building;

	const requirements = [...requiredFeatures, ...requiredBuildings].map((r) =>
		t(`${r}.name`)
	);

	return (
		<Box
			width="20rem"
			display="none"
			position="absolute"
			zIndex={1}
			color="white"
			backgroundColor="blackAlpha.700"
			boxShadow={`
				0 0 0 1px black,
				0 0 0 2px #e4cb79,
				0 0 0 3px black
			`}
			_peerHover={{ display: "block" }}
			{...boxProps}
		>
			<Text fontWeight="bold">
				{t(`${name}.name`)} (gold: {cost}, workers: {workers})
			</Text>
			<Text>{t(`${name}.description`)}</Text>

			{requirements.length > 0 && (
				<Text>{t("requires", { value: requirements.join("; ") })}</Text>
			)}

			{/* {bonuses.length > 0 && (
				<Text>
					{t("bonuses", {
						value: bonuses.map((options) => t("bonus", options)).join("; "),
					})}
				</Text>
			)} */}

			{next && <Text>{t("upgradeable", { to: t(`${next}.name`) })}</Text>}
		</Box>
	);
};
