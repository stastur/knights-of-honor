export const filterBy = <T>(arr: T[], cb: (arg: T) => boolean): T[] => {
	return arr.filter(cb);
};
