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

	const { regions, countries } = useMemo(() => {
		const map = new HexagonalMap({ w, h, tile, seed });
		const regions = map.mapRegions((v, index) => ({ ...v, id: index }));
		const countries = map.mapCountries((v) => v);

		return { regions, countries };
	}, []);

	return (
		<div>
			<button onClick={switchView} className="fixed top-0 z-10">
				{view} view
			</button>
			<div ref={wrapperRef}>
				<Svg width={w} height={h}>
					{countries.map((rIndices, i) => (
						<Group
							className="hover:opacity-60"
							fill={view === View.Political ? getRandomColor() : undefined}
							key={i}
						>
							{rIndices
								.map((r) => regions[r])
								.map(({ capital, hexagons, id }) => (
									<Group
										key={id}
										fill={
											view === View.Strategic ? getRandomColor() : undefined
										}
									>
										{hexagons.map((vertices, index) => (
											<Path key={index} points={vertices} />
										))}

										{view === View.Strategic && (
											<circle
												fill="white"
												cx={capital.x}
												cy={capital.y}
												r="10"
											/>
										)}
									</Group>
								))}
							<text textAnchor="center">{i}</text>
						</Group>
					))}
				</Svg>
			</div>
		</div>
	);
};
