import React from "react";

import { UserProfile } from "../../modules/user-profile";

export const MainMenu = (): JSX.Element => {
	return (
		<div>
			<h1>Knights of honor</h1>

			<nav>
				<ul>
					<li>new game</li>
					<li>exit</li>
				</ul>
			</nav>

			<UserProfile />
		</div>
	);
};
