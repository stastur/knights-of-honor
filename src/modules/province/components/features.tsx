import React from "react";
import { observer } from "mobx-react-lite";
import { HStack, Box, StackProps, ImageProps, Image } from "@chakra-ui/react";

import { useTranslation } from "react-i18next";

import { useProvince } from "@app/contexts";
import { Times } from "@app/components/times";
import { Feature } from "@app/core/entities";

const MAX_FEATURES = 3;

interface FeatureCellProps {
	name: Feature;
}

export const FeatureCell = ({
	name,
	...imageProps
}: FeatureCellProps & ImageProps): JSX.Element => {
	const { t } = useTranslation();

	return (
		<Image
			src={t("assetPath", { name, context: "features" })}
			alt={name}
			{...imageProps}
		/>
	);
};

export const Features = observer((props: StackProps) => {
	const { features } = useProvince();

	return (
		<HStack justifyContent="space-around" {...props}>
			{features.map((f) => (
				<FeatureCell key={f} name={f} />
			))}

			<Times n={MAX_FEATURES - features.length}>
				<Box
					width="3.625rem"
					height="3.625rem"
					backgroundColor="blackAlpha.200"
				/>
			</Times>
		</HStack>
	);
});
