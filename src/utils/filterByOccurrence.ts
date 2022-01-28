export const filterByOccurrence = <T extends number | string>(
	array: Array<T>,
	limit: number
): Array<T> => {
	const occurrences = new Map<T, number>();

	array.forEach((item) => {
		occurrences.set(item, (occurrences.get(item) || 0) + 1);
	});

	occurrences.forEach((v, k, map) => v > limit && map.delete(k));

	return Array.from(occurrences.keys());
};
