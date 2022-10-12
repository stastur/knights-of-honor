import { Camera } from "./camera";
import { ControlPanel } from "./control-panel";
import { controls } from "./controls";
import { FpsInfo } from "./fps-info";
import { Game } from "./game";
import { GamePanel } from "./game-panel";
import { Kingdom } from "./kingdom";
import { Map } from "./map";
import { MiniMap } from "./mini-map";
import { Province } from "./province";
import { Sprite } from "./sprite";
import { Town } from "./town";
import { Unit } from "./unit";

const body = document.body;

const camera = new Camera({
	w: body.clientWidth,
	h: body.clientHeight,
});
const map = new Map();
await map.load();

const game = new Game(map, camera);

game.entities
	.add(camera)
	.add(map)
	.add(new MiniMap(map.createMiniature(0.01)))
	.add(new FpsInfo())
	.add(new GamePanel())
	.add(new ControlPanel());

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

humanKingdom.units.push(human);
human.kingdom = humanKingdom;

const pigKingdom = new Kingdom(false);
pigKingdom.units.push(pig);
pig.kingdom = pigKingdom;

const humanProvince = new Province([]);
const humanTown = new Town();

humanTown.province = humanProvince;
humanProvince.kingdom = humanKingdom;
humanProvince.town = humanTown;
humanKingdom.provinces.push(humanProvince);

game.entities
	.add(new Town())
	.add(human)
	.add(pig)
	.add(pigKingdom)
	.add(humanKingdom);

controls.init();
game.start();
