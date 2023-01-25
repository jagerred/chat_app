import { Skeleton } from 'antd';
import style from 'components/chats/Chats/Chats.module.scss';

const ChatsItemSkeleton = () => {
	return (
		<li className={style.item}>
			<Skeleton.Avatar size='large' />
			<Skeleton title={false} paragraph={{ rows: 2, width: '50%' }} />
		</li>
	);
};

export default ChatsItemSkeleton;
