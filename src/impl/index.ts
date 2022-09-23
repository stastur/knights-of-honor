import { controls } from "./controls";
import { FpsInfo } from "./fps-info";
import { Unit } from "./unit";
import { Game } from "./game";
import { GamePanel } from "./game-panel";
import { Sprite } from "./sprite";
import { Town } from "./town";
import { Map } from "./map";
import { Camera } from "./camera";
import { MiniMap } from "./mini-map";

const camera = new Camera(document.body);
const map = new Map();
await map.load();

const game = new Game(map, camera);

game.entities.add(camera);
game.entities.add(map);
game.entities.add(new MiniMap());
game.entities.add(new FpsInfo());
game.entities.add(new GamePanel());

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
human.position = { x: 50, y: 100 };

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

pig.position = { x: 200, y: 100 };

game.entities.add(human);
game.entities.add(pig);
game.entities.add(new Town());

controls.init();

game.start();
