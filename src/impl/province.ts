import { makeAutoObservable } from "mobx";

import { setStyles } from "@app/utils/html";

import { Area } from "./area";
import { hasDependency, isUpgrade, resolve } from "./buildings";
import { Building } from "./buildings/building";
import { Position } from "./components";
import { Game } from "./game";
import { newId } from "./ids";
import { Marshal } from "./marshal";
import { Sprite } from "./sprite";
import { Entity } from "./types";
import { createOverlay, getOverlayStyles, toCanvasPosition } from "./utils";

const baseStats = {
	gold: 10,
	food: 10,
	piety: 10,
	books: 10,
	workers: 10,
};

export class Province implements Entity<"position"> {
	id = newId();
	overlay = createOverlay(this.id);

	position: Position = { x: 2000, y: 2500 };

	sprite = new Sprite({
		default: {
			src: "images/town.png",
			frames: 1,
		},
	});

	// game data
	marshal?: Marshal;
	guards = [];

	stats = { ...baseStats };

	areas = new Set<Area["id"]>();

	healthCheck = {
		development: 0,
		taxes: 0,
		wars: 0,
	};

	food = {
		limit: 100,
		value: 100,
	};

	population = {
		limit: 100,
		value: 100,
	};

	features = [];

	improvements = {
		completed: new Map<Building["name"], Building>(),
		inProgress: new Map<Building["name"], number>(),
	};

	constructor(public name: string, public game: Game) {
		makeAutoObservable(this);
	}

	init() {
		this.overlay.onclick = () => {
			this.game.activeEntityId = this.id;
		};

		document.body.append(this.overlay);
	}

	update(): void {
		if (this.game.frameInfo.currentFrame === 60) {
			this.updateFood();
			this.updateInProgressImprovements();
		}

		this.render();
	}

	render(): void {
		const {
			camera,
			scene,
			frameInfo: { currentFrame },
		} = this.game;

		const position = toCanvasPosition(camera, this.position);

		this.sprite.draw(scene, {
			state: "default",
			position,
			currentFrame,
		});

		setStyles(this.overlay, getOverlayStyles(this.sprite.boundary));
	}

	// DEVELOPMENT
	hasFeaturesFor(building: Building): boolean {
		return building.requiredFeatures.every((f) =>
			this.features.includes(f as never)
		);
	}

	hasBuildingsFor(building: Building): boolean {
		const buildings = this.improvements.completed;

		return building.requiredBuildings.every(
			(name) =>
				buildings.has(name) ||
				[...buildings.values()].some((b) => isUpgrade(b, name))
		);
	}

	isConstructionPossible(name: Building["name"]): boolean {
		const building = resolve(name);

		return (
			this.hasFeaturesFor(building) &&
			building.requiredBuildings.every((name) =>
				this.isConstructionPossible(name)
			)
		);
	}

	isConstructionAvailable(name: Building["name"]): boolean {
		return this.hasBuildingsFor(resolve(name));
	}

	forceProject(name: Building["name"]): void {
		const projects = this.improvements.inProgress;

		projects.has(name) && projects.set(name, resolve(name).workers);
	}

	build(name: Building["name"]): void {
		if (
			this.isConstructionPossible(name) &&
			this.isConstructionAvailable(name)
		) {
			return;
		}

		this.improvements.inProgress.set(name, 0);
	}

	getRelevantVariant(name: Building["name"]): Building | null {
		const completed = this.improvements.completed;
		const building = resolve(name);

		const isBuilt = completed.has(name);
		const isUpgraded = [...completed.values()].some((b) => isUpgrade(b, name));

		if (!isBuilt && !isUpgraded) {
			return building;
		}

		if (!building.next) {
			return null;
		}

		return this.getRelevantVariant(building.next);
	}

	destroy(name: Building["name"]): void {
		this.improvements.inProgress.delete(name);

		this.getDependents(name).forEach((dependent) => this.destroy(dependent));

		this.improvements.inProgress.forEach(
			(_, projectName) =>
				hasDependency(resolve(projectName), name) &&
				this.improvements.inProgress.delete(projectName)
		);

		this.improvements.completed.delete(name);
	}

	getDependents(name: Building["name"]): Array<Building["name"]> {
		const dependents: Array<Building["name"]> = [];

		for (const b of this.improvements.completed.values()) {
			hasDependency(b, name) && dependents.push(b.name);
		}

		return dependents;
	}

	updateInProgressImprovements(): void {
		const projects = this.improvements.inProgress;
		const completed = this.improvements.completed;

		projects.forEach((progress, name) => {
			if (progress < resolve(name).workers) {
				return projects.set(name, progress + this.getWorkersCount());
			}

			projects.delete(name);

			const newBuilding = resolve(name);
			newBuilding.previous && completed.delete(newBuilding.previous);
			completed.set(newBuilding.name, newBuilding);
		});
	}

	getAreas() {
		return [...this.areas.values()]
			.map((id) => this.game.entities.get(id))
			.filter(Boolean) as Area[];
	}

	updateFood() {
		const totalFood =
			this.stats.food +
			this.getAreas().reduce((total, { stats }) => stats.food + total, 0);

		this.food.value = Math.min(this.food.value + totalFood, this.food.limit);
	}

	getWorkersCount() {
		return (
			this.stats.workers +
			this.getAreas().reduce((total, { stats }) => stats.workers + total, 0)
		);
	}
}
