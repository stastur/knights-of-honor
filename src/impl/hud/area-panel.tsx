import React from "react";

import { Area } from "../area";

interface AreaPanelProps {
	area: Area;
}

const textForType: Record<Area["type"], string> = {
	coastalVillage: "Coastal village",
	farm: "Farm",
	monastery: "Monastery",
	village: "Village",
};

export const AreaPanel = ({ area }: AreaPanelProps) => {
	return (
		<div className="flex flex-col items-center bg-white">
			<img className="w-96 h-20" />
			<span>
				{textForType[area.type]} in {area.province?.name}
			</span>
		</div>
	);
};
