import { createCanvas } from "@app/utils/canvas";

import { Camera } from "./camera";
import { Size } from "./types";

export class Scene {
	foreground: CanvasRenderingContext2D;
	background: CanvasRenderingContext2D;
	offscreen: CanvasRenderingContext2D;

	camera: Camera;

	constructor(public container: HTMLElement, public screen: Size) {
		const { width, height } = container.getBoundingClientRect();

		this.foreground = createCanvas(width, height).getContext("2d")!;
		this.background = createCanvas(width, height).getContext("2d")!;
		this.offscreen = createCanvas(width, height).getContext("2d")!;

		this.camera = new Camera({ w: width, h: height }, screen);
	}
}
