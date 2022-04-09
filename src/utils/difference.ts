import { without } from "./without";

export const difference = <T>(one: T[], other: T[]): T[] => {
	return without(one, ...other).concat(without(other, ...one));
};
