import { createContext, useState } from 'react';
import { User } from 'firebase/auth';
import { ContextProviderProps } from 'types';

interface ICurrentUser {
	uid: string;
	displayName: string;
	photoURL: string;
	email: string;
}
type IUserStateValue = ICurrentUser | null;

interface IProviderValue {
	currentUser: IUserStateValue;
	setCurrentUser: React.Dispatch<React.SetStateAction<IUserStateValue>>;
	changeCurrentUser: (user: User) => void;
}

export const AuthContext = createContext<IProviderValue>({} as IProviderValue);

export const AuthContextProvider = ({ children }: ContextProviderProps) => {
	const [currentUser, setCurrentUser] = useState<IUserStateValue>(null);

	const changeCurrentUser = (user: User) => {
		if (user) {
			const filteredUser = {
				uid: user.uid,
				displayName: user.displayName || '',
				photoURL: user.photoURL || '',
				email: user.email || '',
			};
			setCurrentUser(filteredUser);
		}
	};

	return (
		<AuthContext.Provider
			value={{ currentUser, setCurrentUser, changeCurrentUser }}
		>
			{children}
		</AuthContext.Provider>
	);
};
