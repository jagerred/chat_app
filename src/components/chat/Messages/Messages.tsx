import { useContext, useEffect, useState } from 'react';
import Message from 'components/chat/Message/Message';
import style from 'components/chat/Messages/Messages.module.scss';
import { ChatContext } from 'context/ChatContext';
import { AuthContext } from 'context/AuthContext';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from 'firebaseConf';
import { CircularProgress } from '@mui/material';
import { dateToString } from 'utils/dateToString';
import { IMessage } from 'types';

const Messages = () => {
	const [messages, setMessages] = useState<IMessage[]>([]);
	const [isLoading, setIsLoading] = useState(false);
	const { data } = useContext(ChatContext);
	const { currentUser } = useContext(AuthContext);
	const { photoURL } = data.user;

	useEffect(() => {
		if (!data.chatId) return;
		setIsLoading(true);
		const unSub = onSnapshot(doc(db, 'chats', data.chatId), doc => {
			if (doc.exists()) {
				setMessages(doc.data().messages);
				setIsLoading(false);
			}
		});
		return () => {
			unSub();
		};
	}, [data.chatId]);

	const renderMessages = () => {
		if (messages.length === 0)
			return (
				<span className={style.noMessagesText}>There is no messages yet</span>
			);
		if (currentUser)
			return messages.map(({ id, text, img, senderId, date }) => {
				const isCurrent = senderId === currentUser.uid;
				const photo = isCurrent ? currentUser.photoURL : photoURL;
				const time = dateToString(date.seconds);

				return (
					<Message
						key={id}
						text={text}
						img={img}
						photo={photo}
						isCurrent={isCurrent}
						time={time}
					/>
				);
			});
	};

	return (
		<div className={style.messages}>
			{isLoading ? (
				<div className={style.loader}>
					<CircularProgress color='inherit' size={36} />
				</div>
			) : (
				renderMessages()
			)}
		</div>
	);
};

export default Messages;
