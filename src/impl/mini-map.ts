import { Game } from "./game";
import { Entity } from "./types";
import { setStyles } from "./utils";

export class MiniMap implements Entity {
	box = document.createElement("div");
	frame = document.createElement("div");

	init(ctx: Game): void {
		const width = 300;

		setStyles(this.box, {
			position: "absolute",
			backgroundColor: "black",
			bottom: "0",
			right: "0",
			width: width + "px",
			aspectRatio: (ctx.map.cols / ctx.map.rows).toString(),
		});

		const viewportToMapWRatio =
			ctx.backgroundCanvas.clientWidth / (ctx.map.cols * ctx.map.size);
		const viewportToMapHRatio =
			ctx.backgroundCanvas.clientHeight / (ctx.map.cols * ctx.map.size);

		setStyles(this.frame, {
			position: "absolute",
			border: "1px solid white",
			aspectRatio: (viewportToMapWRatio / viewportToMapHRatio).toString(),
			width: viewportToMapWRatio * width + "px",
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
					(ev.movementX / this.box.clientWidth) * ctx.map.cols * ctx.map.size;
				ctx.camera.position.y +=
					(ev.movementY / this.box.clientHeight) * ctx.map.rows * ctx.map.size;
			}
		});

		this.box.addEventListener("click", (ev) => {
			ctx.camera.position.x =
				(ev.offsetX / this.box.clientWidth) * ctx.map.cols * ctx.map.size;
			ctx.camera.position.y =
				(ev.offsetY / this.box.clientHeight) * ctx.map.rows * ctx.map.size;
		});
	}

	update(ctx: Game): void {
		const { map, camera } = ctx;

		setStyles(this.frame, {
			left:
				Math.min((100 * camera.position.x) / (map.cols * map.size), 100) + "%",
			top:
				Math.min((100 * camera.position.y) / (map.rows * map.size), 100) + "%",
		});
	}
}
