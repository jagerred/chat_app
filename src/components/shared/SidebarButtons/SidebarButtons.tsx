import { useState } from 'react';
import AddUser from 'components/addUser/AddUser/AddUser';
import UserSettings from 'components/user/UserSettings/UserSettings';
import style from 'components/Sidebar/Sidebar.module.scss';
import { RiUserAddFill } from 'react-icons/ri';
import { MdSettings } from 'react-icons/md';

type SidebarButtonsProps = {
	isBurgerMenu: boolean;
};

const SidebarButtons = ({ isBurgerMenu }: SidebarButtonsProps) => {
	const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);
	const [isUserSettingsModalOpen, setIsUserSettingsModalOpen] = useState(false);

	const showAddUserModal = () => {
		setIsAddUserModalOpen(true);
	};

	const buttonsBurgerClass = isBurgerMenu ? style.burgerButton : '';

	return (
		<>
			<ul className={`${style.buttonsList} list`}>
				<li className='sidebar__buttons-item'>
					<button
						className={`${style.button} ${buttonsBurgerClass} button`}
						onClick={() => showAddUserModal()}
					>
						<RiUserAddFill className={style.icon} />
						{isBurgerMenu ? 'Add new chat' : null}
					</button>
				</li>
				<li className='sidebar__buttons-item'>
					<button
						className={`${style.button} ${buttonsBurgerClass} button`}
						onClick={() => setIsUserSettingsModalOpen(true)}
					>
						<MdSettings className={style.icon} />
						{isBurgerMenu ? 'User Settings' : null}
					</button>
				</li>
			</ul>
			<AddUser isOpen={isAddUserModalOpen} setIsOpen={setIsAddUserModalOpen} />
			<UserSettings
				isOpen={isUserSettingsModalOpen}
				setIsOpen={setIsUserSettingsModalOpen}
			/>
		</>
	);
};

export default SidebarButtons;
