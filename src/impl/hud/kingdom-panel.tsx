import cn from "classnames";
import { action } from "mobx";
import { observer } from "mobx-react-lite";
import React from "react";

import { Kingdom } from "../kingdom";
import { Marshal } from "../marshal";

import { useGameContext } from "./game-context";

import { Power } from "./power";
import { Treasury } from "./treasury";

interface KingdomPanelProps {
	kingdom: Kingdom;
}

export const KingdomPanel = observer(({ kingdom }: KingdomPanelProps) => {
	const game = useGameContext();

	return (
		<div className="flex flex-nowrap items-start">
			<div className="bg-white p-2">
				<div>Kingdom power</div>

				<Power kingdom={kingdom} />
			</div>

			<div className="flex flex-col items-center bg-white p-2">
				<span>Royal court of #{kingdom.id}</span>

				<div className="grid grid-cols-10 gap-2">
					{[...kingdom.knights].map((id) => {
						const knight = game.entities.get(id) as Marshal;

						return (
							<div
								key={id}
								className={cn(
									"bg-green-300 w-16 h-16 flex items-center justify-center",
									{
										"border-2 border-purple-600": game.activeEntityId === id,
									}
								)}
								onClick={action(() => (game.activeEntityId = id))}
							>
								{knight.name}
							</div>
						);
					})}
				</div>
			</div>

			<div className="bg-white p-2">
				<div>Treasury</div>

				<Treasury kingdom={kingdom} />
			</div>
		</div>
	);
});
