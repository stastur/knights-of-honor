import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IconType } from "react-icons";
import {
	GiOpenBook,
	GiHammerNails,
	GiTwoCoins,
	GiPopeCrown,
	GiWheat,
	GiHumanPyramid,
	GiLogging,
} from "react-icons/gi";
import { TiTimesOutline } from "react-icons/ti";
import cn from "classnames";

import * as buildings from "../../core/buildings";
import { Province } from "../../core/types";
import { actions, selectors } from "./store";
import { getConnectedBuildings, isConstructionAvailable } from "./utils";

const BonusIcons: { [K in keyof Province["baseProduction"]]: IconType } = {
	workers: GiHammerNails,
	gold: GiTwoCoins,
	books: GiOpenBook,
	piety: GiPopeCrown,
	food: GiWheat,
};

const buildingsList = Object.values(buildings);

export const ProvinceView = (): JSX.Element => {
	const dispatch = useDispatch();

	const id = useSelector(selectors.province.getProvinceId);
	const features = useSelector(selectors.province.getFeatures);

	const foodStorage = useSelector(selectors.resources.getFoodStorage);
	const population = useSelector(selectors.resources.getPopulation);
	const production = useSelector(selectors.resources.getProduction);

	const buildingsNumber = useSelector(selectors.buildings.getBuildingsNumber);

	const completedBuildings = useSelector(
		selectors.buildings.getCompletedBuildings
	);
	const buildingsUnderConstruction = useSelector(
		selectors.buildings.getUnderConstruction
	);

	const [buildingsToDestroy, setBuildingsToDestroy] = useState<
		Province["buildings"]
	>([]);
	const [menuOpened, setMenuOpened] = useState(false);
	const [buildingsListOpened, setBuildingsListOpened] = useState(false);

	const buildingLimit = 15;

	return (
		<div className="fixed bottom-0 left-0 right-0 flex">
			<section aria-label="Town development">
				<aside
					className={cn("absolute bottom-full bg-gray-300", {
						hidden: !menuOpened,
					})}
				>
					<section aria-label="Features" className="border-b grid grid-cols-3">
						{features.map((f) => (
							<span key={f}>{f}</span>
						))}
					</section>

					<section
						aria-label="Buildings"
						className="border-b grid grid-cols-3 grid-rows-5 relative"
					>
						<aside
							aria-label="available improvements"
							className={cn("absolute grid grid-cols-5 left-full w-max", {
								hidden: !buildingsListOpened,
							})}
						>
							{buildingsList.map((b) => {
								const canBeConstructed = isConstructionAvailable(b, {
									availableWorkers:
										production.workers - buildingsUnderConstruction.length,
									completedBuildings,
									buildingsUnderConstruction,
									features,
								});

								return (
									<span
										key={b.id}
										className={cn({
											"bg-red-200 cursor-not-allowed": !canBeConstructed,
											"bg-green-200 cursor-pointer": canBeConstructed,
										})}
										onClick={() =>
											canBeConstructed &&
											dispatch(actions.buildings.startConstruction(b))
										}
										title={
											b.bonuses
												.map(
													({ id, value }) =>
														`${id}: ${value > 0 ? "+" + value : value}`
												)
												.join(", ") +
											"\n" +
											b.products.join(", ")
										}
									>
										{b.id}
									</span>
								);
							})}
						</aside>

						{completedBuildings.map((b) => (
							<span
								className={cn("group border relative flex justify-between", {
									"bg-red-200": buildingsToDestroy.includes(b),
								})}
								key={b.building.id}
							>
								<span>{b.building.id}</span>

								<button
									className="group-hover:visible invisible h-full"
									onClick={() => dispatch(actions.buildings.destroy(b))}
									onMouseOver={() =>
										setBuildingsToDestroy(
											getConnectedBuildings(
												completedBuildings,
												b.building.id
											).concat(b)
										)
									}
									onMouseLeave={() => setBuildingsToDestroy([])}
								>
									<TiTimesOutline className="h-full w-full" />
								</button>
							</span>
						))}

						{Array.from({
							length: buildingLimit - buildingsNumber,
						}).map((_, index) => (
							<span
								key={index}
								onClick={() => setBuildingsListOpened((f) => !f)}
								className="border cursor-pointer"
							/>
						))}
					</section>

					<section aria-label="In progress">
						<div>
							{buildingsUnderConstruction.map((b) => (
								<div key={b.building.id} className="flex items-center">
									<div>
										<label htmlFor={b.building.id}>
											{b.building.id} ({b.progress}/{b.building.workers})
										</label>

										<div>
											<progress
												id={b.building.id}
												max={b.building.workers}
												value={b.progress}
											/>
										</div>
									</div>
									<button
										onClick={() => dispatch(actions.buildings.destroy(b))}
										className="h-6"
									>
										<TiTimesOutline className="h-full w-full" />
									</button>
								</div>
							))}
						</div>
					</section>
				</aside>

				<div>
					<button
						onClick={() => {
							setMenuOpened((f) => !f);
							setBuildingsListOpened(false);
						}}
						className="p-2 rounded border"
					>
						<GiLogging />
					</button>
				</div>
			</section>

			<section aria-label="Province info" className="bg-gray-300 p-2">
				<h1 className="font-semibold text-xl capitalize text-center">{id}</h1>

				<div>
					<div>
						<label htmlFor="people">
							<GiHumanPyramid className="inline" /> ({population.value}/
							{population.limit})
						</label>

						<meter
							id="people"
							min={0}
							max={population.limit}
							value={population.value}
							className="block w-full"
						/>
					</div>

					<div className="grid grid-cols-3 gap-2">
						{Object.entries(production).map(([resourceId, value]) => {
							const BonusIcon =
								BonusIcons[resourceId as keyof typeof production];

							return (
								<span key={resourceId}>
									<BonusIcon className="inline" /> {value}
								</span>
							);
						})}
					</div>

					<div>
						<label htmlFor="food">
							<GiWheat className="inline" /> ({foodStorage.value}/
							{foodStorage.limit})
						</label>

						<meter
							id="food"
							min={0}
							max={foodStorage.limit}
							value={foodStorage.value}
							className="block w-full"
						/>
					</div>
				</div>
			</section>

			<section aria-label="Marshal panel"></section>

			<section aria-label="Minimap"></section>
		</div>
	);
};
