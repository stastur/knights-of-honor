import React, { Fragment, ReactElement } from "react";

interface TimesProps {
	n: number;
	children: ((index: number) => ReactElement) | ReactElement;
}

export const Times = ({ n, children }: TimesProps): JSX.Element => {
	return (
		<Fragment>
			{Array.from({ length: n }, (_, i) => (
				<Fragment key={i}>
					{typeof children === "function" ? children(i) : children}
				</Fragment>
			))}
		</Fragment>
	);
};
