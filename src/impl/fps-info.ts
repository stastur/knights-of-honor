import { setStyles } from "./utils";
import { Entity } from "./types";
import { Game } from "./game";

export class FpsInfo implements Entity {
	box: HTMLElement;

	constructor() {
		this.box = document.createElement("span");

		setStyles(this.box, {
			position: "absolute",
			top: "0",
			right: "0",
		});

		document.body.appendChild(this.box);
	}

	update({ frameInfo: { fps } }: Game): void {
		let color = "black";
		if (fps > 55) {
			color = "green";
		} else if (fps > 30) {
			color = "orange";
		} else {
			color = "red";
		}

		this.box.style.color = color;
		this.box.textContent = `FPS: ${fps}`;
	}
}

// FpsInfo can be rendered on canvas:

// update({ context: ctx, frameInfo: { fps } }: Game): void {
// 	if (fps > 55) {
// 		ctx.fillStyle = "green";
// 	} else if (fps > 30) {
// 		ctx.fillStyle = "orange";
// 	} else {
// 		ctx.fillStyle = "red";
// 	}

// 	const text = `FPS: ${fps}`;
// 	const { width, actualBoundingBoxAscent } = ctx.measureText(text);

// 	ctx.font = "1.5rem monospace";
// 	ctx.fillText(
// 		text,
// 		ctx.canvas.width / devicePixelRatio - width,
// 		actualBoundingBoxAscent
// 	);
// }
