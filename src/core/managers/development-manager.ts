import { values } from "@app/utils";

import { Building } from "../entities/building";
import { Province } from "../entities/province";

type BuildingName = Building["name"];

export interface Project {
	name: BuildingName;
	progress: number;
	total: number;
}

export class DevelopmentManager {
	projects: Map<BuildingName, Project> = new Map();

	constructor(private province: Province) {}

	private hasFeaturesFor(building: Building): boolean {
		return building.requiredFeatures.every((f) =>
			this.province.features.includes(f)
		);
	}

	private hasBuildingsFor(building: Building): boolean {
		const { buildings } = this.province;

		return building.requiredBuildings.every(
			(name) =>
				buildings.has(name) ||
				values(buildings).some((b) => b.isUpgradeOf(name))
		);
	}

	canBuild(name: BuildingName): "yes" | "no" | "not-yet" {
		const building = Building.resolve(name);

		if (!this.hasFeaturesFor(building)) {
			return "no";
		}

		const canBuildRequiredBuildings = building.requiredBuildings.every(
			(b) => this.canBuild(b) !== "no"
		);

		if (!canBuildRequiredBuildings) {
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
		const { buildings } = this.province;
		const building = Building.resolve(name);

		const isBuilt = buildings.has(name);
		const isUpgraded = values(buildings).some((b) => b.isUpgradeOf(name));

		if (!isBuilt && !isUpgraded) {
			return building;
		}

		if (!building.next) {
			return null;
		}

		return this.getRelevantVariant(building.next);
	}

	destroy(name: BuildingName): void {
		this.projects.delete(name);

		this.getDependents(name).forEach((dependent) => this.destroy(dependent));

		this.projects.forEach(
			(_, projectName) =>
				Building.resolve(projectName).dependsOn(name) &&
				this.projects.delete(projectName)
		);

		this.province.removeBuilding(name);
	}

	getDependents(name: BuildingName): BuildingName[] {
		const dependents: BuildingName[] = [];

		for (const b of this.province.buildings.values()) {
			b.dependsOn(name) && dependents.push(b.name);
		}

		return dependents;
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
		newBuilding.previous && this.province.removeBuilding(newBuilding.previous);

		this.province.addBuilding(newBuilding.name);
	};
}
