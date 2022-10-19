import {
	Grid,
	Popover,
	PopoverContent,
	PopoverHeader,
	PopoverProps,
	PopoverTrigger,
	Tab,
	TabList,
	TabPanel,
	TabPanels,
	Tabs,
} from "@chakra-ui/react";
import React, { PropsWithChildren } from "react";
import { useTranslation } from "react-i18next";

import { Building } from "@app/impl/buildings/building";
import { groupBy } from "@app/utils/collections";

import { mainBuildings } from "../../buildings";

import { BuildingCell } from "./building-cell";

const groups = groupBy(mainBuildings, "type");

export const AvailableImprovementsMenu = ({
	isOpen,
	onClose,
	children,
	...restProps
}: PropsWithChildren<PopoverProps>): JSX.Element => {
	const { t } = useTranslation();

	return (
		<Popover
			isOpen={isOpen}
			onClose={onClose}
			closeOnBlur={false}
			{...restProps}
		>
			<PopoverTrigger>{children}</PopoverTrigger>

			<PopoverContent width="max-content">
				<PopoverHeader>{t("availableImprovements")}</PopoverHeader>
				<Tabs>
					<TabList>
						{Object.keys(groups).map((type) => (
							<Tab key={type}>{type}</Tab>
						))}
					</TabList>

					<TabPanels>
						{Object.values(groups).map((buildings, index) => (
							<TabPanel key={index}>
								<Grid
									templateColumns="repeat(5, 5rem)"
									templateRows="repeat(5, auto)"
									gap={2}
								>
									{buildings.map(({ name }) => {
										const building = Building.resolve(name);
										// developmentManager.getRelevantVariant(name);

										if (!building) {
											return <div key={name} />;
										}

										return (
											<BuildingCell
												key={building.name}
												building={building}
												// constructable={developmentManager.canBuild(
												// 	building.name
												// )}
												// onClick={() => {
												// 	developmentManager.build(building.name);
												// }}
											/>
										);
									})}
								</Grid>
							</TabPanel>
						))}
					</TabPanels>
				</Tabs>
			</PopoverContent>
		</Popover>
	);
};
