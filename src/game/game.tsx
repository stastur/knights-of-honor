import React from "react";
import { Country, Province, Resources } from "./types";

const Brest: Province = {
	name: "Brest",

	resources: {
		[Resources.Gold]: { income: 4 },
		[Resources.Books]: { income: 4 },
		[Resources.Piety]: { income: 1 },
		[Resources.People]: { amount: 100, income: 10 },
		[Resources.Food]: { amount: 100, income: 1 },
		[Resources.Workers]: { amount: 3 },
	},

	buildings: [],

	advantages: [],
};

const NewBelarus: Country = {
	name: "New Belarus",

	generals: [],

	politics: {
		enemies: [],
		allies: [],
	},

	provinces: [],

	resources: {
		[Resources.Gold]: { amount: 1000, income: 0 },
		[Resources.Piety]: { amount: 0, income: 0 },
		[Resources.Books]: { amount: 0, income: 0 },
	},

	royalty: {
		king: { name: "Chad" },
		queen: null,

		children: [],
	},
};

const addProvince = (country: Country, province: Province) => {
	country.provinces.push(province);
};

const initializeResourceIncomes = (country: Country) => {
	country.provinces.forEach(({ resources }) => {
		country.resources.gold.income = resources.gold.income;
		country.resources.books.income = resources.books.income;
		country.resources.piety.income = resources.piety.income;
	});
};

const updateResourceAmounts = (country: Country) => {
	Object.values(country.resources).forEach(
		(resource) => (resource.amount += resource.income)
	);
};

addProvince(NewBelarus, Brest);
initializeResourceIncomes(NewBelarus);

setInterval(() => updateResourceAmounts(NewBelarus), 5000);

export const JsonView = (): JSX.Element => {
	const [, rerender] = React.useState(0);

	React.useEffect(() => {
		const id = setInterval(() => rerender((v) => v + 1), 5000);

		return () => {
			clearInterval(id);
		};
	});

	return (
		<code style={{ whiteSpace: "pre", fontSize: "0.75rem" }}>
			{JSON.stringify(NewBelarus, null, 2)}
		</code>
	);
};
