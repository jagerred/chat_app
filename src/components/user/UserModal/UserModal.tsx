import { useContext, useState } from 'react';
import UserLogin from '../UserLogin/UserLogin';
import UserSignin from '../UserSignin/UserSignin';
import { AuthContext } from 'context/AuthContext';
import { useNavigate } from 'react-router-dom';
import {
	signInWithEmailAndPassword,
	createUserWithEmailAndPassword,
	updateProfile,
} from 'firebase/auth';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { storage, db, auth } from 'firebaseConf';
import { doc, setDoc } from 'firebase/firestore';
import { handleAuthError } from 'utils/handleAuthError';
import { CircularProgress } from '@mui/material';
import style from './UserModal.module.scss';

const UserModal = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [isModalLogin, setModalLogin] = useState(true);
	const [authError, setAuthError] = useState<string | null>(null);
	const { changeCurrentUser } = useContext(AuthContext);
	const navigate = useNavigate();

	function handleLogin(email: string, password: string) {
		setIsLoading(true);
		signInWithEmailAndPassword(auth, email, password)
			.then(res => {
				changeCurrentUser(res.user);
				setIsLoading(false);
				navigate('/');
			})
			.catch(error => {
				if (error instanceof Error) {
					setIsLoading(false);
					setAuthError(handleAuthError(error.message));
				}
			});
	}

	const changeModal = () => {
		setIsLoading(false);
		setAuthError(null);
		setModalLogin(true);
	};

	const handleSignUp = (
		email: string,
		password: string,
		displayName: string,
		file: File | null
	) => {
		setIsLoading(true);
		createUserWithEmailAndPassword(auth, email, password)
			.then(res => {
				const date = new Date().getTime();
				const storageRef = ref(storage, `${displayName + date}`);
				if (file) {
					uploadBytesResumable(storageRef, file).then(() => {
						getDownloadURL(storageRef).then(async downloadURL => {
							await updateProfile(res.user, {
								displayName,
								photoURL: downloadURL,
							});
							await setDoc(doc(db, 'users', res.user.uid), {
								uid: res.user.uid,
								displayName,
								email,
								photoURL: downloadURL,
							});
							await setDoc(doc(db, 'userChats', res.user.uid), {});
							changeModal();
						});
					});
				} else {
					updateProfile(res.user, {
						displayName,
						photoURL: '',
					});
					setDoc(doc(db, 'users', res.user.uid), {
						uid: res.user.uid,
						displayName,
						email,
						photoURL: '',
					});
					setDoc(doc(db, 'userChats', res.user.uid), {});
					changeModal();
				}
			})
			.catch(error => {
				if (error instanceof Error) {
					setIsLoading(false);
					setAuthError(handleAuthError(error.message));
				}
			});
	};

	return (
		<div className={style.modalContainer}>
			{isModalLogin ? (
				<UserLogin
					title={'Войти в аккаунт'}
					handleClick={handleLogin}
					buttonName={
						isLoading ? <CircularProgress color='inherit' size={18} /> : 'Войти'
					}
					isModalLogin={isModalLogin}
					setModalLogin={setModalLogin}
					authError={authError}
				/>
			) : (
				<UserSignin
					title={'Создать аккаунт'}
					handleClick={handleSignUp}
					buttonName={
						isLoading ? (
							<CircularProgress color='inherit' size={18} />
						) : (
							'Зарегистрироваться'
						)
					}
					isModalLogin={isModalLogin}
					setModalLogin={setModalLogin}
					authError={authError}
				/>
			)}
		</div>
	);
};
export default UserModal;
