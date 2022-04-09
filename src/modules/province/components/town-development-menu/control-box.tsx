import React, { MouseEvent, useCallback, useState } from "react";
import { Box, BoxProps, CloseButton, IconButton } from "@chakra-ui/react";
import { GiArmorUpgrade } from "react-icons/gi";

import { Building } from "@app/core/entities/building";
import { useDevelopmentManager } from "@app/contexts/development-context";

interface UseControlBoxReturn {
	itemsToBeRemoved: Array<Building["name"]>;

	onMouseEnter: (event: MouseEvent<HTMLButtonElement>) => void;
	onMouseLeave: () => void;
}

export const useControlBox = (): UseControlBoxReturn => {
	const developmentManager = useDevelopmentManager();
	const [toBeRemoved, setToBeRemoved] = useState<Building["name"][]>([]);

	const onMouseEnter = useCallback(
		(event: MouseEvent<HTMLButtonElement>) => {
			const name = event.currentTarget.name as Building["name"];

			setToBeRemoved([
				name,
				...developmentManager.getDependents(
					event.currentTarget.name as Building["name"]
				),
			]);
		},
		[developmentManager]
	);

	const onMouseLeave = useCallback(() => setToBeRemoved([]), []);

	return {
		itemsToBeRemoved: toBeRemoved,
		onMouseEnter,
		onMouseLeave,
	};
};

interface ControlBoxProps
	extends Pick<
		ReturnType<typeof useControlBox>,
		"onMouseEnter" | "onMouseLeave"
	> {
	building: Building;
}

export const ControlBox = ({
	building,
	onMouseEnter,
	onMouseLeave,
	children,
	...boxProps
}: ControlBoxProps &
	Omit<BoxProps, "onMouseEnter" | "onMouseLeave">): JSX.Element => {
	const { name, next } = building;
	const developmentManager = useDevelopmentManager();

	const handleRemoveButtonClick = (event: MouseEvent<HTMLButtonElement>) =>
		developmentManager.destroy(event.currentTarget.name as Building["name"]);

	return (
		<Box key={name} position="relative" role="group" {...boxProps}>
			{children}

			<IconButton
				visibility={next ? "visible" : "hidden"}
				color="gold"
				aria-label="upgrade"
				variant="ghost"
				icon={<GiArmorUpgrade />}
				position="absolute"
				left="0"
				bottom="0"
				onClick={() => next && developmentManager.build(next)}
			/>

			<CloseButton
				_groupHover={{ visibility: "visible" }}
				name={name}
				visibility="hidden"
				size="sm"
				borderRadius="full"
				color="gold"
				border="1px solid gold"
				backgroundColor="red.700"
				position="absolute"
				right="0"
				bottom="0"
				onClick={handleRemoveButtonClick}
				onMouseEnter={onMouseEnter}
				onMouseLeave={onMouseLeave}
			/>
		</Box>
	);
};
