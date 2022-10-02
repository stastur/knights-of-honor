export const negate =
	<T extends unknown[]>(predicate: (...args: T) => boolean) =>
	(...args: T): boolean =>
		!predicate(...args);
