import React from "react";
import { createRoot } from "react-dom/client";

import { setStyles } from "@app/utils/html";

import { Battle } from "./battle";

import { Game } from "./game";
import { Town } from "./town";
import { Entity } from "./types";
import { BattlePanel } from "./ui/battle-panel";
import { TownPanel } from "./ui/town-panel";
import { UnitPanel } from "./ui/unit-panel";
import { Unit } from "./unit";

export class ControlPanel implements Entity {
	box = document.createElement("div");
	root = createRoot(this.box);

	init(): void {
		setStyles(this.box, {
			position: "absolute",
			bottom: "0",
			left: "0",
			right: "0",
			margin: "auto",
		});

		document.body.appendChild(this.box);
	}

	update(ctx: Game): void {
		if (!ctx.activeEntity) {
			setStyles(this.box, { visibility: "hidden" });
			return;
		}

		setStyles(this.box, { visibility: "visible" });

		if (
			ctx.activeEntity instanceof Town ||
			(ctx.activeEntity instanceof Unit && ctx.activeEntity.town)
		) {
			const town =
				ctx.activeEntity instanceof Town
					? ctx.activeEntity
					: ctx.activeEntity.town;

			const marshal = town?.marshal;

			this.root.render(
				<TownPanel
					town={town!}
					onMarshalFocus={() => (ctx.activeEntity = marshal || null)}
				/>
			);

			return;
		}

		if (ctx.activeEntity instanceof Unit) {
			this.root.render(<UnitPanel unit={ctx.activeEntity} />);
			return;
		}

		if (ctx.activeEntity instanceof Battle) {
			this.root.render(<BattlePanel battle={ctx.activeEntity} />);
			return;
		}
	}
}
