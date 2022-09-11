import { FpsInfo } from "./fps-info";
import { Unit } from "./unit";
import { Game } from "./game";

const game = new Game();

game.entities.add(new Unit("hero1"));
game.entities.add(new Unit("hero2"));
game.entities.add(new FpsInfo());

game.start();
