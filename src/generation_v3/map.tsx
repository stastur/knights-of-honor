import React from "react";
import { Grid } from "./index";
import { Path, Svg } from "../svg";

export const Map = (): JSX.Element => {
	const grid = new Grid();

	return (
		<div>
			<Svg width={100} height={100}>
				{grid.hexagons.map((h, i) => {
					const corners = grid.getHexCorners(h);

					return <Path key={i} points={corners}></Path>;
				})}
			</Svg>
		</div>
	);
};
