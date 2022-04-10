import React, { MouseEvent, useCallback, useState } from "react";
import { Box, BoxProps, Flex, IconButton } from "@chakra-ui/react";
import { GiArmorUpgrade, GiCancel } from "react-icons/gi";

import { Building } from "@app/core/entities";
import { useDevelopmentManager } from "@app/contexts";

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
	const developmentManager = useDevelopmentManager();
	const { name, next } = building;

	const isUpgradeEnabled = next && developmentManager.canBuild(next) !== "no";

	return (
		<Box key={name} position="relative" role="group" {...boxProps}>
			{children}

			<Flex
				position="absolute"
				left={0}
				bottom={0}
				right={0}
				justifyContent="space-between"
			>
				<IconButton
					size="xs"
					aria-label="upgrade"
					visibility={next ? "visible" : "hidden"}
					isDisabled={!isUpgradeEnabled}
					colorScheme="green"
					icon={<GiArmorUpgrade />}
					onClick={() => next && developmentManager.build(next)}
				/>

				<IconButton
					size="xs"
					name={name}
					aria-label={`Remove ${name}`}
					visibility="hidden"
					colorScheme="red"
					icon={<GiCancel />}
					onClick={() => developmentManager.destroy(name)}
					onMouseEnter={onMouseEnter}
					onMouseLeave={onMouseLeave}
					_groupHover={{ visibility: "visible" }}
				/>
			</Flex>
		</Box>
	);
};
