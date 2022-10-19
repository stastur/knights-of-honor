import { setStyles } from "@app/utils/html";

import { Building } from "./buildings/building";

import { Position } from "./components";
import { Game } from "./game";
import { newId } from "./ids";
import { Province } from "./province";
import { Sprite } from "./sprite";
import { Entity } from "./types";
import { Unit } from "./unit";
import { createOverlay, getOverlayStyles, toCanvasPosition } from "./utils";

export class Town implements Entity<"position"> {
	id = newId();
	overlay = createOverlay(this.id);

	position: Position = { x: 2000, y: 2500 };

	sprite = new Sprite({
		default: {
			src: "images/town.png",
			frames: 1,
		},
	});

	// game data
	marshal?: Unit;
	province?: Province;

	baseStats = {
		gold: 0,
		food: 0,
		piety: 0,
		books: 0,
		workers: 0,
	};

	stats = {
		...this.baseStats,
	};

	buildings: Building[] = [];

	init(ctx: Game) {
		this.overlay.onclick = () => {
			ctx.activeEntityId = this.id;
		};

		document.body.append(this.overlay);
	}

	update(ctx: Game): void {
		this.render(ctx);
	}

	render({ scene: ctx, frameInfo: { currentFrame }, camera }: Game): void {
		const position = toCanvasPosition(camera, this.position);

		this.sprite.draw(ctx, {
			state: "default",
			position,
			currentFrame,
		});

		setStyles(this.overlay, getOverlayStyles(this.sprite.boundary));
	}
}
