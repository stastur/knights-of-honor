import { ExtractKeysByValueType } from "./types";

export const sumBy = <
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	T extends Record<PropertyKey, any>,
	K extends ExtractKeysByValueType<T, number>
>(
	collection: T[],
	property: K
): number => {
	return collection.reduce((sum, item) => sum + item[property], 0);
};
