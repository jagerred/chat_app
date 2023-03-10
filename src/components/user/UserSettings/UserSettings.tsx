import { useContext, useState, useEffect, useRef } from 'react';
import style from 'components/Sidebar/Sidebar.module.scss';
import { ChatContext } from 'context/ChatContext';
import { AuthContext } from 'context/AuthContext';
import { signOut, updateProfile } from 'firebase/auth';
import { doc, updateDoc } from 'firebase/firestore';
import {
	ref,
	uploadBytesResumable,
	getDownloadURL,
	deleteObject,
	StorageReference,
} from 'firebase/storage';
import { auth, db, storage } from 'firebaseConf';
import { Modal } from 'antd';
import { RiLogoutCircleLine } from 'react-icons/ri';
import { RxAvatar } from 'react-icons/rx';
import { CircularProgress } from '@mui/material';
import { IModalProps } from 'types';

const UserSettings = ({ isOpen, setIsOpen }: IModalProps) => {
	const [img, setImg] = useState<File | null>(null);
	const [isImgLoading, setIsImgLoading] = useState(false);
	const { currentUser, setCurrentUser } = useContext(AuthContext);
	const { dispatch } = useContext(ChatContext);
	const fileInputRef = useRef<HTMLInputElement>(null);

	useEffect(() => {
		if (!img) return;
		showConfirm();
	}, [img]);

	const handleCancel = () => {
		setIsOpen(false);
	};

	const handleImgFile = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files) {
			setImg(e.target.files[0]);
		}
	};

	const confirm = Modal.confirm;
	const photo = currentUser!.photoURL;
	const deletePrevAvatar = (prev: StorageReference | null) => {
		if (prev)
			deleteObject(prev)
				.then(() => {})
				.catch(error => {
					if (error instanceof Error) console.log(error);
				});
	};
	const changeAvatar = async () => {
		if (currentUser && img) {
			setIsImgLoading(true);
			const prevAvatarRef = photo !== '' ? ref(storage, photo) : null;
			const date = new Date().getTime();
			const storageRef = ref(storage, `${currentUser.displayName! + date}`);
			await uploadBytesResumable(storageRef, img);
			await getDownloadURL(storageRef).then(async downloadURL => {
				await updateProfile(auth.currentUser!, {
					photoURL: downloadURL,
				});
				await updateDoc(doc(db, 'users', currentUser.uid), {
					photoURL: downloadURL,
				});
				setCurrentUser({ ...currentUser, photoURL: downloadURL });
			});
			deletePrevAvatar(prevAvatarRef);
			setIsImgLoading(false);
			setImg(null);
			handleCancel();
		}
	};

	const showConfirm = () => {
		confirm({
			title: 'Do you want to change your avatar?',
			content: '',
			onOk() {
				changeAvatar();
			},
			onCancel() {},
		});
	};

	const handleSignOut: () => void = () => {
		signOut(auth);
		setCurrentUser(null);
		dispatch({ type: 'CLOSE_CHAT' });
	};

	return (
		<Modal open={isOpen} onCancel={handleCancel} footer={[]} width={360}>
			<div className={style.userSettings}>
				<h2 className={style.title}>User settings</h2>
				<button
					className={`${style.modalButton} ${style.modalButtonAvatar} button`}
					onClick={() => fileInputRef.current?.click()}
				>
					Change avatar
					{isImgLoading ? (
						<CircularProgress color='inherit' size={18} />
					) : (
						<RxAvatar className={style.icon} />
					)}
				</button>
				<input ref={fileInputRef} type='file' hidden onChange={handleImgFile} />
				<button
					className={`${style.modalButton}  button`}
					onClick={handleSignOut}
				>
					Sign Out
					<RiLogoutCircleLine className={style.icon} />
				</button>
			</div>
		</Modal>
	);
};

export default UserSettings;
