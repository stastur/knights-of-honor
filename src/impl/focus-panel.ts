import { setStyles } from "@app/utils/html";

import { Game } from "./game";
import { Entity } from "./types";

export class FocusPanel implements Entity {
	box = document.createElement("div");

	focusedEntity: Entity | null = null;

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
		this.box.style.visibility = this.focusedEntity ? "visible" : "hidden";

		let focused: Entity | null = null;
		for (const entity of ctx.entities) {
			if (entity.focusable && entity.focused) {
				focused = entity;
				break;
			}
		}

		if (focused) {
			this.focusedEntity = focused;
		} else {
			this.focusedEntity = null;
		}

		if (this.focusedEntity) {
			this.box.textContent = JSON.stringify(this.focusedEntity);
		}
	}
}
