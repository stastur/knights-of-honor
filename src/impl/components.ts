interface Position {
	x: number;
	y: number;
}

interface Movement {
	angle: number;
	speed: number;
	state: "idle" | "moving";
}

export type { Position, Movement };
