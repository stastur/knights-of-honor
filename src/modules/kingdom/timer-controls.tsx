import React from "react";
import { observer } from "mobx-react-lite";
import { HStack, IconButton } from "@chakra-ui/react";

import { GiPauseButton, GiPlayButton } from "react-icons/gi";

import { useTimer } from "@app/contexts";

export const TimerControls = observer((): JSX.Element => {
	const timer = useTimer();

	return (
		<HStack>
			<IconButton
				size="xs"
				aria-label="Pause"
				icon={<GiPauseButton />}
				onClick={timer.pause}
			/>
			<IconButton
				size="xs"
				aria-label="Play"
				icon={<GiPlayButton />}
				onClick={timer.start}
			/>
		</HStack>
	);
});
