import { useContext, useState, useEffect } from 'react';
import style from 'components/chats/Chats/Chats.module.scss';
import AddUserItem from 'components/addUser/AddUserItem/AddUserItem';
import { ChatsContext } from 'context/ChatsContext ';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from 'firebaseConf';
import { CircularProgress } from '@mui/material';
import { Input } from 'antd';
import { Modal } from 'antd';
import { RiSearchLine } from 'react-icons/ri';
import { IModalProps, IUserInfo } from 'types';

const AddUser = ({ isOpen, setIsOpen }: IModalProps) => {
	const [searchInput, setSearchInput] = useState('');
	const [chatsUserIds, setChatsUserIds] = useState<string[]>([]);
	const [users, setUsers] = useState<IUserInfo[]>([]);
	const [isLoading, setIsLoading] = useState(false);
	const [searchError, setSearchError] = useState(false);
	const { chats } = useContext(ChatsContext);

	useEffect(() => {
		if (chats) {
			const idArr: string[] = chats.map(i => i[1].userInfo.uid);
			setChatsUserIds(idArr);
		}
	}, [chats.length]);

	const handleCancel = () => {
		setIsOpen(false);
		setUsers([]);
		setSearchInput('');
	};

	const handleSearch = async () => {
		const q = query(
			collection(db, 'users'),
			where('displayName', '==', searchInput)
		);
		const usersArray: IUserInfo[] = [];
		setUsers([]);
		setIsLoading(true);
		setSearchError(false);

		try {
			const querySnapshot = await getDocs(q);
			querySnapshot.forEach(doc => {
				usersArray.push(doc.data() as IUserInfo);
			});
			setIsLoading(false);
		} catch (error) {
			if (error instanceof Error) {
				setIsLoading(false);
				setSearchError(true);
			}
		}

		const filteredUsersArray = usersArray.filter(
			({ uid }) => !chatsUserIds.includes(uid)
		);
		if (filteredUsersArray.length !== 0) {
			setUsers(filteredUsersArray);
		}
	};

	const handleKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.code === 'Enter') handleSearch();
	};

	const renderUsers = () =>
		users.map(({ uid, displayName, photoURL }: IUserInfo) => (
			<AddUserItem
				key={`${uid + displayName}`}
				id={uid}
				name={displayName}
				photo={photoURL}
				handleCancel={handleCancel}
			/>
		));

	const searchMessage = searchError
		? 'Search error! Please, try again!'
		: 'User not found!';

	return (
		<Modal open={isOpen} onCancel={handleCancel} footer={[]}>
			<h2 className={style.title}>Find user</h2>
			<Input
				className={style.input}
				size='large'
				placeholder='Find user...'
				prefix={<RiSearchLine />}
				value={searchInput}
				onChange={e => {
					setSearchInput(e.target.value);
				}}
				onKeyDown={e => handleKey(e)}
			/>
			{isLoading ? (
				<CircularProgress color='inherit' size={18} />
			) : users.length !== 0 ? (
				<ul className={`${style.list} list`}>{renderUsers()}</ul>
			) : (
				<span>{searchMessage}</span>
			)}
		</Modal>
	);
};

export default AddUser;
