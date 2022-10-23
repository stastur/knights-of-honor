import React from "react";

import { Area } from "../area";
import { Marshal } from "../marshal";
import { Province } from "../province";
import { Entity } from "../types";

import { AreaPanel } from "./area-panel";
import { TownPanel } from "./town/town-panel";
import { UnitPanel } from "./unit-panel";

interface EntityPanelProps {
	entity: Entity;
}

export const EntityPanel = (props: EntityPanelProps) => {
	if (props.entity instanceof Province) {
		return <TownPanel town={props.entity} />;
	}

	if (props.entity instanceof Marshal) {
		return <UnitPanel unit={props.entity} />;
	}

	if (props.entity instanceof Area) {
		return <AreaPanel area={props.entity} />;
	}

	return null;
};
