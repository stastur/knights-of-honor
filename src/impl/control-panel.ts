import { setStyles } from "@app/utils/html";

import { Game } from "./game";
import { Entity } from "./types";
import { getComponent } from "./utils";

export class ControlPanel implements Entity {
	box = document.createElement("div");

	init(): void {
		setStyles(this.box, {
			position: "absolute",
			bottom: "0",
			left: "0",
			right: "0",
			margin: "auto",
		});

		document.body.appendChild(this.box);
	}

	update(ctx: Game): void {
		this.box.style.visibility = ctx.activeEntity ? "visible" : "hidden";

		if (ctx.activeEntity) {
			this.box.textContent = JSON.stringify(
				getComponent(ctx.activeEntity, "position")
			);
		}
	}
}
