import React from "react";

import { Kingdom } from "../kingdom";

import { Power } from "./power";
import { Treasury } from "./treasury";

interface KingdomPanelProps {
	kingdom: Kingdom;
}

export const KingdomPanel = ({ kingdom }: KingdomPanelProps) => {
	return (
		<div className="flex flex-nowrap items-start gap-2">
			<div className="bg-white">
				<Power />
			</div>

			<div className="bg-white">
				<div>royal court of #{kingdom.id}</div>

				<div className="flex flex-row gap-6">
					{kingdom.units.map((u) => (
						<div key={u.id} className="bg-green-300 w-12 h-12">
							{u.name}
						</div>
					))}
				</div>
			</div>

			<div className="bg-white">
				<div>treasury</div>

				<Treasury />
			</div>
		</div>
	);
};
