export const take = <T>(arr: T[], n: number): T[] => {
	const taken: T[] = [];

	for (let i = 0; i < n; i++) {
		const item = arr.at(i);
		item && taken.push(item);
	}

	return taken;
};
