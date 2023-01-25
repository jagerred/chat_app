import { useEffect } from 'react';
import formStyle from 'components/user/UserModal/UserModal.module.scss';
import { useForm, SubmitHandler } from 'react-hook-form';
import { MdAlternateEmail } from 'react-icons/md';
import { RiLockPasswordFill } from 'react-icons/ri';

type IHandleClickLogIn = (email: string, password: string) => void;

interface IUserForm {
	title: string;
	handleClick: IHandleClickLogIn;
	buttonName: string | JSX.Element;
	isModalLogin: boolean;
	setModalLogin: React.Dispatch<React.SetStateAction<boolean>>;
	authError: string | null;
}

interface FormValues {
	email: string;
	password: string;
}

const UserLogin = ({
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
		setFocus('email');
	}, []);

	const onSubmit: SubmitHandler<FormValues> = data =>
		handleClick(data.email, data.password);

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
export default UserLogin;
