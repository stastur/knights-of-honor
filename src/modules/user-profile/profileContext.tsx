import React, { createContext, useCallback, useContext, useState } from "react";

import { identity, negate } from "@app/utils";

const USER_PROFILE_STORAGE_KEY = "koh_user_profile";
const defaultProfile: UserProfile = { name: "", title: "knight", avatar: "" };

interface UserProfile {
	name: string;
	title: string;
	avatar: string;
}

interface ProfileEntity<T = string> {
	set: (v: string) => void;
	value: T;
}

interface ProfileContext {
	name: ProfileEntity;
	title: ProfileEntity;
	avatar: ProfileEntity;

	editMode: {
		isActive: boolean;
		saveChanges: () => void;
		discardChanges: () => void;
		toggle: () => void;
	};
}

const ProfileContext = createContext<ProfileContext>(
	null as unknown as ProfileContext
);

export const ProfileProvider = ({
	children,
}: {
	children?: React.ReactNode;
}): JSX.Element => {
	const serializedUserProfile = localStorage.getItem(USER_PROFILE_STORAGE_KEY);

	const userProfile: UserProfile = serializedUserProfile
		? JSON.parse(serializedUserProfile)
		: defaultProfile;

	const [name, setName] = useState(userProfile.name);
	const [title, setTitle] = useState(userProfile.title);
	const [avatar, setAvatar] = useState(userProfile.avatar);

	const [editMode, setEditMode] = useState(false);

	const saveChanges = useCallback(() => {
		const profile: UserProfile = {
			name,
			title,
			avatar,
		};

		const serializedProfile = JSON.stringify(profile);

		localStorage.setItem(USER_PROFILE_STORAGE_KEY, serializedProfile);

		toggleEditMode();
	}, [name, title, avatar]);

	const discardChanges = useCallback(() => {
		setName(userProfile.name);
		setTitle(userProfile.title);
		setAvatar(userProfile.avatar);

		toggleEditMode();
	}, []);

	const toggleEditMode = useCallback(() => setEditMode(negate(identity)), []);

	const context = {
		name: { value: name, set: setName },
		title: { value: title, set: setTitle },
		avatar: { value: avatar, set: setAvatar },

		editMode: {
			saveChanges,
			discardChanges,
			toggle: toggleEditMode,
			isActive: editMode,
		},
	};

	return (
		<ProfileContext.Provider value={context}>
			{children}
		</ProfileContext.Provider>
	);
};

export const useProfileContext = (): ProfileContext =>
	useContext(ProfileContext);
