export const range = (start: number, end: number) => {
	const range: number[] = [];

	for (let i = start; i < end; i++) {
		range.push(i);
	}

	return range;
};
