import React, { PropsWithChildren } from "react";
import { makeObservable, computed, observable } from "mobx";

import { createContext } from "@app/utils";
import { Kingdom } from "@app/core/entities";

export class $Kingdom extends Kingdom {
	constructor(name: string) {
		super(name);

		makeObservable(this, {
			books: computed,
			gold: computed,
			piety: computed,

			provinces: observable,
		});
	}
}

const [KingdomContextProvider, useKingdom] = createContext<Kingdom>();

interface KingdomProviderProps {
	name: string;
}

const KingdomProvider = ({
	name,
	children,
}: PropsWithChildren<KingdomProviderProps>): JSX.Element => {
	const kingdom = new $Kingdom(name);

	return (
		<KingdomContextProvider value={kingdom}>{children}</KingdomContextProvider>
	);
};

export { KingdomProvider, useKingdom };
