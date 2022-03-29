export const shuffle = <T>(arr: T[]): T[] => {
	let i = arr.length;

	while (i > 1) {
		i--;
		const j = Math.floor(Math.random() * i);
		[arr[j], arr[i]] = [arr[i], arr[j]];
	}

	return arr;
};
