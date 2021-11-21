import { Province } from "./../game/types";
import { Building, BuildingStatus } from "../game/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Brest } from "../game/province";

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

		destroy(state, action: PayloadAction<Province["buildings"][number]>) {
			state.buildings = state.buildings.filter(
				(b) =>
					![b.building.id, ...b.building.requirements].some(
						(r) => r === action.payload.building.id
					)
			);
		},

		// resources
	},
});
