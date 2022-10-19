import cn from "classnames";
import React from "react";

import { Kingdom } from "../kingdom";

import { Power } from "./power";
import { Treasury } from "./treasury";

interface KingdomPanelProps {
	kingdom: Kingdom;
}

export const KingdomPanel = ({ kingdom }: KingdomPanelProps) => {
	return (
		<div className="flex flex-nowrap items-start">
			<div className="bg-white p-2">
				<div>Kingdom power</div>

				<Power />
			</div>

			<div className="flex flex-col items-center bg-white p-2">
				<span>Royal court of #{kingdom.id}</span>

				<div className="grid grid-cols-10 gap-2">
					{kingdom.units.map((u) => (
						<div
							key={u.id}
							className={cn(
								"bg-green-300 w-16 h-16 flex items-center justify-center",
								{
									// TODO: game.activeEntityId === u.id
									"border-2 border-purple-600": true,
								}
							)}
						>
							{u.name}
						</div>
					))}
				</div>
			</div>

			<div className="bg-white p-2">
				<div>Treasury</div>

				<Treasury />
			</div>
		</div>
	);
};
