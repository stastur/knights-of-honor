import React, { PropsWithChildren, useEffect } from "react";
import { action, autorun, makeObservable, observable } from "mobx";

import { createContext } from "@app/utils";

class Timer {
	ticks = 0;

	private intervalId: number | null = null;

	constructor(private interval: number) {
		makeObservable(this, {
			ticks: observable,
			tick: action,
			stop: action,
		});
	}

	clearInterval = (): void => {
		if (this.intervalId) {
			window.clearInterval(this.intervalId);
			this.intervalId = null;
		}
	};

	start = (): void => {
		if (!this.intervalId) {
			this.intervalId = window.setInterval(this.tick, this.interval);
		}
	};

	pause = (): void => {
		this.clearInterval();
	};

	stop = (): void => {
		this.ticks = 0;
		this.clearInterval();
	};

	tick = (): void => {
		this.ticks++;
	};
}

const [TimerContextProvider, useTimer] = createContext<Timer>();

interface TimerProviderProps {
	interval?: number;
}

export const TimerProvider = ({
	children,
	interval = 1000,
}: PropsWithChildren<TimerProviderProps>): JSX.Element => {
	const timer = new Timer(interval);

	useEffect(() => {
		timer.start();

		return () => timer.stop();
	});

	return <TimerContextProvider value={timer}>{children}</TimerContextProvider>;
};

export const useTimerEffect = (callback: () => void): void => {
	const timer = useTimer();

	useEffect(() => {
		return autorun(() => {
			timer.ticks;
			callback();
		});
	}, []);
};

export { useTimer };
