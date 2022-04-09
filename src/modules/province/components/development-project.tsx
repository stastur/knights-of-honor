import React from "react";
import {
	Box,
	BoxProps,
	Center,
	Flex,
	IconButton,
	Progress,
} from "@chakra-ui/react";
import { observer } from "mobx-react-lite";

import { GiCancel, GiLightningStorm } from "react-icons/gi";

import { Project } from "@app/core/managers/development-manager";
import { Building } from "@app/core/entities/building";
import { useDevelopmentManager } from "@app/contexts/development-context";

import { BuildingCell } from "./building-cell";

export const DevelopmentProject = observer(
	({ name, progress, total, ...boxProps }: Project & BoxProps): JSX.Element => {
		const building = Building.resolve(name);

		const developmentManager = useDevelopmentManager();

		return (
			<Box {...boxProps}>
				<Center width="100%">
					<BuildingCell building={building} />
				</Center>

				<Box position="relative">
					<Progress
						max={total}
						value={progress}
						colorScheme="green"
						backgroundColor="red.700"
						border="1px solid yellow"
					/>

					<Box position="absolute" right={0} bottom="100%">
						{progress}/{total}
					</Box>

					<Flex
						justifyContent="space-between"
						position="absolute"
						left={0}
						right={0}
					>
						<IconButton
							icon={<GiCancel />}
							aria-label="Cancel project"
							onClick={() => developmentManager.destroy(name)}
						/>

						<IconButton
							icon={<GiLightningStorm />}
							aria-label="Force project"
							onClick={() => developmentManager.forceProject(name)}
						/>
					</Flex>
				</Box>
			</Box>
		);
	}
);
