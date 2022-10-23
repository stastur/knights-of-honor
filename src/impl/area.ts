import { makeObservable, observable } from "mobx";

import { setStyles } from "@app/utils/html";

import { Position } from "./components";
import { Game } from "./game";
import { newId } from "./ids";
import { Province } from "./province";
import { Entity } from "./types";
import { createOverlay, getOverlayStyles, toCanvasPosition } from "./utils";

type Type = "coastal" | "farm" | "village" | "monastery";

const baseStats = {
	gold: 0,
	food: 0,
	piety: 0,
	books: 0,
	workers: 0,
};

const baseStatsFor: Record<Type, Partial<typeof baseStats>> = {
	coastal: {
		gold: 1,
		food: 1,
	},
	farm: {
		food: 1,
	},
	monastery: {
		piety: 1,
		books: 1,
	},
	village: {
		workers: 1,
	},
};

export class Area implements Entity<"position"> {
	id = newId();
	overlay = createOverlay(this.id);

	stats: typeof baseStats;

	province?: Province;

	constructor(public type: Type, public position: Position) {
		makeObservable(this, {
			stats: observable,
		});

		this.stats = { ...baseStats, ...baseStatsFor[type] };
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
