export type ValidationError<TData extends Record<string, unknown>> = Partial<
	Record<keyof TData, string[]>
>;

export type SelectMenuOptions = {
	label: string;
	value: string;
};
