import React, { ReactNode } from "react";
import { makeObservable, observable, action } from "mobx";
import { observer } from "mobx-react-lite";

import { createContext } from "@app/utils";
import { FinanceManager } from "@app/core/managers";
import { Kingdom } from "@app/core/entities";

import { useTimerEffect } from "./timer-context";
import { useKingdom } from "./kingdom-context";

export class $FinanceManager extends FinanceManager {
	constructor(kingdom: Kingdom) {
		super(kingdom);

		makeObservable(this, {
			gold: observable,
			piety: observable,
			books: observable,
			kingdom: observable,

			replenish: action,
			spend: action,
			update: action,
		});
	}
}

const [FinanceContextProvider, useFinanceManager] =
	createContext<FinanceManager>();

interface FinanceManagerProviderProps {
	children: ReactNode;
}

const FinanceManagerProvider = observer(
	({ children }: FinanceManagerProviderProps): JSX.Element => {
		const kingdom = useKingdom();
		const manager = new $FinanceManager(kingdom);

		useTimerEffect(() => manager.update());

		return (
			<FinanceContextProvider value={manager}>
				{children}
			</FinanceContextProvider>
		);
	}
);

export {
	/** wrap component with observer hoc before using context */
	useFinanceManager,
	FinanceManagerProvider,
};
