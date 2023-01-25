import { useContext } from 'react';
import Messages from 'components/chat/Messages/Messages';
import ChatInput from 'components/chat/ChatInput/ChatInput';
import ChatMenu from 'components/chat/ChatMenu/ChatMenu';
import { ChatContext } from 'context/ChatContext';
import { BiArrowBack } from 'react-icons/bi';
import style from 'components/chat/Chat/Chat.module.scss';

const Chat = () => {
	const { data, isMobileChatHidden, setIsMobileChatHidden } =
		useContext(ChatContext);
	const { displayName, photoURL } = data.user;
	const hiddenClass = isMobileChatHidden ? style.mobileHidden : '';

	return (
		<section className={`${style.container} ${hiddenClass}`}>
			{displayName && !hiddenClass ? (
				<>
					<div className={style.header}>
						<button
							className={`button ${style.backButton}`}
							onClick={() => setIsMobileChatHidden(true)}
						>
							<BiArrowBack size={18} />
						</button>
						<div className={style.avatar}>
							<img className='image' src={photoURL} alt='' />
						</div>
						<span className={style.name}>{displayName}</span>
						<ChatMenu />
					</div>
					<Messages />
					<ChatInput />
				</>
			) : (
				<span className={`${style.select} ${hiddenClass}`}>
					Select chat to start messaging
				</span>
			)}
		</section>
	);
};

export default Chat;
