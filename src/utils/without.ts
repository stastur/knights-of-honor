import { isEqual } from "./isEqual";

export const without = <T>(array: T[], ...values: T[]): T[] => {
	return array.filter(
		(item) => values.findIndex((v) => isEqual(item, v)) === -1
	);
};
