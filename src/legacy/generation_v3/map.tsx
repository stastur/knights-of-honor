import React from "react";

import { Grid } from "./grid";
import { Point } from "./point";
import { PhysicalMap } from "./physicalMap";

import { Group, Path, Svg } from "../svg";

export const Map = (): JSX.Element => {
	const window = new Point(1400, 700);

	const grid = new Grid({
		window,
		origin: new Point(0, 0),
		size: 15,
	});

	const physicalMap = new PhysicalMap(grid);

	return (
		<div>
			<Svg width={window.x} height={window.y}>
				{grid.hexagons.map((h, i) => {
					const corners = grid.getHexCorners(h);

					return (
						<Group
							key={i}
							fill={`hsl(${
								physicalMap.elevation[i] > 0.5 ? 140 : 200
							}, 100%, 70%)`}
							// fill={`hsl(${200 - 200 * physicalMap.temperature[i]}, 100%, 70%)`}
						>
							<Path points={corners} />
						</Group>
					);
				})}
			</Svg>
		</div>
	);
};
