import { Game } from "./game";
import { Entity } from "./types";

export class FpsInfo implements Entity {
	box: HTMLElement;
	frames = 0;
	fps = 0;

	time?: number;

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

	render(): void {
		this.box.textContent = `FPS: ${this.fps}`;
	}

	update(ctx: Game): void {
		this.frames++;

		if (!this.time) {
			this.time = ctx.state.then;
		}

		if (performance.now() - this.time >= 1000) {
			this.fps = this.frames;
			this.time = ctx.state.then;
			this.frames = 0;
		}
	}
}
