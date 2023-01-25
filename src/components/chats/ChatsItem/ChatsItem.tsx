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
