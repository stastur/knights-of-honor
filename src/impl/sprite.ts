import { Boundary } from "@app/utils/geometry";
import { mapValues } from "@app/utils/objects";

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

	boundary: Boundary = {
		x: 0,
		y: 0,
		w: 0,
		h: 0,
	};

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

		const boundary: Boundary = {
			// TODO: offset option, at the moment position is in the middle of a sprite
			x: props.position.x - 0.5 * dw,
			y: props.position.y - 0.5 * dh,
			w: dw,
			h: dh,
		};

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
			props.flip ? -boundary.x - dw : boundary.x,
			boundary.y,
			boundary.w,
			boundary.h
		);

		props.flip && ctx.restore();

		this.boundary = boundary;
	}
}
