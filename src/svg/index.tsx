import React, { forwardRef, memo, ReactNode } from "react";

import { Point } from "../legacy/generation/hexagonalMap";

const createSVGPath = (points: Point[]) => {
	return (
		points
			.map(({ x, y }, index) => {
				let path = "L " + [x, y].join();

				if (index === 0) {
					path = path.replace("L", "M");
				}

				return path;
			})
			.join("\n") + " Z"
	);
};

interface PathProps {
	points: Point[];
}

const Path = ({ points }: PathProps) => {
	const d = createSVGPath(points);

	return <path d={d} />;
};

interface GroupProps extends React.SVGProps<SVGGElement> {
	children: ReactNode;
}

const Group = memo(({ children, ...svgProps }: GroupProps) => {
	return <g {...svgProps}>{children}</g>;
});

interface SvgProps extends Omit<React.SVGProps<SVGSVGElement>, "viewBox"> {
	children: ReactNode;
}

const Svg = forwardRef<SVGSVGElement, SvgProps>(
	({ children, width, height, ...svgProps }, ref) => {
		return (
			<svg
				ref={ref}
				width={width}
				height={height}
				viewBox={`0 0 ${width} ${height}`}
				{...svgProps}
			>
				{children}
			</svg>
		);
	}
);

export { Svg, Group, Path };
