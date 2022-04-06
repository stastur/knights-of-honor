import {
	createContext as createReactContext,
	useContext as useReactContext,
} from "react";

type CreateContextReturnType<T> = [React.Provider<T>, () => T];

export const createContext = <
	ContextType
>(): CreateContextReturnType<ContextType> => {
	const Context = createReactContext<ContextType | null>(null);

	const useContext = () => {
		const ctx = useReactContext(Context);

		if (!ctx) {
			console.warn("Context provider is missing");
		}

		return ctx;
	};

	return [Context.Provider, useContext] as CreateContextReturnType<ContextType>;
};
