import { createCanvas } from "@app/utils/canvas";

import { kingdoms } from "./data/kingdoms.json";
import { RealmsLookUp } from "./realms";
import { Size } from "./types";

const realms = new RealmsLookUp("images/map/realms.png", { w: 1400, h: 1400 });
await realms.load();

export class PoliticalMap {
	offscreen: CanvasRenderingContext2D;
	map = new Map<string, Path2D>();

	constructor(public tileSize: number = 2) {
		for (let y = 0; y < realms.imgSize.h; y++) {
			for (let x = 0; x < realms.imgSize.w; x++) {
				const realmId = realms.getRealmIdByTile({ x, y });

				if (!realmId) {
					continue;
				}

				if (!this.map.has(realmId)) {
					this.map.set(realmId, new Path2D());
				}

				const path = this.map.get(realmId)!;
				path.rect(
					x * this.tileSize,
					y * this.tileSize,
					this.tileSize,
					this.tileSize
				);
			}
		}

		this.offscreen = createCanvas(
			this.tileSize * realms.imgSize.w,
			this.tileSize * realms.imgSize.h
		).getContext("2d")!;

		for (const [color, path] of this.map.entries()) {
			this.offscreen.fillStyle = "#" + color;
			this.offscreen.fill(path);
		}
	}

	draw(ctx: CanvasRenderingContext2D): void {
		ctx.drawImage(this.offscreen.canvas, 0, 0);
	}
}
