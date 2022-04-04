import {
	combineReducers,
	configureStore,
	createAction,
	createSelector,
	createSlice,
	PayloadAction,
} from "@reduxjs/toolkit";
import { Bonus, Building, BuildingStatus, Province } from "../../core/types";
import { Brest } from "./province.data";
import { GlobalResource, LocalResource, AdditionalBonus } from "../../core/enums";
import { createStructuredSelector } from "reselect";
import { getBuildingsBonus } from "./utils";

const tick = createAction("tick");

const provinceSlice = createSlice({
	name: "province",
	initialState: Brest,
	reducers: {
		// buildings
		startConstruction(state, action: PayloadAction<Building>) {
			state.buildings.push({
				status: BuildingStatus.UnderConstruction,
				progress: 0,
				building: action.payload,
			});
		},

		destroy(
			state,
			{
				payload: { building: buildingToDestroy },
			}: PayloadAction<Province["buildings"][number]>
		) {
			state.buildings = state.buildings.filter(
				({ building: { id, requirements } }) =>
					![id, ...requirements].some((r) => r === buildingToDestroy.id)
			);
		},

		// resources
	},
	extraReducers: (builder) =>
		builder.addCase(tick, ({ buildings, baseProduction }) => {
			const buildingsUnderConstruction = buildings.filter(
				(b) => b.status === BuildingStatus.UnderConstruction
			);
			const completedBuildings = buildings.filter(
				(b) => b.status === BuildingStatus.ConstructionFinished
			);

			const totalWorkers =
				getBuildingsBonus(completedBuildings, LocalResource.Workers) +
				baseProduction.workers;

			const workers = buildingsUnderConstruction.map((_, index, { length }) => {
				const groupOfWorkers = Math.floor(totalWorkers / length);
				const freeWorkers = totalWorkers % length;

				return index < freeWorkers ? groupOfWorkers + 1 : groupOfWorkers;
			});

			buildingsUnderConstruction.forEach((b, index) => {
				b.progress = (b.progress || 0) + workers[index];

				if (b.progress >= b.building.workers) {
					b.status = BuildingStatus.ConstructionFinished;
				}
			});
		}),
});

export const rootReducer = combineReducers({
	province: provinceSlice.reducer,
});

export const store = configureStore({ reducer: rootReducer });

setInterval(() => store.dispatch(tick()), 1000);

type RootState = ReturnType<typeof rootReducer>;

const getProvince = (state: RootState) => state.province;
const getFeatures = (state: RootState) => state.province.features;
const getProvinceId = (state: RootState) => state.province.id;
const getBuildingsNumber = (state: RootState) =>
	state.province.buildings.length;

const getUnderConstruction = createSelector(getProvince, ({ buildings }) =>
	buildings.filter((b) => b.status === BuildingStatus.UnderConstruction)
);

const getCompletedBuildings = createSelector(getProvince, ({ buildings }) =>
	buildings.filter((b) => b.status === BuildingStatus.ConstructionFinished)
);

const createBuildingBonusesSelector = (resource: Bonus["id"]) =>
	createSelector(getCompletedBuildings, (buildings) =>
		getBuildingsBonus(buildings, resource)
	);

const getPietyBonus = createBuildingBonusesSelector(GlobalResource.Piety);
const getGoldBonus = createBuildingBonusesSelector(GlobalResource.Gold);
const getBooksBonus = createBuildingBonusesSelector(GlobalResource.Books);
const getFoodBonus = createBuildingBonusesSelector(LocalResource.Food);
const getWorkersBonus = createBuildingBonusesSelector(LocalResource.Workers);

const getFoodStorageBonus = createBuildingBonusesSelector(
	AdditionalBonus.FoodStorage
);

const getPopulationBonus = createBuildingBonusesSelector(
	AdditionalBonus.Population
);

const getHappinessBonus = createBuildingBonusesSelector(
	AdditionalBonus.Happiness
);

const getProductionBonuses = createStructuredSelector({
	piety: getPietyBonus,
	gold: getGoldBonus,
	books: getBooksBonus,
	food: getFoodBonus,
	workers: getWorkersBonus,
});

const getProduction = createSelector(
	getProvince,
	getProductionBonuses,
	({ baseProduction }, productionBonuses) =>
		Object.fromEntries(
			Object.entries(baseProduction).map(([resource, value]) => [
				resource,
				value + productionBonuses[resource as keyof typeof baseProduction],
			])
		) as typeof baseProduction
);

const getFoodStorage = createSelector(
	getProvince,
	getFoodStorageBonus,
	({ foodStorage }, limitBonus) => ({
		...foodStorage,
		limit: foodStorage.limit + limitBonus,
	})
);

const getPopulation = createSelector(
	getProvince,
	getPopulationBonus,
	({ population }, limitBonus) => ({
		...population,
		limit: population.limit + limitBonus,
	})
);

const { destroy, startConstruction } = provinceSlice.actions;

export const actions = {
	buildings: { destroy, startConstruction },
};

export const selectors = {
	province: {
		getFeatures,
		getProvinceId,
	},
	buildings: {
		getUnderConstruction,
		getCompletedBuildings,
		getBuildingsNumber,
	},
	resources: {
		getProduction,
		getPopulation,
		getFoodStorage,
	},
};
