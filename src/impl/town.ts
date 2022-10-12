import { setStyles } from "@app/utils/html";

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

	init(ctx: Game) {
		this.overlay.onclick = () => {
			ctx.activeEntityId = this.id;
		};

		document.body.append(this.overlay);
	}

	update(ctx: Game): void {
		this.render(ctx);
	}

	render({ scene: ctx, frameInfo: { framesElapsed }, camera }: Game): void {
		const position = toCanvasPosition(camera, this.position);

		this.sprite.draw(ctx, {
			state: "default",
			position,
			framesElapsed,
		});

		setStyles(this.overlay, getOverlayStyles(this.sprite.boundary));
	}
}
