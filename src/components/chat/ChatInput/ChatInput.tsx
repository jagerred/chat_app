import { useState, useContext } from 'react';
import ImgInput from 'components/shared/ImgInput/ImgInput';
import { ChatContext } from 'context/ChatContext';
import { AuthContext } from 'context/AuthContext';
import {
	arrayUnion,
	doc,
	serverTimestamp,
	Timestamp,
	updateDoc,
} from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { db, storage } from 'firebaseConf';
import { v4 } from 'uuid';
import { BiSend } from 'react-icons/bi';
import style from 'components/chat/Chat/Chat.module.scss';

const ChatInput = () => {
	const [text, setText] = useState('');
	const [img, setImg] = useState<File | null>(null);
	const { data } = useContext(ChatContext);
	const { currentUser } = useContext(AuthContext);

	const handleSubmit = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Enter') handleSend();
	};
	const handleSend = async () => {
		if (currentUser) {
			if (img) {
				const storageRef = ref(storage, v4());
				uploadBytesResumable(storageRef, img).then(() => {
					getDownloadURL(storageRef).then(async downloadURL => {
						await updateDoc(doc(db, 'chats', data.chatId), {
							messages: arrayUnion({
								id: v4(),
								text,
								senderId: currentUser.uid,
								date: Timestamp.now(),
								img: downloadURL,
							}),
						});
						setText('');
					});
				});
			} else if (text !== '') {
				await updateDoc(doc(db, 'chats', data.chatId), {
					messages: arrayUnion({
						id: v4(),
						text,
						senderId: currentUser.uid,
						date: Timestamp.now(),
					}),
				});

				await updateDoc(doc(db, 'userChats', currentUser.uid), {
					[data.chatId + '.lastMessage']: {
						text,
					},
					[data.chatId + '.date']: serverTimestamp(),
				});

				await updateDoc(doc(db, 'userChats', data.user.uid), {
					[data.chatId + '.lastMessage']: {
						text,
					},
					[data.chatId + '.date']: serverTimestamp(),
				});
				setText('');
			}
			setImg(null);
		}
	};

	return (
		<div className={style.inputContainer}>
			<input
				className={style.input}
				type='text'
				placeholder='Type something...'
				value={text}
				onChange={e => setText(e.target.value)}
				onKeyDown={handleSubmit}
			/>
			<ImgInput img={img} setImg={setImg} />
			<div className={style.buttons}>
				<button className={`${style.send} button`} onClick={handleSend}>
					<BiSend size={26} />
				</button>
			</div>
		</div>
	);
};

export default ChatInput;
