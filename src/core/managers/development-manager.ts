import { Building } from "../entities/building";
import { Province } from "../entities/province";

import { has, without } from "../../utils";

interface Project {
	name: Building["name"];
	progress: number;
	total: number;
}

type BuildingName = Building["name"];

export class DevelopmentManager {
	projects: Set<Project> = new Set();

	constructor(private province: Province) {}

	checkRequirements(name: BuildingName): boolean {
		const building = Building.resolve(name);

		if (this.province.buildings.includes(building)) {
			return false;
		}

		const hasBuildings = building.requiredBuildings.every((name) =>
			this.province.buildings.find(has({ name }))
		);

		const hasFeatures = building.requiredFeatures.every((f) =>
			this.province.features.includes(f)
		);

		return hasBuildings && hasFeatures;
	}

	build(name: BuildingName): void {
		const { workers } = Building.resolve(name);

		if (!this.checkRequirements(name)) {
			console.warn("province doesn't meet requirements");
			return;
		}

		this.projects.add({
			name,
			progress: 0,
			total: workers,
		});
	}

	destroy(name: BuildingName): void {
		for (const project of this.projects) {
			if (project.name === name) {
				this.projects.delete(project);
				break;
			}
		}

		this.province.buildings = without(
			this.province.buildings,
			Building.resolve(name)
		);
	}

	update(): void {
		this.projects.forEach(this.watchProject);
	}

	private watchProject = (project: Project): void => {
		if (project.progress <= project.total) {
			project.progress += this.province.workers;
			return;
		}

		this.projects.delete(project);
		this.province.buildings.push(Building.resolve(project.name));
	};
}
