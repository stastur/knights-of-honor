import { Position, Movement } from "./components";

const calculateAngle = (from: Position, to: Position): number => {
	return Math.atan2(to.y - from.y, to.x - from.x);
};

const reposition = (
	object: { position: Position; movement: Movement },
	to: Position
): void => {
	object.position = { ...to };
};

const move = (
	object: { position: Position; movement: Movement },
	to: Position,
	elapsed = 1000
): void => {
	const { position, movement } = object;
	const dDistance = (movement.speed * elapsed) / 1000;

	const isAlreadyAtPosition =
		Math.pow(position.x - to.x, 2) + Math.pow(position.y - to.y, 2) <=
		Math.pow(dDistance, 2);

	if (isAlreadyAtPosition) {
		movement.angle = 0;
		movement.state = "idle";

		reposition(object, to);

		return;
	}

	movement.angle = calculateAngle(position, to);
	movement.state = "moving";

	position.x += Math.cos(movement.angle) * dDistance;
	position.y += Math.sin(movement.angle) * dDistance;

	return;
};

export { move, reposition, calculateAngle };
