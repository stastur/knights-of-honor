import { Province } from "@app/impl/province";
import { createContext } from "@app/utils/react";

export const [ProvinceContext, useProvinceContext] = createContext<Province>();
