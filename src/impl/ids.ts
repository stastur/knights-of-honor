const idCreator = () => {
	let id = 0;

	return () => id++;
};

export const newId = idCreator();
