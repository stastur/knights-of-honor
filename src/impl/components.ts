interface Position {
	x: number;
	y: number;
}

interface Movement {
	angle: number;
	speed: number;
	state: "idle" | "moving";
}

interface Appearance {
	width: number;
	height: number;
	offset: number;
	sprite: HTMLImageElement;
}

export type { Position, Movement, Appearance };
