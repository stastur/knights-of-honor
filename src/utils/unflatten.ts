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
