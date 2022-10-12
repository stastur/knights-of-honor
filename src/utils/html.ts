export function setStyles(
	element: HTMLElement,
	styles: Partial<CSSStyleDeclaration>
): void {
	Object.assign(element.style, styles);
}

type TemplateValue = string | number | false | undefined | null;

export function html(
	template: TemplateStringsArray,
	...values: Array<TemplateValue | TemplateValue[]>
) {
	return String.raw(
		{ raw: template },
		...values.map((v) => {
			if (Array.isArray(v)) {
				return v.join("");
			}

			if (typeof v === "boolean") {
				return "";
			}

			return v ?? "";
		})
	);
}
