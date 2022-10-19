import { setStyles } from "@app/utils/html";

import { Position } from "./components";
import { Game } from "./game";
import { newId } from "./ids";
import { Province } from "./province";
import { Entity } from "./types";
import { createOverlay, getOverlayStyles, toCanvasPosition } from "./utils";

type AreaType = "coastalVillage" | "farm" | "monastery" | "village";

export class Area implements Entity<"position"> {
	id = newId();
	overlay = createOverlay(this.id);

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

	province?: Province;

	constructor(public type: AreaType, public position: Position) {
		const resourceForType: Record<AreaType, keyof typeof this.baseStats> = {
			coastalVillage: "gold",
			farm: "food",
			monastery: "piety",
			village: "workers",
		};

		this.stats[resourceForType[type]]++;
	}

	init(ctx: Game): void {
		this.overlay.onclick = () => {
			ctx.activeEntityId = this.id;
		};

		document.body.appendChild(this.overlay);
	}

	update(ctx: Game): void {
		const position = toCanvasPosition(ctx.camera, this.position);
		const area = new Path2D();

		area.arc(position.x, position.y, 5, 0, Math.PI * 2);

		ctx.scene.fillStyle = "white";
		ctx.scene.fill(area);

		setStyles(this.overlay, getOverlayStyles({ ...position, w: 10, h: 10 }));
	}
}
