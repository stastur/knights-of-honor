import { ExtractKeysByValueType } from "./types";

export const groupBy = <
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	T extends Record<PropertyKey, any>,
	K extends ExtractKeysByValueType<T, PropertyKey>
>(
	array: T[],
	field: K
): Record<T[K], T[]> => {
	return array.reduce((groups, item) => {
		const value = item[field];

		if (!groups[value]) {
			groups[value] = [];
		}

		groups[value].push(item);

		return groups;
	}, {} as Record<T[K], T[]>);
};
