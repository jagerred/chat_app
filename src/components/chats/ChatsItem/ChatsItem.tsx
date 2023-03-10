import DeleteChatModal from 'components/shared/DeleteChatModal/DeleteChatModal';
import style from 'components/chats/Chats/Chats.module.scss';
import { ITimeStamp, IUserInfo } from 'types';
import { dateToString } from 'utils/dateToString';
import { useEffect, useState, useContext } from 'react';

import { doc, onSnapshot } from 'firebase/firestore';
import { db } from 'firebaseConf';
import { AuthContext } from 'context/AuthContext';

interface ChatsItemProps {
	id: string;
	name: string;
	message: string;
	time: ITimeStamp;
	uid: string;
	handleSelect: () => void;
}

const ChatsItem = ({
	id,
	uid,
	name,
	message,
	time,
	handleSelect,
}: ChatsItemProps) => {
	const [photo, setPhoto] = useState('');
	useEffect(() => {
		const unsub = onSnapshot(doc(db, 'users', uid), doc => {
			const newUserData = doc.data() as IUserInfo;
			setPhoto(newUserData.photoURL);
		});

		return () => {
			unsub();
		};
	}, []);

	return (
		<li className={style.item} onClick={handleSelect}>
			<div className={style.avatar}>
				{photo === '' ? null : (
					<img className='image' src={photo} alt={`${name} avatar`} />
				)}
			</div>
			<div className={style.text}>
				<span className={style.name}>{name || 'Name'}</span>
				{message ? (
					<span className={style.message}>
						{message.length >= 10 ? `${message.slice(0, 10)}...` : message}{' '}
					</span>
				) : null}
			</div>

			{time ? (
				<span className={style.time}>{dateToString(time.seconds)}</span>
			) : null}
			<DeleteChatModal id={id} buttonContent={''} type={'chat'} />
		</li>
	);
};

export default ChatsItem;
