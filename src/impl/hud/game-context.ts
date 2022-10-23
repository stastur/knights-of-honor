import { createContext } from "@app/utils/react";

import { Game } from "../game";

export const [GameProvider, useGameContext] = createContext<Game>();
