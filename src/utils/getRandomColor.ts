export const getRandomColor = (): string => {
	const hexCode = Number(Math.floor(Math.random() * (2 ** 24 - 1)))
		.toString(16)
		.padStart(6, "0");

	return `#${hexCode}`;
};
