import { Point } from "./geometry";

export function clearCanvas(ctx: CanvasRenderingContext2D) {
	ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
}

export function createCanvas(width: number, height: number): HTMLCanvasElement {
	const canvas = document.createElement("canvas");
	const ctx = canvas.getContext("2d")!;

	const scale = window.devicePixelRatio;

	canvas.height = height * scale;
	canvas.width = width * scale;

	canvas.style.height = height + "px";
	canvas.style.width = width + "px";

	ctx.scale(scale, scale);

	return canvas;
}

export function drawPolyline(
	ctx: CanvasRenderingContext2D,
	points: Point[]
): void {
	const goal = points.at(-1);

	ctx.fillStyle = ctx.strokeStyle = "red";

	ctx.beginPath();
	points.forEach(({ x, y }) => {
		ctx.lineTo(x, y);
	});
	ctx.stroke();

	ctx.beginPath();
	goal && ctx.arc(goal.x, goal.y, 10, 0, Math.PI * 2);
	ctx.fill();
}
