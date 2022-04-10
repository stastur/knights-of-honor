import React from "react";
import {
	Popover,
	PopoverTrigger,
	PopoverContent,
	PopoverHeader,
	PopoverProps,
} from "@chakra-ui/react";
import { observer } from "mobx-react-lite";

import { useProvince } from "@app/contexts";

export const HappinessMenu = observer(
	({ children, ...restProps }: PopoverProps): JSX.Element => {
		const province = useProvince();

		return (
			<Popover {...restProps}>
				<PopoverTrigger>{children}</PopoverTrigger>

				<PopoverContent width="max-content">
					<PopoverHeader>Happiness in {province.name}</PopoverHeader>
				</PopoverContent>
			</Popover>
		);
	}
);
