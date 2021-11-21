import React, { createContext, ReactNode, useContext, useState } from "react";
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

import { buildings as allBuildings, buildings } from "../game/buildings";
import { BonusId, Building, Province, ResourceId } from "../game/types";
import cn from "classnames";
import { Brest } from "../game/province";

interface ProvinceContextInterface {
	province: Province;
	api: {
		buildings: {
			startConstruction: (b: Building) => void;
			destroy: (b: Province["buildings"][number]) => void;

			isConstructionAvailable: () => boolean;
			isAvailable: (b: Building) => boolean;

			getAvailable: () => Building[];
			getUnderConstruction: () => Province["buildings"];
		};
	};
}

const ProvinceContext = createContext({} as ProvinceContextInterface);

const useProvince = () => useContext(ProvinceContext);

export const ProvinceProvider = ({
	province,
	children,
}: {
	province: Province;
	children: ReactNode;
}): JSX.Element => {
	const [state, setState] = useState(province);

	const isAvailable: ProvinceContextInterface["api"]["buildings"]["isAvailable"] =
		(building) => {
			const finishedBuildingIds = state.buildings
				.filter(({ status }) => status === "construction-finished")
				.map(({ building: { id } }) => id);

			if (state.buildings.find(({ building: b }) => b === building)) {
				return false;
			}

			return building.requirements.every((requirement) =>
				[...province.features, ...finishedBuildingIds].includes(requirement)
			);
		};

	const getAvailable: ProvinceContextInterface["api"]["buildings"]["getAvailable"] =
		() => {
			return buildings.filter(isAvailable);
		};

	const getUnderConstruction: ProvinceContextInterface["api"]["buildings"]["getUnderConstruction"] =
		() => {
			return state.buildings.filter(
				({ status }) => status === "under-construction"
			);
		};

	const isConstructionAvailable: ProvinceContextInterface["api"]["buildings"]["isConstructionAvailable"] =
		() => {
			const buildingsUnderConstruction = getUnderConstruction();

			return state.bonuses.workers.value > buildingsUnderConstruction.length;
		};

	const startConstruction: ProvinceContextInterface["api"]["buildings"]["startConstruction"] =
		(building) => {
			if (!isConstructionAvailable()) {
				return;
			}

			state.buildings.push({
				status: "under-construction",
				progress: 0,
				building,
			});

			setState({ ...state });
		};

	const destroy: ProvinceContextInterface["api"]["buildings"]["destroy"] = (
		building
	) => {
		state.buildings = state.buildings.filter((b) => b !== building);

		setState({ ...state });
	};

	return (
		<ProvinceContext.Provider
			value={{
				province: state,
				api: {
					buildings: {
						startConstruction,
						destroy,
						isAvailable,
						isConstructionAvailable,
						getAvailable,
						getUnderConstruction,
					},
				},
			}}
		>
			{children}
		</ProvinceContext.Provider>
	);
};

const BonusIcons: { [K in BonusId]: IconType } = {
	workers: GiHammerNails,
	gold: GiTwoCoins,
	books: GiOpenBook,
	piety: GiPopeCrown,
};

export const ProvinceView = (): JSX.Element => {
	// const {
	// 	province: { id, resources, bonuses, features, buildings },
	// 	api,
	// } = useProvince();

	const { id, features, buildings } = useRecoilValue(provinceState);
	const bonuses = useRecoilValue(provinceBonusesSelector);
	const resources = useRecoilValue(provinceResourcesSelector);

	const [menuOpened, setMenuOpened] = React.useState(false);
	const [buildingsListOpened, setBuildingsListOpened] = React.useState(false);

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
							{allBuildings.map((b) => (
								<span
									key={b.id}
									className={cn({
										"bg-red-200": !api.buildings.isAvailable(b),
										"bg-green-200": api.buildings.isAvailable(b),
									})}
									onClick={() => api.buildings.startConstruction(b)}
								>
									{b.id}
								</span>
							))}
						</aside>

						{buildings.map((b) => (
							<span className="border" key={b.building.id}>
								{b.building.id}
							</span>
						))}

						{Array.from({
							length: buildingLimit - buildings.length,
						}).map((_, index) => (
							<span
								onClick={() =>
									(api.buildings.isConstructionAvailable() ||
										buildingsListOpened) &&
									setBuildingsListOpened((f) => !f)
								}
								className={cn("border", {
									"cursor-pointer": api.buildings.isConstructionAvailable(),
								})}
								key={index}
							/>
						))}
					</section>

					<section aria-label="In progress">
						<div>
							{api.buildings.getUnderConstruction().map((b) => (
								<div key={b.building.id}>
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
							<GiHumanPyramid className="inline" /> ({resources.people.amount}/
							{resources.people.limit})
						</label>

						<meter
							id="people"
							min={0}
							max={resources.people.limit}
							value={resources.people.amount}
							className="block w-full"
						/>
					</div>

					<div className="grid grid-cols-3 gap-2">
						{Object.entries(bonuses).map(([bonusId, { value }]) => {
							const BonusIcon = BonusIcons[bonusId as keyof typeof bonuses];

							return (
								<span key={bonusId}>
									<BonusIcon className="inline" /> {value}
								</span>
							);
						})}

						<span>
							<GiWheat className="inline" />{" "}
							{resources.food.restoreRate * resources.food.amount}
						</span>
					</div>

					<div>
						<label htmlFor="food">
							<GiWheat className="inline" /> ({resources.food.amount}/
							{resources.food.limit})
						</label>

						<meter
							id="food"
							min={0}
							max={resources.food.limit}
							value={resources.food.amount}
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
