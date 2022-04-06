import { createContext } from "@app/utils";
import { DevelopmentManager } from "@app/core/managers/development-manager";
import { Province } from "@app/core/entities/province";

const [ProvinceContextProvider, useProvinceContext] = createContext<{
	developmentManager: DevelopmentManager;
	province: Province;
}>();

export { ProvinceContextProvider, useProvinceContext };
