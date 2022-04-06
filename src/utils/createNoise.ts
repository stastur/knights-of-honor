import Noise from "simplex-noise";

interface Args {
	x: number;
	y: number;
	layers?: number;
	details?: number;
	smoothing?: number;
}

export const createNoise = (seed: string): ((args: Args) => number) => {
	const noise = new Noise(seed);

	return ({ x, y, layers = 1, details = 2, smoothing = 0.5 }: Args) => {
		let noiseSum = 0;

		for (let i = 0; i < layers; i++) {
			const f = details ** i;
			const a = smoothing ** -i;

			noiseSum += a * noise.noise2D(x * f, y * f);
		}

		return 0.5 * (noiseSum / layers + 1);
	};
};
