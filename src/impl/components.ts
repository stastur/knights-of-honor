interface Position {
	x: number;
	y: number;
}

interface Movement {
	readonly speed: number;
	state: "idle" | "moving";
	angle: number;
}

export type { Position, Movement };
