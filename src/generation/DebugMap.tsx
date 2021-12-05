import React, { useEffect, useRef } from "react";
import { HexagonalMap } from "./hexagonalMap";

export const DebugMap = (): JSX.Element => {
	const baseSize = 3000;
	const aspectRatio = window.innerWidth / window.innerHeight;

	const w = baseSize * aspectRatio;
	const h = baseSize;

	const canvasRef = useRef<HTMLCanvasElement>(null);
	const [seed, setSeed] = React.useState("knights of honor 2");
	const [tileSize, setTileSize] = React.useState(w / 200);
	const [threshold, setThreshold] = React.useState(0.5);

	const hexagonalMap = new HexagonalMap({ w, h, tileSize, seed });

	useEffect(() => {
		if (canvasRef.current) {
			hexagonalMap.drawMesh(canvasRef.current);
			hexagonalMap.colorCountries(canvasRef.current);
		}

		return () => canvasRef.current?.getContext("2d")?.clearRect(0, 0, w, h);
	}, [hexagonalMap, threshold]);

	return (
		<div className="flex w-full h-full">
			<main>
				<canvas ref={canvasRef} width={w} height={h} />
			</main>

			<aside>
				<div>
					<label htmlFor="tileSize" className="pr-2">
						tiles size:
					</label>

					<input
						type="number"
						value={tileSize}
						min={5}
						max={100}
						id="tileSize"
						onChange={(e) => setTileSize(Number(e.target.value))}
					/>
				</div>

				<div>
					<label htmlFor="threshold" className="pr-2">
						threshold:
					</label>

					<input
						type="number"
						value={threshold}
						min={-1}
						max={1}
						step={0.05}
						id="threshold"
						onChange={(e) => setThreshold(Number(e.target.value))}
					/>
				</div>

				<div className="flex">
					<label htmlFor="seed" className="pr-2">
						seed:
					</label>

					<input
						id="seed"
						value={seed}
						onChange={(e) => setSeed(e.target.value)}
					/>
				</div>
			</aside>
		</div>
	);
};
