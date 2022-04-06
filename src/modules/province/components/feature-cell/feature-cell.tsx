import React from "react";
import { Image, ImageProps } from "@chakra-ui/react";

import { Feature } from "@app/core/entities/types";

import { assetMap } from "./asset-map";

interface FeatureCellProps {
	name: Feature;
}

export const FeatureCell = ({
	name,
	...imageProps
}: FeatureCellProps & ImageProps): JSX.Element => {
	const source = `/images/features/${assetMap[name].assetName}`;

	return <Image src={source} alt={name} {...imageProps} />;
};
