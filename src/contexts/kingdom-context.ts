import { createContext } from "@app/utils";
import { Kingdom } from "@app/core/entities/kingdom";
import { FinanceManager } from "@app/core/managers/finance-manager";

const [KingdomContextProvider, useKingdomContext] = createContext<{
	financeManager: FinanceManager;
	kingdom: Kingdom;
}>();

export { KingdomContextProvider, useKingdomContext };
