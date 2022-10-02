export type PickByType<T, V> = {
	[K in keyof T as T[K] extends V ? K : never]: T[K];
};

export type Intersection<T1, T2> = keyof T1 extends infer K
	? K extends keyof T2
		? K
		: never
	: never;
