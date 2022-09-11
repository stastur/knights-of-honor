import { Position, Movement } from "./components";
import { Game } from "./game";
import { move } from "./helpers";
import { Entity } from "./types";

export class Unit implements Entity {
	position: Position = { x: 0, y: 0 };
	movement: Movement = { speed: 30, state: "idle", angle: 0 };
	focused = false;

	box: HTMLElement;

	constructor(public name: string) {
		this.box = document.createElement("div");

		this.box.textContent = this.name;
		const styles: Partial<CSSStyleDeclaration> = {
			position: "absolute",
			width: "30px",
			height: "30px",
			fontSize: "10px",
		};
		Object.assign(this.box.style, styles);

		document.body.appendChild(this.box);

		document.addEventListener("click", (event) => {
			this.focused = event.target === this.box;
		});

		document.addEventListener("contextmenu", (event) => {
			event.preventDefault();

			if (!this.focused) {
				return;
			}

			this.update = (ctx: Game) => {
				move(this, { x: event.clientX, y: event.clientY }, ctx.state.elapsed);
			};
		});
	}

	render(): void {
		this.box.style.transform = `translate(${this.position.x}px, ${this.position.y}px)`;

		switch (this.movement.state) {
			case "idle":
				this.box.style.backgroundColor = "gray";
				break;
			case "moving":
				this.box.style.backgroundColor = "red";
				break;
		}
	}

	update(_ctx: Game): void {
		// default behavior
	}
}
