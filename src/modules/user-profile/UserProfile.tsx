import React from "react";
import { GiCancel, GiCycle, GiQuillInk, GiTick } from "react-icons/gi";

import { SideSelect } from "@app/components/side-select";

import { ProfileProvider, useProfileContext } from "./profileContext";

const titles = ["knight", "duke", "emperor", "marshal", "czar", "king"];

const Controls = (): JSX.Element => {
	const profile = useProfileContext();

	return (
		<div>
			{profile.editMode.isActive ? (
				<button onClick={profile.editMode.saveChanges}>
					<GiTick />
				</button>
			) : (
				<button onClick={profile.editMode.toggle}>
					<GiQuillInk />
				</button>
			)}

			{profile.editMode.isActive ? (
				<button onClick={profile.editMode.discardChanges}>
					<GiCancel />
				</button>
			) : (
				<button>
					<GiCycle />
				</button>
			)}
		</div>
	);
};

const ProfileView = (): JSX.Element => {
	const profile = useProfileContext();

	return (
		<div>
			<div id="avatar" />

			<div>
				<p>{profile.title.value}</p>
				<p>{profile.name.value}</p>
			</div>
		</div>
	);
};

const ProfileEditView = (): JSX.Element => {
	const profile = useProfileContext();

	return (
		<div>
			<SideSelect
				value={profile.title.value}
				options={titles}
				onChange={profile.title.set}
			/>
			<input
				name="name"
				value={profile.name.value}
				onChange={(e) => profile.name.set(e.target.value)}
			/>
		</div>
	);
};

const UserProfile = (): JSX.Element => {
	const profile = useProfileContext();

	return (
		<div>
			{profile.editMode.isActive ? <ProfileEditView /> : <ProfileView />}
			<Controls />
		</div>
	);
};

export const Profile = (): JSX.Element => {
	return (
		<ProfileProvider>
			<UserProfile />
		</ProfileProvider>
	);
};
