import React, { useContext } from 'react';
import style from 'components/chat/Chat/Chat.module.scss';
import { ChatContext } from 'context/ChatContext';
import { AuthContext } from 'context/AuthContext';
import { doc, updateDoc, deleteField, deleteDoc } from 'firebase/firestore';
import { db } from 'firebaseConf';
import { Modal } from 'antd';

interface IDeleteChatModalProps {
	id: string;
	buttonContent: string | JSX.Element;
	type: string;
}

const DeleteChatModal = ({
	id,
	buttonContent,
	type,
}: IDeleteChatModalProps) => {
	const { currentUser } = useContext(AuthContext);
	const { dispatch } = useContext(ChatContext);

	const isChat = type === 'chat' ? true : false;

	const deleteChat = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		e.stopPropagation();
		updateDoc(doc(db, 'userChats', currentUser!.uid), {
			[id]: deleteField(),
		});
		deleteDoc(doc(db, 'chats', id));
		dispatch({ type: 'CLOSE_CHAT' });
	};

	const deleteHistory = (
		e: React.MouseEvent<HTMLButtonElement, MouseEvent>
	) => {
		if (currentUser) {
			e.stopPropagation();
			updateDoc(doc(db, 'chats', id), {
				messages: [],
			});
			updateDoc(doc(db, 'userChats', currentUser.uid), {
				[id + '.lastMessage']: { text: '' },
			});
		}
	};

	const confirm = Modal.confirm;

	const showDeleteConfirm = (
		e: React.MouseEvent<HTMLButtonElement, MouseEvent>
	) => {
		confirm({
			title: `Are you sure ${
				isChat ? 'delete this chat' : 'clear chat history'
			}?`,
			content: '',
			okText: 'Yes',
			okType: 'danger',
			cancelText: 'No',
			onOk() {
				isChat ? deleteChat(e) : deleteHistory(e);
			},
			onCancel() {},
		});
	};

	const buttonStyle =
		buttonContent === '' ? style.deleteButton : style.menuButton;

	return (
		<button
			className={`${buttonStyle} button`}
			onClick={e => showDeleteConfirm(e)}
		>
			{buttonContent}
		</button>
	);
};

export default DeleteChatModal;
