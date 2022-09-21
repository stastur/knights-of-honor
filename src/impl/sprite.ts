import { mapValues } from "@app/utils/mapValues";

import { Position } from "./components";

interface SpriteOptions {
	src: string;
	frames: number;
	framesHold?: number;
	scale?: number;
	finite?: boolean;
}

export class Sprite<T extends string> {
	states: Record<
		T,
		Required<SpriteOptions> & {
			image: HTMLImageElement;
			frame: number;
		}
	>;

	constructor(states: Record<T, SpriteOptions>) {
		this.states = mapValues(states, (options) => {
			const image = new Image();
			image.src = options.src;

			return {
				framesHold: options.frames,
				frame: 0,
				scale: 1,
				finite: false,
				image,
				...options,
			};
		});
	}

	draw(
		ctx: CanvasRenderingContext2D,
		props: {
			state: T;
			position: Position;
			framesElapsed: number;
			flip?: boolean;
		}
	): void {
		const sprite = this.states[props.state];

		if (props.framesElapsed % sprite.framesHold === 0) {
			let nextFrame = (sprite.frame + 1) % sprite.frames;

			if (sprite.finite && sprite.frame === sprite.frames - 1) {
				nextFrame = sprite.frame;
			}

			sprite.frame = nextFrame;
		}

		const width = sprite.image.width / sprite.frames;
		const height = sprite.image.height;

		const dw = width * sprite.scale;
		const dh = height * sprite.scale;

		if (props.flip) {
			ctx.save();
			ctx.scale(-1, 1);
		}

		ctx.drawImage(
			sprite.image,
			width * sprite.frame,
			0,
			width,
			height,
			// TODO: consider adding offset option, at the moment position is in the middle of a sprite
			(props.flip ? -1 : 1) * props.position.x - 0.5 * dw,
			props.position.y - 0.5 * dh,
			dw,
			dh
		);

		props.flip && ctx.restore();
	}
}
