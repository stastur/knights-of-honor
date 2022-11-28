import { createCanvas } from "@app/utils/canvas";
import { Point } from "@app/utils/geometry";
import { loadImage } from "@app/utils/loader";

import { realms } from "./data/realms.json";
import { Size } from "./types";

type RealmId = keyof typeof realms;
type Realm = { id: RealmId; name: string; position: [x: number, y: number] };

export class Realms {
	view!: DataView;

	constructor(public src: string, public size: Size) {}

	async load(): Promise<void> {
		const offscreenCanvas = createCanvas(this.size.w, this.size.h);
		const offscreenCtx = offscreenCanvas.getContext("2d")!;

		const realmsImg = await loadImage(this.src);
		offscreenCtx.drawImage(realmsImg, 0, 0);

		this.view = new DataView(
			offscreenCtx.getImageData(0, 0, this.size.w, this.size.h).data.buffer
		);
	}

	getRealmIdByTile(p: Point): RealmId | undefined {
		const n = p.y * this.size.w + p.x;

		const colorInt = this.view.getUint32(n * 4);

		if (!colorInt) {
			return undefined;
		}

		const rgbHex = colorInt.toString(16).slice(0, -2) as RealmId;

		return rgbHex;
	}

	getRealmById(id: RealmId): Realm {
		return realms[id] as Realm;
	}
}

const rMap = new Realms("images/map/realms.png", { w: 1400, h: 1400 });

await rMap.load();

const realmId = rMap.getRealmIdByTile({ x: 700, y: 700 });
console.log(realmId && rMap.getRealmById(realmId));
