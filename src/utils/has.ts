/* eslint-disable @typescript-eslint/no-explicit-any */
import { isEqual } from "./isEqual";

export const has =
	(entry: Record<string, any>) =>
	(obj: Record<string, any>): boolean => {
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
