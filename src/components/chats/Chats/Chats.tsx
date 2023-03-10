import { useContext, useState } from 'react';
import ChatsItem from 'components/chats/ChatsItem/ChatsItem';
import BurgerMenu from 'components/chats/BurgerMenu/BurgerMenu';
import { ChatContext } from 'context/ChatContext';
import { ChatsContext } from 'context/ChatsContext ';
import { v4 } from 'uuid';
import style from './Chats.module.scss';
import { Input } from 'antd';
import { RiSearchLine } from 'react-icons/ri';
import { GiHamburgerMenu } from 'react-icons/gi';
import { IChatUserInfo } from 'types';
import ChatsItemSkeleton from '../ChatsItemSkeleton/ChatsItemSkeleton';

const Chats = () => {
	const [inputValue, setInputValue] = useState('');
	const [isHidden, setIsHidden] = useState(true);
	const { chats, isLoading } = useContext(ChatsContext);
	const { dispatch, isMobileChatHidden, setIsMobileChatHidden } =
		useContext(ChatContext);

	const handleSelect = (user: IChatUserInfo) => {
		dispatch({ type: 'CHANGE_USER', payload: user });
		setIsMobileChatHidden(false);
	};

	const renderSkeletons = () => {
		const skeletonsArr = [];
		for (let i = 0; i < 3; i++) {
			skeletonsArr.push(<ChatsItemSkeleton key={v4()} />);
		}
		return skeletonsArr;
	};

	const renderChats = () => {
		if (!chats || chats.length === 0) return <span>There is no chats</span>;
		return chats
			.filter(i =>
				i[1].userInfo.displayName
					.toLowerCase()
					.includes(inputValue.toLowerCase())
			)
			?.sort((a, b) => Number(b[1].date) - Number(a[1].date))
			.map(i => {
				const { displayName, uid } = i[1].userInfo;
				const { lastMessage, date } = i[1];
				return (
					<ChatsItem
						key={i[0]}
						id={i[0]}
						uid={uid}
						name={displayName}
						message={lastMessage?.text || ''}
						time={date}
						handleSelect={() => handleSelect(i[1].userInfo)}
					/>
				);
			});
	};

	const hiddenClass = isMobileChatHidden ? '' : style.mobileHidden;

	return (
		<section className={`${style.container} ${hiddenClass}`}>
			<div className={style.title}>
				<button
					className={`${style.burgerButton} button`}
					onClick={() => setIsHidden(!isHidden)}
				>
					<GiHamburgerMenu size={18} />
				</button>
				{isHidden ? null : <BurgerMenu />}
				{'  Chats'}
			</div>
			<Input
				className={style.input}
				size='large'
				placeholder='Find chat...'
				prefix={<RiSearchLine />}
				value={inputValue}
				onChange={e => setInputValue(e.target.value)}
			/>
			<ul className={`${style.list} list`}>
				{isLoading ? renderSkeletons() : renderChats()}
			</ul>
		</section>
	);
};

export default Chats;
