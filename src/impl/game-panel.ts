import { setStyles } from "./utils";
import { Entity } from "./types";
import { Game } from "./game";

export class GamePanel implements Entity {
	box = document.createElement("div");
	btn = document.createElement("button");

	shouldUpdate = true;

	constructor() {
		setStyles(this.box, {
			position: "absolute",
			top: "0",
			left: "0",
		});

		this.box.append(this.btn);

		document.body.appendChild(this.box);
	}

	update(ctx: Game): void {
		if (this.shouldUpdate) {
			this.btn.textContent = ctx.isRunning ? "pause" : "resume";

			this.btn.onclick = () => {
				ctx.isRunning = !ctx.isRunning;
				this.btn.textContent = ctx.isRunning ? "pause" : "resume";
			};

			this.shouldUpdate = false;
		}
	}
}
