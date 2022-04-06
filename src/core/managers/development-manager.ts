import { Building } from "../entities/building";
import { Province } from "../entities/province";

export interface Project {
	name: Building["name"];
	progress: number;
	total: number;
}

type BuildingName = Building["name"];

export class DevelopmentManager {
	projects: Map<BuildingName, Project> = new Map();

	constructor(private province: Province) {}

	private hasFeaturesFor(building: Building): boolean {
		return building.requiredFeatures.every((f) =>
			this.province.features.includes(f)
		);
	}

	private hasBuildingsFor(building: Building): boolean {
		return building.requiredBuildings.every((name) =>
			this.province.buildings.some(
				(b) => b.name === name || b.isUpgradeOf(name)
			)
		);
	}

	canBuild(name: BuildingName): "yes" | "no" | "not-yet" {
		const building = Building.resolve(name);

		if (!this.hasFeaturesFor(building)) {
			return "no";
		}

		if (building.requiredBuildings.some((b) => this.canBuild(b) === "no")) {
			return "no";
		}

		if (this.hasBuildingsFor(building)) {
			return "yes";
		}

		return "not-yet";
	}

	forceProject(name: BuildingName): void {
		const project = this.projects.get(name);

		if (!project) {
			return;
		}

		project.progress = project.total;
	}

	build(name: BuildingName): void {
		const { workers } = Building.resolve(name);

		if (this.canBuild(name) !== "yes") {
			console.warn("province doesn't meet requirements");
			return;
		}

		this.projects.set(name, {
			name,
			progress: 0,
			total: workers,
		});
	}

	getRelevantVariant(name: BuildingName): Building | null {
		const building = Building.resolve(name);
		const { buildings } = this.province;

		if (
			!buildings.includes(building) &&
			!buildings.some((b) => b.isUpgradeOf(name))
		) {
			return building;
		}

		if (!building.next) {
			return null;
		}

		return this.getRelevantVariant(building.next);
	}

	destroy(name: BuildingName): void {
		this.projects.delete(name);
		this.getDependents(name).forEach((name) => this.destroy(name));
		this.province.removeBuilding(Building.resolve(name));
	}

	getDependents(name: BuildingName): BuildingName[] {
		return this.province.buildings
			.filter((b) => b.dependsOn(name))
			.map((b) => b.name);
	}

	update(): void {
		this.projects.forEach(this.watchProject);
	}

	private watchProject = (project: Project): void => {
		if (project.progress < project.total) {
			project.progress += this.province.workers;
			return;
		}

		this.projects.delete(project.name);

		const newBuilding = Building.resolve(project.name);

		if (newBuilding.previous) {
			const index = this.province.buildings.indexOf(
				Building.resolve(newBuilding.previous)
			);

			this.province.buildings[index] = newBuilding;
			return;
		}

		this.province.addBuilding(newBuilding);
	};
}
