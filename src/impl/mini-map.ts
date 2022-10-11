import { setStyles } from "@app/utils/html";

import { Game } from "./game";
import { Entity } from "./types";

export class MiniMap implements Entity {
	container = document.createElement("div");
	activeArea = document.createElement("div");

	constructor(public mapMiniature: string) {}

	init(ctx: Game): void {
		const width = 300;
		const {
			map,
			camera: { viewport },
		} = ctx;

		setStyles(this.container, {
			position: "absolute",
			backgroundImage: `url(${this.mapMiniature})`,
			backgroundSize: "contain",
			border: "1px solid white",
			bottom: "0",
			right: "0",
			width: width + "px",
			aspectRatio: (map.cols / map.rows).toString(),
		});

		const wRatio = viewport.w / map.width;
		const hRatio = viewport.h / map.height;

		setStyles(this.activeArea, {
			position: "absolute",
			border: "1px solid white",
			aspectRatio: (wRatio / hRatio).toString(),
			width: wRatio * width + "px",
		});

		this.container.append(this.activeArea);

		document.body.append(this.container);

		let shouldMoveCamera = false;

		// TODO: remove listeners on destroy
		this.activeArea.addEventListener("click", (ev) => ev.stopPropagation());

		this.activeArea.addEventListener("mousedown", () => {
			shouldMoveCamera = true;
		});

		this.activeArea.addEventListener("mouseup", () => {
			shouldMoveCamera = false;
		});

		this.activeArea.addEventListener("mouseleave", () => {
			shouldMoveCamera = false;
		});

		this.activeArea.addEventListener("mousemove", (ev) => {
			if (shouldMoveCamera) {
				ctx.camera.position.x +=
					(ev.movementX / this.container.clientWidth) * map.width;
				ctx.camera.position.y +=
					(ev.movementY / this.container.clientHeight) * map.height;
			}
		});

		this.container.addEventListener("click", (ev) => {
			ctx.camera.position.x =
				(ev.offsetX / this.container.clientWidth) * map.width;
			ctx.camera.position.y =
				(ev.offsetY / this.container.clientHeight) * map.height;
		});
	}

	update(ctx: Game): void {
		const { map, camera } = ctx;

		setStyles(this.activeArea, {
			left: Math.min(100 * (camera.position.x / map.width), 100) + "%",
			top: Math.min(100 * (camera.position.y / map.height), 100) + "%",
		});
	}
}
