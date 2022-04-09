import React from "react";
import {
	Box,
	HStack,
	Popover,
	PopoverBody,
	PopoverContent,
	PopoverHeader,
	PopoverProps,
	PopoverTrigger,
	Stack,
} from "@chakra-ui/react";
import { observer } from "mobx-react-lite";

import { useDevelopmentManager } from "@app/contexts/development-context";
import { useProvince } from "@app/contexts/province-context";
import { Times } from "@app/components/times";

import { DevelopmentProject } from "../development-project";
import { FeatureCell } from "../feature-cell";

import { BuildingsPanel } from "./buildings-panel";

const MAX_FEATURES = 3;

export const TownDevelopmentMenu = observer(
	({ children, ...props }: PopoverProps): JSX.Element => {
		const province = useProvince();
		const developmentManager = useDevelopmentManager();
		return (
			<Popover {...props}>
				<PopoverTrigger>{children}</PopoverTrigger>

				<PopoverContent width="min-content">
					<PopoverHeader>Town improvements</PopoverHeader>
					<PopoverBody>
						<HStack justifyContent="space-around" paddingBottom={2}>
							{province.features.map((f) => (
								<FeatureCell key={f} name={f} />
							))}

							<Times n={MAX_FEATURES - province.features.length}>
								<Box
									width="3.625rem"
									height="3.625rem"
									backgroundColor="blackAlpha.200"
								/>
							</Times>
						</HStack>

						<BuildingsPanel />

						<Stack width="100%">
							{[...developmentManager.projects.entries()].map(
								([name, project]) => (
									<DevelopmentProject key={name} {...project} />
								)
							)}
						</Stack>
					</PopoverBody>
				</PopoverContent>
			</Popover>
		);
	}
);
