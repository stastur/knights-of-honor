export const noop = (): void => {};

export const identity = <T>(v: T): T => v;

export const range = (start: number, end: number): number[] => {
	const range: number[] = [];

	for (let i = start; i < end; i++) {
		range.push(i);
	}

	return range;
};

export const randrange = (min: number, max: number): number => {
	return Math.floor(Math.random() * (max - min)) + min;
};

export const randomColor = (): string => {
	const hexCode = Number(Math.floor(Math.random() * (2 ** 24 - 1)))
		.toString(16)
		.padStart(6, "0");

	return `#${hexCode}`;
};

export function assertIsDefined<T>(
	v: T,
	message?: string
): asserts v is NonNullable<T> {
	if (v === null || v === undefined) {
		throw new Error(message);
	}
}

export function clamp(value: number, min: number, max: number): number {
	return Math.min(Math.max(min, value), max);
}
