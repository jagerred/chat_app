import { createContext, useContext, useReducer, useState } from 'react';
import { ContextProviderProps, IChatUserInfo } from 'types';
import { AuthContext } from './AuthContext';

interface IChatState {
	chatId: string;
	user: IChatUserInfo;
}
interface IChatAction {
	type: string;
	payload?: IChatUserInfo;
}
interface IChatContextValue {
	data: IChatState;
	dispatch: React.Dispatch<IChatAction>;
	isMobileChatHidden: boolean;
	setIsMobileChatHidden: React.Dispatch<React.SetStateAction<boolean>>;
}

const INITIAL_STATE: IChatState = {
	chatId: '',
	user: { uid: '', displayName: '', photoURL: '' },
};

export const ChatContext = createContext<IChatContextValue>({
	data: INITIAL_STATE,
	dispatch: () => {},
	isMobileChatHidden: false,
	setIsMobileChatHidden: () => {},
});

export const ChatContextProvider = ({ children }: ContextProviderProps) => {
	const { currentUser } = useContext(AuthContext);
	const [isMobileChatHidden, setIsMobileChatHidden] = useState(true);

	const chatReducer = (state: IChatState, action: IChatAction) => {
		switch (action.type) {
			case 'CHANGE_USER':
				return {
					user: action.payload!,
					chatId:
						action.payload && currentUser!.uid > action.payload.uid
							? currentUser!.uid + action.payload.uid
							: action.payload!.uid + currentUser!.uid,
				};
			case 'CLOSE_CHAT':
				return { user: INITIAL_STATE.user, chatId: '' };
			default:
				return state;
		}
	};

	const [state, dispatch] = useReducer(chatReducer, INITIAL_STATE);

	return (
		<ChatContext.Provider
			value={{
				data: state,
				dispatch,
				isMobileChatHidden,
				setIsMobileChatHidden,
			}}
		>
			{children}
		</ChatContext.Provider>
	);
};
