import SidebarButtons from 'components/shared/SidebarButtons/SidebarButtons';
import style from 'components/chats/Chats/Chats.module.scss';

const BurgerMenu = () => {
	return (
		<div className={style.burgerContainer}>
			<SidebarButtons isBurgerMenu={true} />
		</div>
	);
};

export default BurgerMenu;
