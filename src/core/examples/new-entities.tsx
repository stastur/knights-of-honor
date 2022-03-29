import React, { useEffect, useState } from "react";
import cn from "classnames";

import { buildings as allBuildings } from "../collections/buildings";
import { Province } from "../entities/province";
import { RuralArea } from "../entities/rural-area";

import { groupBy, randrange, shuffle, take } from "../../utils";

const basicBuildings: Province["buildings"] = [
	allBuildings.taxCollectorsOffice,
	allBuildings.toolSmithy,
	allBuildings.trainingGrounds,
	allBuildings.inn,
	allBuildings.taxCollectorsOffice,
	allBuildings.palisade,
	allBuildings.townWatchHouse,
];

const allFeatures: Province["features"] = [
	"brineDeposits",
	"fertileSoil",
	"fishery",
	"gameLand",
	"marbleDeposits",
	"mineralDeposits",
	"pasture",
	"silverOre",
];
const features = take(shuffle(allFeatures), randrange(0, 3));
const buildings = take(shuffle(basicBuildings), randrange(1, 4));

const areaTypes: RuralArea["type"][] = [
	"coastalVillage",
	"farm",
	"monastery",
	"village",
];

const areas: RuralArea[] = [];

for (let i = 0; i < 5; i++) {
	// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
	const type = shuffle(areaTypes).at(0)!;

	if (type === "coastalVillage" && !features.includes("fishery")) {
		i--;
		continue;
	}

	areas.push(new RuralArea(type));
}

const brest = new Province("Brest");

brest.areas = areas;
brest.features = features;
brest.buildings = buildings;

const buildingTabs = groupBy(Object.values(allBuildings), "type");

Reflect.set(window, "province", brest);
Reflect.set(window, "buildings", allBuildings);

export const View = (): JSX.Element => {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const [_, setState] = useState(0);

	useEffect(() => {
		const id = window.setInterval(() => {
			brest.update();
			setState((v) => {
				return v + 1;
			});
		}, 1000);

		return () => window.clearInterval(id);
	}, []);

	return (
		<section>
			<h1>
				{brest.name} {_}
			</h1>
			<div>features: {brest.features.join()}</div>
			<div>areas: {brest.areas.map((v) => v.type).join()}</div>
			<div>food: {brest.food}</div>
			<div>workers: {brest.workers}</div>
			<div>piety: {brest.piety}</div>
			<div>gold: {brest.gold}</div>
			<div>
				food storage: {brest.foodStorage.value}/{brest.foodStorage.limit}
			</div>

			<section className="flex">
				{Object.entries(buildingTabs).map(([tabName, tabItems]) => (
					<div key={tabName}>
						<b>{tabName}</b>
						<ul>
							{tabItems.map((b) => (
								<ol
									key={b.name}
									className={cn({
										"bg-red-300": !b.checkRequirements(brest),
										"bg-green-200": b.checkRequirements(brest),
									})}
								>
									{b.name}
								</ol>
							))}
						</ul>
					</div>
				))}
			</section>
		</section>
	);
};
