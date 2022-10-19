import { Area } from "./area";
import { Camera } from "./camera";
import { controls } from "./controls";
import { Game } from "./game";
import { Kingdom } from "./kingdom";
import { Map } from "./map";
import { Province } from "./province";
import { Sprite } from "./sprite";
import { Town } from "./town";
import { Unit } from "./unit";

const body = document.body;

export const map = new Map();
await map.load();

const camera = new Camera(
	{
		w: body.clientWidth,
		h: body.clientHeight,
	},
	{ w: map.width, h: map.height }
);

const game = new Game(map, camera);

[map, camera].forEach((e) => {
	game.entities.set(e.id, e);
});

const human = new Unit(
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
	})
);
human.position = { x: 2000, y: 2000 };

const pig = new Unit(
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
	})
);
pig.position = { x: 2000, y: 2100 };

const humanKingdom = new Kingdom(true);
humanKingdom.addUnit(human);

const pigKingdom = new Kingdom(false);
pigKingdom.addUnit(pig);

const humanTown = new Town();
const humanProvince = new Province(humanTown, []);

humanProvince.addArea(new Area("village", { x: 2100, y: 2100 }));
humanProvince.addArea(new Area("village", { x: 2200, y: 2150 }));
humanProvince.addArea(new Area("village", { x: 2300, y: 2170 }));

humanKingdom.addProvince(humanProvince);

[
	map,
	camera,
	humanTown,
	human,
	pig,
	pigKingdom,
	humanKingdom,
	...humanProvince.areas,
].forEach((e) => {
	game.entities.set(e.id, e);
});

controls.init();
game.start();

function _makeKingdom(
	name: string,
	province: Province,
	options = { playerControlled: false }
): Kingdom {
	const kingdom = new Kingdom(options.playerControlled);
	kingdom.addProvince(province);

	return kingdom;
}

export { game };
