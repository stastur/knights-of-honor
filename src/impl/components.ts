interface Position {
	x: number;
	y: number;
}

interface Movement {
	angle: number;
	speed: number;
	state: "idle" | "moving" | "dead";
	target: Position | null;
	path: Position[] | null;
}

interface Health {
	percentage: number;
	regenerationRate: number;
}

interface Damage {
	attack: number;
}

interface Components {
	position: Position;
	movement: Movement;
	health: Health;
	damage: Damage;
}

export type { Position, Movement, Health, Damage, Components };

export type Tag = "enemy" | "ally" | "player" | "focusable" | "focused";

export type Tags = Partial<Record<Tag, boolean>>;
