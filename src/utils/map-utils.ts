export const values = <V>(map: Map<unknown, V>): V[] => {
	return Array.from(map.values());
};

export const keys = <K>(map: Map<K, unknown>): K[] => {
	return Array.from(map.keys());
};

export const entries = <K, V>(map: Map<K, V>): Array<[K, V]> => {
	return Array.from(map.entries());
};
