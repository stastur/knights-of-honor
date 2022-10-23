import { observer } from "mobx-react-lite";
import React, { useEffect, useMemo, useRef } from "react";

import { useGameContext } from "./game-context";

export const MiniMap = observer(() => {
	const { camera, map } = useGameContext();

	const miniature = useMemo(() => map.createMiniature(0.01), []);

	const containerRef = useRef<HTMLDivElement>(null);
	const activeAreaRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		let shouldMoveCamera = false;

		const container = containerRef.current!;
		const activeArea = activeAreaRef.current!;

		const activeAreaListeners: Pick<
			{
				[K in keyof GlobalEventHandlersEventMap]: (
					event: GlobalEventHandlersEventMap[K]
				) => void;
			},
			"click" | "mousedown" | "mouseup" | "mouseleave" | "mousemove"
		> = {
			click: (ev) => ev.stopPropagation(),
			mousedown: () => {
				shouldMoveCamera = true;
			},
			mouseup: () => {
				shouldMoveCamera = false;
			},
			mouseleave: () => {
				shouldMoveCamera = false;
			},
			mousemove: (ev) => {
				if (shouldMoveCamera) {
					camera.setPosition({
						x:
							camera.position.x +
							(ev.movementX / container.clientWidth) * camera.screen.w,
						y:
							camera.position.y +
							(ev.movementY / container.clientHeight) * camera.screen.h,
					});
				}
			},
		};

		Object.entries(activeAreaListeners).forEach(([event, listener]) =>
			activeAreaRef.current?.addEventListener(
				event as keyof typeof activeAreaListeners,
				listener
			)
		);

		const listenContainerClick = (ev: MouseEvent) => {
			camera.setPosition({
				x: (ev.offsetX / container.clientWidth) * camera.screen.w,
				y: (ev.offsetY / container.clientHeight) * camera.screen.h,
			});
		};
		container.addEventListener("click", listenContainerClick);

		return () => {
			Object.entries(activeAreaListeners).forEach(([event, listener]) =>
				activeArea.removeEventListener(
					event as keyof typeof activeAreaListeners,
					listener
				)
			);

			container.removeEventListener("click", listenContainerClick);
		};
	}, []);

	const wRatio = camera.viewport.w / camera.screen.w;
	const hRatio = camera.viewport.h / camera.screen.h;

	return (
		<div
			ref={containerRef}
			className="relative bg-contain border border-white bottom-0 right-0 z-10 w-80"
			style={{
				backgroundImage: `url(${miniature})`,
				aspectRatio: camera.screen.w / camera.screen.h,
			}}
		>
			<div
				ref={activeAreaRef}
				className="absolute bg-contain border border-white"
				style={{
					width: wRatio * 100 + "%",
					aspectRatio: wRatio / hRatio,
					left: 100 * (camera.position.x / camera.screen.w) + "%",
					top: 100 * (camera.position.y / camera.screen.h) + "%",
				}}
			></div>
		</div>
	);
});
