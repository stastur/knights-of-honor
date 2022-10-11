interface Position {
	x: number;
	y: number;
}

interface Movement {
	angle: number;
	speed: number;
	state: "idle" | "moving" | "dead";
}

interface Components {
	position: Position;
	movement: Movement;
}

export type { Position, Movement, Components };

export type Tag = "playerControlled" | "focusable";

export type Tags = Partial<Record<Tag, boolean>>;
