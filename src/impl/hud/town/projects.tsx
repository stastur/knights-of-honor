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
import React from "react";
import { GiCancel, GiLightningStorm } from "react-icons/gi";

import { resolve } from "@app/impl/buildings";
import { Building } from "@app/impl/buildings/building";

import { BuildingCell } from "./building-cell";
import { useProvinceContext } from "./town-context";

interface DevelopmentProjectProps {
	project: {
		name: Building["name"];
		total: Building["workers"];
		progress: number;
	};
}

const Project = observer(
	({
		project,
		...boxProps
	}: DevelopmentProjectProps & BoxProps): JSX.Element => {
		const { name, progress, total } = project;
		const building = resolve(name);
		const province = useProvinceContext();

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
						onClick={() => province.destroy(name)}
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
						onClick={() => province.forceProject(name)}
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

export const Projects = observer((props: FlexProps): JSX.Element => {
	const { improvements } = useProvinceContext();

	return (
		<Flex direction="column" {...props}>
			{[...improvements.inProgress.entries()].map(([name, progress]) => (
				<Project
					key={name}
					project={{ name, progress, total: resolve(name).workers }}
				/>
			))}
		</Flex>
	);
});
