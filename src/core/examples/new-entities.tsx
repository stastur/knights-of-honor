import React, { useEffect, useState } from "react";
import cn from "classnames";

import { baseBuildings, buildings } from "../collections/buildings";
import { features as allFeatures } from "../collections/features";
import { Province } from "../entities/province";
import { RuralArea } from "../entities/rural-area";

import { groupBy, randrange, shuffle, take } from "../../utils";
import { DevelopmentManager } from "../managers/development-manager";
import { FinanceManager } from "../managers/finance-manager";
import { Country } from "../entities/country";
import { areaTypes } from "../collections/area-types";

const areas: RuralArea[] = [];

for (let i = 0; i < 5; i++) {
	// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
	const type = shuffle(areaTypes).at(0)!;

	areas.push(new RuralArea(type));
}

const brest = new Province("Brest");

brest.areas = areas;
brest.features = take(shuffle(allFeatures), randrange(0, 3));
brest.buildings = take(shuffle(baseBuildings), randrange(1, 4));

Reflect.set(window, "province", brest);
Reflect.set(window, "buildings", buildings);

const c = new Country("c");
c.provinces.push(brest);

const developmentManager = new DevelopmentManager(brest);
const financeManager = new FinanceManager(c);

Reflect.set(window, "devManager", developmentManager);
Reflect.set(window, "finManager", financeManager);

const buildingTabs = groupBy(Object.values(buildings), "type");

export const View = (): JSX.Element => {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const [_, setState] = useState(0);

	useEffect(() => {
		const id = window.setInterval(() => {
			brest.update();
			developmentManager.update();
			financeManager.update();

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
										"bg-red-300": !developmentManager.checkRequirements(b.name),
										"bg-green-200": developmentManager.checkRequirements(
											b.name
										),
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
