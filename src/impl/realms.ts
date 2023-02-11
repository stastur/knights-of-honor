import { createCanvas } from "@app/utils/canvas";
import { Point } from "@app/utils/geometry";
import { loadImage } from "@app/utils/loader";

import { realms } from "./data/realms.json";
import { Size } from "./types";

export type Realm = {
	id: keyof typeof realms;
	name: string;
	position: [x: number, y: number];
};

export class RealmsLookUp {
	view!: DataView;

	constructor(public src: string, public imgSize: Size) {}

	async load(): Promise<void> {
		const offscreenCanvas = createCanvas(this.imgSize.w, this.imgSize.h);
		const offscreenCtx = offscreenCanvas.getContext("2d")!;

		const realmsImg = await loadImage(this.src);
		offscreenCtx.drawImage(realmsImg, 0, 0);

		this.view = new DataView(
			offscreenCtx.getImageData(
				0,
				0,
				this.imgSize.w,
				this.imgSize.h
			).data.buffer
		);
	}

	getRealmIdByTile(p: Point): Realm["id"] | undefined {
		const n = p.y * this.imgSize.w + p.x;

		const colorInt = this.view.getUint32(n * 4);

		if (!colorInt) {
			return undefined;
		}

		const rgbHex = colorInt.toString(16).slice(0, -2) as Realm["id"];

		return rgbHex;
	}

	getRealmById(id: Realm["id"]): Realm {
		return realms[id] as Realm;
	}
}
