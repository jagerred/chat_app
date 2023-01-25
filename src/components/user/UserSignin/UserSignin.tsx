import { useEffect, useRef, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { MdAlternateEmail } from 'react-icons/md';
import { RiLockPasswordFill } from 'react-icons/ri';
import { FaUserCircle } from 'react-icons/fa';
import formStyle from 'components/user/UserModal/UserModal.module.scss';
import ImgInput from 'components/shared/ImgInput/ImgInput';

type IHandleClickSignIn = (
	email: string,
	password: string,
	displayName: string,
	file: File | null
) => void;

interface IUserForm {
	title: string;
	handleClick: IHandleClickSignIn;
	buttonName: string | JSX.Element;
	isModalLogin: boolean;
	setModalLogin: React.Dispatch<React.SetStateAction<boolean>>;
	authError: string | null;
}

interface FormValues {
	email: string;
	password: string;
	displayName: string;
}

const UserSignin = ({
	title,
	handleClick,
	buttonName,
	isModalLogin,
	setModalLogin,
	authError,
}: IUserForm) => {
	const {
		register,
		handleSubmit,
		setFocus,
		formState: { errors, isValid },
	} = useForm<FormValues>({
		mode: 'onSubmit',
	});

	useEffect(() => {
		setFocus('displayName');
	}, []);
	const [img, setImg] = useState<File | null>(null);

	const onSubmit: SubmitHandler<FormValues> = data =>
		handleClick(data.email, data.password, data.displayName, img);

	return (
		<>
			<div className={formStyle.formContainer}>
				<h2 className={formStyle.title}>{title}</h2>
				<form
					action=''
					className={formStyle.form}
					onSubmit={handleSubmit(onSubmit)}
				>
					<div className={formStyle.inputContainer}>
						<FaUserCircle className={formStyle.icon} />
						<input
							className={formStyle.input}
							type='text'
							placeholder='Полное имя'
							{...register('displayName')}
						/>
					</div>
					<div className={formStyle.inputContainer}>
						<MdAlternateEmail className={formStyle.icon} />
						<input
							className={formStyle.input}
							type='email'
							placeholder='Email'
							{...register('email', { required: 'Email обязателен' })}
						/>
					</div>
					{errors?.email && (
						<span className={formStyle.error}>
							{errors?.email?.message || 'Email is required'}
						</span>
					)}
					<div className={formStyle.inputContainer}>
						<RiLockPasswordFill className={formStyle.icon} />
						<input
							className={formStyle.input}
							type='password'
							placeholder='Пароль'
							{...register('password', {
								required: 'И пароль тоже!',
								minLength: {
									value: 5,
									message: 'Минимум 5 символов',
								},
							})}
						/>
					</div>
					{errors?.password && (
						<span className={formStyle.error}>
							{errors?.password?.message || 'Password is required'}
						</span>
					)}
					<div className={formStyle.imgInput}>
						<ImgInput img={img} setImg={setImg} /> <span>Add avatar</span>
					</div>
					<button
						type='submit'
						className={`button ${formStyle.button}`}
						disabled={!isValid}
					>
						{buttonName}
					</button>
				</form>
				<div className={formStyle.text}>
					{isModalLogin ? `Нет аккаунта?` : 'Есть аккаунт?'}
					<span
						className={formStyle.link}
						onClick={() => setModalLogin(!isModalLogin)}
					>
						{isModalLogin ? `Создать` : 'Войти'}
					</span>
				</div>
				<span className={formStyle.error}>{authError}</span>
			</div>
		</>
	);
};
export default UserSignin;
