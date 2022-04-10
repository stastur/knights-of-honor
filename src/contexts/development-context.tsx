import React, { ReactNode } from "react";
import { makeObservable, observable, action } from "mobx";
import { observer } from "mobx-react-lite";

import { createContext } from "@app/utils";
import { DevelopmentManager } from "@app/core/managers";
import { Province } from "@app/core/entities";

import { useTimerEffect } from "./timer-context";
import { useProvince } from "./province-context";

export class $DevelopmentManager extends DevelopmentManager {
	constructor(province: Province) {
		super(province);

		makeObservable(this, {
			projects: observable,

			build: action,
			destroy: action,
			update: action,

			forceProject: action,
		});
	}
}

const [DevelopmentContextProvider, useDevelopmentManager] =
	createContext<DevelopmentManager>();

interface DevelopmentManagerProviderProps {
	children: ReactNode;
}

const DevelopmentManagerProvider = observer(
	({ children }: DevelopmentManagerProviderProps): JSX.Element => {
		const province = useProvince();
		const manager = new $DevelopmentManager(province);

		useTimerEffect(() => manager.update());

		return (
			<DevelopmentContextProvider value={manager}>
				{children}
			</DevelopmentContextProvider>
		);
	}
);

export {
	/** wrap component with observer hoc before using context */
	useDevelopmentManager,
	DevelopmentManagerProvider,
};
