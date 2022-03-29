import React, { ChangeEvent, Fragment } from "react";
import s from "./sideSelect.module.css";

interface Props {
	onChange: (value: string) => void;
	options: string[];
	value: string;
}

export const SideSelect = ({
	onChange,
	options,
	value,
}: Props): JSX.Element => {
	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		onChange(e.target.value);
	};

	const activeIndex = options.indexOf(value);

	const handleNext = () => {
		const nextIndex = (activeIndex + 1) % options.length;
		onChange(options[nextIndex]);
	};

	const handlePrevious = () => {
		const prevIndex = (activeIndex - 1 + options.length) % options.length;
		onChange(options[prevIndex]);
	};

	return (
		<fieldset className={s.group}>
			<button onClick={handlePrevious}>&lt;</button>

			{options.map((option) => (
				<Fragment key={option}>
					<input
						type="radio"
						id={option}
						key={option}
						value={option}
						checked={option === value}
						onChange={handleChange}
					/>
					<label htmlFor={option}>{option}</label>
				</Fragment>
			))}

			<button onClick={handleNext}>&gt;</button>
		</fieldset>
	);
};
