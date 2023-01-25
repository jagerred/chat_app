import { useContext, useState } from 'react';
import style from 'components/chats/Chats/Chats.module.scss';
import { AuthContext } from 'context/AuthContext';
import {
	setDoc,
	doc,
	updateDoc,
	serverTimestamp,
	getDoc,
} from 'firebase/firestore';
import { db } from 'firebaseConf';
import { HiPlus } from 'react-icons/hi';
import { MdError } from 'react-icons/md';
import { CircularProgress } from '@mui/material';

interface AddUserItemProps {
	id: string;
	name: string;
	photo: string;
	handleCancel: () => void;
}

const AddUserItem = ({ id, name, photo, handleCancel }: AddUserItemProps) => {
	const [isLoading, setIsLoading] = useState(false);
	const [addingError, setAddingError] = useState(false);
	const { currentUser } = useContext(AuthContext);

	const addUserChat = async (
		id: string,
		displayName: string,
		photoURL: string
	) => {
		setAddingError(false);
		if (currentUser) {
			const combinedId =
				currentUser.uid > id ? currentUser.uid + id : id + currentUser.uid;
			try {
				setIsLoading(true);
				const res = await getDoc(doc(db, 'chats', combinedId));
				if (!res.exists()) {
					await setDoc(doc(db, 'chats', combinedId), { messages: [] });
					await updateDoc(doc(db, 'userChats', currentUser.uid), {
						[combinedId + '.userInfo']: {
							uid: id,
							displayName: displayName,
							photoURL: photoURL,
						},
						[combinedId + '.date']: serverTimestamp(),
					});

					await updateDoc(doc(db, 'userChats', id), {
						[combinedId + '.userInfo']: {
							uid: currentUser.uid,
							displayName: currentUser.displayName,
							photoURL: currentUser.photoURL,
						},
						[combinedId + '.date']: serverTimestamp(),
					});
					setIsLoading(false);
					handleCancel();
				}
			} catch (err) {
				if (err instanceof Error) setAddingError(true);
			}
		}
	};

	const buttonIcon = isLoading ? (
		<CircularProgress color='inherit' size={18} />
	) : addingError ? (
		<MdError size={18} />
	) : (
		<HiPlus size={18} />
	);

	return (
		<>
			{addingError ? (
				<span className={style.errorMessage}>
					Error while adding user, please try again
				</span>
			) : null}
			<li className={style.item}>
				<div className={style.avatar}>
					<img
						className='image'
						src={
							photo ||
							'https://i.pinimg.com/564x/50/1c/63/501c63d4c6f5aad478c4a5a8347437d4.jpg'
						}
						alt=''
					/>
				</div>
				<div className={style.text}>
					<span className={style.name}>{name || 'Name'}</span>
				</div>
				<button
					className={`button ${style.addButton}`}
					onClick={() => addUserChat(id, name, photo)}
				>
					{buttonIcon}
				</button>
			</li>
		</>
	);
};

export default AddUserItem;
