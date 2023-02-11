// import { Area } from "./area";
import { isInBounds } from "@app/utils/geometry";

import { Camera } from "./camera";
import { controls } from "./controls";
import { Game } from "./game";
import { Kingdom } from "./kingdom";
import { WorldMap } from "./map";
import { Marshal } from "./marshal";
import { Province } from "./province";
import { Sprite } from "./sprite";

const body = document.body;

export const map = new WorldMap();
await map.load();

const camera = new Camera(
	{
		w: body.clientWidth,
		h: body.clientHeight,
	},
	{ w: map.width, h: map.height }
);

const game = new Game(map, camera);

const human = new Marshal(
	"human",
	new Sprite({
		idle: {
			frames: 11,
			framesHold: 5,
			src: "images/human/idle.png",
		},
		moving: {
			frames: 8,
			framesHold: 5,
			src: "images/human/run.png",
		},
		dead: {
			frames: 4,
			framesHold: 5,
			src: "images/human/dead.png",
			finite: true,
		},
	}),
	game
);
human.position = { x: 2000, y: 2000 };

const pig = new Marshal(
	"pig",
	new Sprite({
		idle: {
			frames: 12,
			framesHold: 5,
			src: "images/pig/idle.png",
			scale: 1.25,
		},
		moving: {
			frames: 6,
			framesHold: 5,
			src: "images/pig/run.png",
			scale: 1.25,
		},
		dead: {
			frames: 4,
			framesHold: 5,
			src: "images/pig/dead.png",
			finite: true,
			scale: 1.25,
		},
	}),
	game
);
pig.position = { x: 2000, y: 2100 };

const humanKingdom = new Kingdom("human kingdom", true);
humanKingdom.knights.add(human.id);
human.kingdom = humanKingdom;

const pigKingdom = new Kingdom("pig kingdom", false);
pigKingdom.knights.add(pig.id);
pig.kingdom = pigKingdom;

const humanProvince = new Province("human prov", game);

// humanProvince.addArea(new Area("village", { x: 2100, y: 2100 }));
// humanProvince.addArea(new Area("village", { x: 2200, y: 2150 }));
// humanProvince.addArea(new Area("village", { x: 2300, y: 2170 }));

humanKingdom.provinces.add(humanProvince.id);

[human, pig, pigKingdom, humanKingdom, humanProvince].forEach((e) => {
	game.entities.set(e.id, e);
});

controls.init();
game.start();

export { game };

//TODO: initialization
let shouldMove = false;
let dx = 0;
let dy = 0;

document.addEventListener("mousemove", (ev) => {
	const shift = 50;
	const triggerZone = 5;

	dx = dy = 0;

	shouldMove = !isInBounds(
		{ x: ev.clientX, y: ev.clientY },
		{
			x: triggerZone,
			y: triggerZone,
			w: document.body.clientWidth - 2 * triggerZone,
			h: document.body.clientHeight - 2 * triggerZone,
		}
	);

	if (ev.clientX >= document.body.clientWidth - triggerZone) {
		dx += shift;
	}

	if (ev.clientX <= triggerZone) {
		dx -= shift;
	}

	if (ev.clientY <= triggerZone) {
		dy -= shift;
	}

	if (ev.clientY >= document.body.clientHeight - triggerZone) {
		dy += shift;
	}
});

document.addEventListener("wheel", (ev) => {
	const newScale = Number(
		(camera.scale + Math.sign(ev.deltaY) * 0.1).toPrecision(1)
	);

	camera.setScale(newScale);

	game.background.setTransform(camera.scale, 0, 0, camera.scale, 0, 0);
	game.foreground.setTransform(camera.scale, 0, 0, camera.scale, 0, 0);
});

game.hooks.onUpdate = () => {
	if (!shouldMove) {
		return;
	}

	camera.move(dx, dy);
};

camera.setCenter(human.position);
