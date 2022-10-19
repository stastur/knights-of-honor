import {
	Popover,
	PopoverBody,
	PopoverContent,
	PopoverHeader,
	PopoverProps,
	PopoverTrigger,
} from "@chakra-ui/react";
import React, { PropsWithChildren } from "react";

// import { DevelopmentProjects } from "../development-projects";
// import { Features } from "../features";

import { BuildingsPanel } from "./buildings-panel";

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

					{/* <DevelopmentProjects /> */}
				</PopoverBody>
			</PopoverContent>
		</Popover>
	);
};
