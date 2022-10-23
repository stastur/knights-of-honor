import {
	Popover,
	PopoverBody,
	PopoverContent,
	PopoverHeader,
	PopoverProps,
	PopoverTrigger,
} from "@chakra-ui/react";
import React, { PropsWithChildren } from "react";

import { BuildingsPanel } from "./buildings-panel";
import { Projects } from "./projects";

export const DevelopmentMenu = ({
	children,
	...props
}: PropsWithChildren<PopoverProps>): JSX.Element => {
	return (
		<Popover {...props}>
			<PopoverTrigger>{children}</PopoverTrigger>

			<PopoverContent width="min-content">
				<PopoverHeader>Town improvements</PopoverHeader>
				<PopoverBody display="flex" flexDirection="column" rowGap={2}>
					{/* <Features /> */}

					<BuildingsPanel />

					<Projects />
				</PopoverBody>
			</PopoverContent>
		</Popover>
	);
};
