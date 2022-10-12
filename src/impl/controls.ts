import { Position } from "./components";

type MouseControls = "right-click" | "left-click";
type KeyControls =
	| "escape"
	| "enter"
	| "space"
	| "up"
	| "down"
	| "left"
	| "right";
type GameControls = MouseControls | KeyControls;

type ClickHandler = (position: Position, entityId?: number) => void;
type KeyHandler = () => void;

class Controls {
	listeners: Map<GameControls, Set<ClickHandler | KeyHandler>> = new Map();

	init() {
		document.addEventListener("click", (ev) => {
			ev.preventDefault();

			this.listeners
				.get("left-click")
				?.forEach((handler) => handler({ x: ev.clientX, y: ev.clientY }));
		});

		document.addEventListener("contextmenu", (ev) => {
			ev.preventDefault();
			const target = ev.target as HTMLElement;
			const entityId = target.dataset.id
				? Number.parseInt(target.dataset.id)
				: undefined;

			this.listeners
				.get("right-click")
				?.forEach((handler) =>
					handler({ x: ev.clientX, y: ev.clientY }, entityId)
				);
		});

		document.addEventListener("keydown", (ev) => {
			const controlsMap: Record<string, KeyControls> = {
				Enter: "enter",
				Escape: "escape",
				" ": "space",
				ArrowUp: "up",
				ArrowDown: "down",
				ArrowLeft: "left",
				ArrowRight: "right",
			};

			if (controlsMap[ev.key]) {
				ev.preventDefault();

				this.listeners
					.get(controlsMap[ev.key])
					?.forEach((handler) => (handler as KeyHandler)());
			}
		});
	}

	on<T extends GameControls>(
		event: T,
		handler: T extends MouseControls ? ClickHandler : KeyHandler
	) {
		if (!this.listeners.has(event)) {
			this.listeners.set(event, new Set());
		}

		this.listeners.get(event)?.add(handler);
	}

	off<T extends GameControls>(
		event: T,
		handler: T extends MouseControls ? ClickHandler : KeyHandler
	) {
		this.listeners.get(event)?.delete(handler);
	}
}

export const controls = new Controls();
