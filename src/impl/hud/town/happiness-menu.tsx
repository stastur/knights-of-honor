import {
	Popover,
	PopoverTrigger,
	PopoverContent,
	PopoverHeader,
	PopoverProps,
} from "@chakra-ui/react";
import { observer } from "mobx-react-lite";
import React, { PropsWithChildren } from "react";

export const HappinessMenu = observer(
	({
		children,
		...restProps
	}: PropsWithChildren<PopoverProps>): JSX.Element => {
		return (
			<Popover {...restProps}>
				<PopoverTrigger>{children}</PopoverTrigger>

				<PopoverContent width="max-content">
					<PopoverHeader>Happiness in province</PopoverHeader>
				</PopoverContent>
			</Popover>
		);
	}
);
