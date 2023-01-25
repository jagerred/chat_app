import { useRef, useEffect } from 'react';
import style from 'components/chat/Messages/Messages.module.scss';

interface IMessageProps {
	photo: string;
	text: string;
	img?: string;
	isCurrent: boolean;
	time: string;
}

const Message = ({ photo, text, img, isCurrent, time }: IMessageProps) => {
	const messageRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		messageRef.current?.scrollIntoView();
	}, [photo]);

	const positionClass = isCurrent ? style.messageContainerRight : '';
	const colorClass = isCurrent ? style.messageRight : style.messageLeft;

	return (
		<div
			ref={messageRef}
			className={`${style.messageContainer} ${positionClass}`}
		>
			<div className={style.ava}>
				<img className='image' src={photo} alt='avatar' />
			</div>
			<div className={`${style.message} ${colorClass}`}>
				<span className={style.text}>{text}</span>{' '}
				{img ? (
					<div className={style.img}>
						<img className='image image--message' src={img} alt='' />
					</div>
				) : null}
				<div className={style.time}>{time}</div>{' '}
			</div>
		</div>
	);
};

export default Message;
