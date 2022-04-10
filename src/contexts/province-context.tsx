import React, { PropsWithChildren, useEffect } from "react";
import { observer } from "mobx-react-lite";
import {
	makeObservable,
	computed,
	observable,
	action,
	runInAction,
} from "mobx";

import { createContext } from "@app/utils";
import { Province } from "@app/core/entities";
import { baseBuildings } from "@app/core/collections";

import { useTimerEffect } from "./timer-context";
import { useKingdom } from "./kingdom-context";

export class $Province extends Province {
	constructor(name: string) {
		super(name);

		makeObservable(this, {
			books: computed,
			gold: computed,
			piety: computed,
			food: computed,
			workers: computed,
			// TODO: revisit food storage
			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			// @ts-ignore
			_foodStorage: observable,
			foodStorage: computed.struct,

			buildings: observable,
			features: observable,

			update: action,
			addBuilding: action,
			removeBuilding: action,
		});
	}
}

const [ProvinceContextProvider, useProvince] = createContext<Province>();

interface ProvinceProviderProps {
	name: string;
}

const ProvinceProvider = observer(
	({
		name,
		children,
	}: PropsWithChildren<ProvinceProviderProps>): JSX.Element => {
		const kingdom = useKingdom();
		const province = new $Province(name);

		useEffect(() => {
			kingdom.provinces.push(province);

			// TODO: generation and sync
			runInAction(() => {
				province.features.push("fishery", "marbleDeposits");
				baseBuildings.forEach((b) => province.addBuilding(b.name));
			});
		}, []);

		useTimerEffect(() => province.update());

		return (
			<ProvinceContextProvider value={province}>
				{children}
			</ProvinceContextProvider>
		);
	}
);

export { ProvinceProvider, useProvince };
