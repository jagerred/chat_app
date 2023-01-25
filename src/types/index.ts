export interface IChatUserInfo {
	displayName: string;
	photoURL: string;
	uid: string;
}
export interface IUserInfo extends IChatUserInfo {
	email: string;
}

export interface ITimeStamp {
	nanoseconds: number;
	seconds: number;
}
export interface ContextProviderProps {
	children: JSX.Element | JSX.Element[];
}
export interface IMessage {
	date: ITimeStamp;
	id: string;
	senderId: string;
	text: string;
	img?: string;
}

export interface IModalProps {
	isOpen: boolean;
	setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
