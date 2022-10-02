/* eslint-disable @typescript-eslint/no-non-null-assertion */
export const isEqual = (one: unknown, other: unknown): boolean => {
	if (one === other) {
		return true;
	}

	if (one == null || other == null) {
		return false;
	}

	if (typeof one !== typeof other) {
		return false;
	}

	if (Array.isArray(one) !== Array.isArray(other)) {
		return false;
	}

	if (Array.isArray(one) && Array.isArray(other)) {
		if (one.length !== other.length) {
			return false;
		}

		return one.every((item, index) => isEqual(item, other[index]));
	}

	if (typeof one === "object" && typeof other === "object") {
		const oneKeys = Object.keys(one!);
		const otherKeys = Object.keys(other!);

		if (!isEqual(oneKeys, otherKeys)) {
			return false;
		}

		return oneKeys.every((key) =>
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			isEqual((one as any)[key], (other as any)[key])
		);
	}

	return one === other;
};

export const has =
	(entry: Record<string, unknown>) =>
	(obj: Record<string, unknown>): boolean => {
		for (const key in entry) {
			if (!obj.hasOwnProperty(key)) {
				return false;
			}

			if (!isEqual(obj[key], entry[key])) {
				return false;
			}
		}

		return true;
	};

export function mapValues<K extends string, V, NewValue>(
	object: Record<K, V>,
	cb: (v: V) => NewValue
): Record<K, NewValue> {
	return Object.fromEntries(
		Object.entries<V>(object).map(([k, v]) => [k, cb(v)])
	) as Record<K, NewValue>;
}
