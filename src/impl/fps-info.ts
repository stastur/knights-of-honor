import { Game } from "./game";
import { Entity } from "./types";

export class FpsInfo implements Entity {
	box: HTMLElement;

	constructor() {
		this.box = document.createElement("div");

		const styles: Partial<CSSStyleDeclaration> = {
			position: "absolute",
			top: "0",
			right: "0",
			color: "black",
			fontFamily: "Courier, monospace",
		};
		Object.assign(this.box.style, styles);

		document.body.appendChild(this.box);
	}

	render(ctx: Game): void {
		this.box.textContent = `FPS: ${ctx.frameInfo.fps}`;
	}

	update(): void {}
}
