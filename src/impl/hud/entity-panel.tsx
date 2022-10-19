import React from "react";

import { Area } from "../area";
import { Town } from "../town";
import { Entity } from "../types";
import { Unit } from "../unit";

import { AreaPanel } from "./area-panel";
import { TownPanel } from "./town/town-panel";
import { UnitPanel } from "./unit-panel";

interface EntityPanelProps {
	entity: Entity;
}

export const EntityPanel = (props: EntityPanelProps) => {
	if (props.entity instanceof Town) {
		return <TownPanel town={props.entity} />;
	}

	if (props.entity instanceof Unit) {
		return <UnitPanel unit={props.entity} />;
	}

	if (props.entity instanceof Area) {
		return <AreaPanel area={props.entity} />;
	}

	return null;
};
