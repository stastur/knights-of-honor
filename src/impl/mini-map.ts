import { Game } from "./game";
import { Entity } from "./types";
import { setStyles } from "./utils";

export class MiniMap implements Entity {
	box = document.createElement("div");
	frame = document.createElement("div");

	init(ctx: Game): void {
		const width = 300;
		const {
			map,
			camera: { viewport },
		} = ctx;

		setStyles(this.box, {
			position: "absolute",
			backgroundColor: "#12b886",
			bottom: "0",
			right: "0",
			width: width + "px",
			aspectRatio: (map.cols / map.rows).toString(),
		});

		const wRatio = viewport.w / map.width;
		const hRatio = viewport.h / map.height;

		setStyles(this.frame, {
			position: "absolute",
			border: "1px solid white",
			aspectRatio: (wRatio / hRatio).toString(),
			width: wRatio * width + "px",
		});

		this.box.append(this.frame);

		document.body.append(this.box);

		let shouldMoveCamera = false;

		// TODO: Introduce some destroy method and remove listeners
		this.frame.addEventListener("click", (ev) => ev.stopPropagation());

		this.frame.addEventListener("mousedown", () => {
			shouldMoveCamera = true;
		});

		this.frame.addEventListener("mouseup", () => {
			shouldMoveCamera = false;
		});

		this.frame.addEventListener("mouseleave", () => {
			shouldMoveCamera = false;
		});

		this.frame.addEventListener("mousemove", (ev) => {
			if (shouldMoveCamera) {
				ctx.camera.position.x +=
					(ev.movementX / this.box.clientWidth) * map.width;
				ctx.camera.position.y +=
					(ev.movementY / this.box.clientHeight) * map.height;
			}
		});

		this.box.addEventListener("click", (ev) => {
			ctx.camera.position.x = (ev.offsetX / this.box.clientWidth) * map.width;
			ctx.camera.position.y = (ev.offsetY / this.box.clientHeight) * map.height;
		});
	}

	update(ctx: Game): void {
		const { map, camera } = ctx;

		setStyles(this.frame, {
			left: Math.min(100 * (camera.position.x / map.width), 100) + "%",
			top: Math.min(100 * (camera.position.y / map.height), 100) + "%",
		});
	}
}
