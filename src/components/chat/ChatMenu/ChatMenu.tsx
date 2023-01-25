import { useContext } from 'react';
import DeleteChatModal from 'components/shared/DeleteChatModal/DeleteChatModal';
import { ChatContext } from 'context/ChatContext';
import { Dropdown, MenuProps } from 'antd';
import { FiMoreVertical } from 'react-icons/fi';
import style from 'components/chat/Chat/Chat.module.scss';

const ChatMenu = () => {
	const { data } = useContext(ChatContext);

	const items: MenuProps['items'] = [
		{
			label: (
				<DeleteChatModal
					id={data.chatId}
					buttonContent={'Clear history'}
					type={'history'}
				/>
			),
			key: 0,
		},
		{
			label: (
				<DeleteChatModal
					id={data.chatId}
					buttonContent={'Delete Chat'}
					type={'chat'}
				/>
			),
			key: 1,
		},
	];

	return (
		<Dropdown menu={{ items }} trigger={['click']} placement='bottomRight'>
			<button className={`${style.moreButton} button`}>
				<FiMoreVertical size={20} />
			</button>
		</Dropdown>
	);
};

export default ChatMenu;
