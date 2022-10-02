import { setStyles } from "@app/utils/html";

import { Game } from "./game";
import { Entity } from "./types";

export class FpsInfo implements Entity {
	box: HTMLElement;

	constructor() {
		this.box = document.createElement("span");

		setStyles(this.box, {
			position: "absolute",
			top: "0",
			right: "0",
			fontWeight: "bold",
			padding: "5px",
			backgroundColor: "white",
		});

		document.body.appendChild(this.box);
	}

	update({ frameInfo: { fps } }: Game): void {
		let color = "white";
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
