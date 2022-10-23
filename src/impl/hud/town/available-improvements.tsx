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
import { observer } from "mobx-react-lite";
import React, { PropsWithChildren } from "react";
import { useTranslation } from "react-i18next";

import { groupBy } from "@app/utils/collections";

import { mainBuildingsList } from "../../buildings";

import { BuildingCell } from "./building-cell";
import { useProvinceContext } from "./town-context";

const groups = groupBy(mainBuildingsList, "type");

export const AvailableImprovementsMenu = observer(
	({
		isOpen,
		onClose,
		children,
		...restProps
	}: PropsWithChildren<PopoverProps>): JSX.Element => {
		const { t } = useTranslation();
		const province = useProvinceContext();

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
											const building = province.getRelevantVariant(name);

											if (!building) {
												return <div key={name} />;
											}

											return (
												<BuildingCell
													key={building.name}
													building={building}
													constructable={
														province.isConstructionPossible(building.name)
															? "no"
															: province.isConstructionAvailable(building.name)
															? "yes"
															: "not-yet"
													}
													onClick={() => province.build(building.name)}
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
	}
);
