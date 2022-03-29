export const merge = <
	T extends Record<string, number>,
	K extends Record<string, number>
>(
	one: T,
	other: K
): T & K => {
	const object = { ...one, ...other };

	for (const property of Object.keys(object)) {
		if (property in one) {
			const value = object[property] + one[property];
			Reflect.set(object, property, value);
		}
	}

	return object;
};
