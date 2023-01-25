import DeleteChatModal from 'components/shared/DeleteChatModal/DeleteChatModal';
import style from 'components/chats/Chats/Chats.module.scss';
import { ITimeStamp } from 'types';
import { dateToString } from 'utils/dateToString';

interface ChatsItemProps {
	id: string;
	name: string;
	message: string;
	photo: string;
	time: ITimeStamp;
	handleSelect: () => void;
}

const ChatsItem = ({
	id,
	name,
	message,
	time,
	photo,
	handleSelect,
}: ChatsItemProps) => {
	return (
		<li className={style.item} onClick={handleSelect}>
			<div className={style.avatar}>
				<img
					className='image'
					src={
						photo ||
						'https://i.pinimg.com/564x/50/1c/63/501c63d4c6f5aad478c4a5a8347437d4.jpg'
					}
					alt={`${name} avatar`}
				/>
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
