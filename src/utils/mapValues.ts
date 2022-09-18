export function mapValues<K extends string, V, NewValue>(
	object: Record<K, V>,
	cb: (v: V) => NewValue
): Record<K, NewValue> {
	return Object.fromEntries(
		Object.entries<V>(object).map(([k, v]) => [k, cb(v)])
	) as Record<K, NewValue>;
}
