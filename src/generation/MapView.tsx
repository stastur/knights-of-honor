import React, {
	useCallback,
	useEffect,
	useLayoutEffect,
	useMemo,
	useRef,
	useState,
} from "react";
import createPanZoom from "panzoom";

import { Group, Path, Svg } from "../svg";
import { getRandomColor } from "../utils/getRandomColor";
import { HexagonalMap } from "./hexagonalMap";
import { Map } from "./map";

enum View {
	Strategic = "strategic",
	Political = "political",
}

const viewStateMachine = {
	[View.Strategic]: View.Political,
	[View.Political]: View.Strategic,
};

const useViewSwitcher = (defaultView = View.Political) => {
	const [view, setView] = useState(defaultView);

	const switchView = useCallback(
		() => setView((activeView) => viewStateMachine[activeView]),
		[]
	);

	return [view, switchView] as const;
};

export const MapView = () => {
	const wrapperRef = useRef<HTMLDivElement>(null);
	const [view, switchView] = useViewSwitcher();

	useLayoutEffect(() => {
		if (!wrapperRef.current) {
			return;
		}

		const instance = createPanZoom(wrapperRef.current, {
			bounds: true,
			boundsPadding: 1,
			minZoom: 1,
			// maxZoom: 2,
			// initialZoom: 2,
		});

		return () => instance.dispose();
	}, []);

	const baseSize = 3000;
	const aspectRatio = window.innerWidth / window.innerHeight;

	const w = baseSize * aspectRatio;
	const h = baseSize;
	const tile = 50;

	const seed = "knights of honor 2";

	const map = useMemo(() => {
		const map = new Map({ w, h, tile, seed });

		return map;
	}, []);

	const { geopolitics, terraform } = map;

	return (
		<div>
			<button onClick={switchView} className="fixed top-0 z-10">
				{view} view
			</button>

			<div ref={wrapperRef}>
				<Svg width={w} height={h}>
					{/* {terraform.centers.map((i) => (
						<Group
							key={i}
							fill={`hsl(${200 - 200 * terraform.temperature[i]}, 100%, 70%)`}
						>
							<Path points={terraform.getHexagonVertices(i)}></Path>
						</Group>
					))} */}

					{geopolitics.regions.map(({ town, border }, i) => (
						<Group key={i} stroke={getRandomColor()}>
							<circle
								cx={town.x}
								cy={town.y}
								width={5}
								height={5}
								fill="white"
							/>
							<Path points={border}></Path>
						</Group>
					))}
				</Svg>
			</div>
		</div>
	);
};
