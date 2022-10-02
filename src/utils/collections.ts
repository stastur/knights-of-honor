import { isEqual } from "./objects";
import { PickByType } from "./types";

export const difference = <T>(one: T[], other: T[]): T[] => {
	return without(one, ...other).concat(without(other, ...one));
};

export const without = <T>(array: T[], ...values: T[]): T[] => {
	return array.filter(
		(item) => values.findIndex((v) => isEqual(item, v)) === -1
	);
};

export const shuffle = <T>(arr: T[]): T[] => {
	let i = arr.length;

	while (i > 1) {
		i--;
		const j = Math.floor(Math.random() * i);
		[arr[j], arr[i]] = [arr[i], arr[j]];
	}

	return arr;
};

export const groupBy = <
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	T extends Record<PropertyKey, any>,
	K extends keyof PickByType<T, PropertyKey>
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

export const sumBy = <
	T extends Record<PropertyKey, never>,
	K extends keyof PickByType<T, number>
>(
	collection: T[],
	property: K
): number => {
	return collection.reduce((sum, item) => sum + item[property], 0);
};

export const take = <T>(arr: T[], n: number): T[] => {
	return arr.slice(0, n);
};

export const unflatten = <T>(
	flatArray: ArrayLike<T>,
	groupSize: number
): Array<T[]> => {
	const array: Array<T[]> = [];

	for (let i = 0; i < flatArray.length; i += groupSize) {
		array.push(
			Array.from({ length: groupSize }, (_, index) => flatArray[index + i])
		);
	}

	return array;
};
