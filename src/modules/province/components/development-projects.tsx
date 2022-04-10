import React from "react";
import {
	Box,
	BoxProps,
	Center,
	Flex,
	FlexProps,
	IconButton,
	Progress,
	Text,
} from "@chakra-ui/react";
import { observer } from "mobx-react-lite";

import { GiCancel, GiLightningStorm } from "react-icons/gi";

import { Project } from "@app/core/managers";
import { Building } from "@app/core/entities";
import { useDevelopmentManager } from "@app/contexts";

import { BuildingCell } from "./building-cell";

interface DevelopmentProjectProps {
	project: Project;
}

const DevelopmentProject = observer(
	({
		project,
		...boxProps
	}: DevelopmentProjectProps & BoxProps): JSX.Element => {
		const { name, progress, total } = project;
		const building = Building.resolve(name);

		const developmentManager = useDevelopmentManager();

		return (
			<Box {...boxProps}>
				<Center>
					<BuildingCell building={building} width="4.5rem" />
				</Center>

				<Center position="relative">
					<IconButton
						size="xs"
						colorScheme="red"
						icon={<GiCancel />}
						aria-label="Cancel project"
						onClick={() => developmentManager.destroy(name)}
					/>
					<Progress
						flexGrow={1}
						max={total}
						value={progress}
						colorScheme="green"
						backgroundColor="red.700"
					/>
					<IconButton
						size="xs"
						colorScheme="green"
						icon={<GiLightningStorm />}
						aria-label="Force project"
						onClick={() => developmentManager.forceProject(name)}
					/>

					<Text
						as="span"
						fontSize="sm"
						position="absolute"
						right={0}
						bottom="100%"
					>
						{progress}/{total}
					</Text>
				</Center>
			</Box>
		);
	}
);

export const DevelopmentProjects = observer((props: FlexProps): JSX.Element => {
	const { projects } = useDevelopmentManager();

	return (
		<Flex direction="column" {...props}>
			{[...projects.entries()].map(([name, project]) => (
				<DevelopmentProject key={name} project={project} />
			))}
		</Flex>
	);
});
