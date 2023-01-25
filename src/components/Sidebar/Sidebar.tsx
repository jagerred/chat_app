import { useContext } from 'react';
import SidebarButtons from 'components/shared/SidebarButtons/SidebarButtons';
import { AuthContext } from 'context/AuthContext';
import { HiChat } from 'react-icons/hi';
import style from './Sidebar.module.scss';

const Sidebar = () => {
	const { currentUser } = useContext(AuthContext);

	return (
		<div className='sidebar'>
			<div className={style.container}>
				<div className={style.logoContainer}>
					<HiChat className={style.logo} />
					<span className={style.logoName}>Chat App</span>
				</div>
				<SidebarButtons isBurgerMenu={false} />
				<div className={style.avatar}>
					<img
						className='image'
						src={currentUser?.photoURL}
						alt='user avatar'
					/>
				</div>
			</div>
		</div>
	);
};

export default Sidebar;
