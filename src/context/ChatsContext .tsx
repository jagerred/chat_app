import { doc, onSnapshot } from 'firebase/firestore';
import { AuthContext } from 'context/AuthContext';
import { db } from 'firebaseConf';
import { createContext, useState, useEffect, useContext } from 'react';
import { ITimeStamp, IChatUserInfo, ContextProviderProps } from 'types';

interface IChatInfo {
	date: ITimeStamp;
	lastMessage: {
		text?: string;
	};
	userInfo: IChatUserInfo;
}
type ContextType = {
	chats: IChat[];
	isLoading: boolean;
};
type IChat = [string, IChatInfo];

export const ChatsContext = createContext<ContextType>({
	chats: [] as IChat[],
	isLoading: false,
});

export const ChatsContextProvider = ({ children }: ContextProviderProps) => {
	const [chats, setChats] = useState<IChat[]>([]);
	const [isLoading, setIsLoading] = useState(false);
	const { currentUser } = useContext(AuthContext);

	useEffect(() => {
		const getChats = () => {
			setIsLoading(true);
			const unsub = onSnapshot(doc(db, 'userChats', currentUser!.uid), doc => {
				setChats(Object.entries(doc.data() as { string: IChatInfo }));
				setIsLoading(false);
			});
			return () => unsub();
		};
		if (currentUser?.uid) getChats();
	}, [currentUser?.uid]);

	useEffect(() => {
		if (currentUser === null) setChats([]);
	}, [currentUser]);

	return (
		<ChatsContext.Provider value={{ chats, isLoading }}>
			{children}
		</ChatsContext.Provider>
	);
};
